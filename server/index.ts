import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Primary and candidate paths for the portfolio JSON file
const PRIMARY_PATH = path.resolve(__dirname, '../data/portfolio.json');
const CANDIDATE_PATHS = [
  PRIMARY_PATH,
  path.resolve(__dirname, '../data/portofolio.json'),
  path.resolve(__dirname, '../portfolio.json'),
  path.resolve(__dirname, '../portofolio.json'),
];

// Middleware
app.use(express.json({ limit: '10mb' }));

// Enable CORS for development
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Helper to load portfolio data from JSON
async function getPortfolioData() {
  for (const filePath of CANDIDATE_PATHS) {
    try {
      const rawData = await fs.readFile(filePath, 'utf-8');
      if (rawData.trim().length > 0) {
        return JSON.parse(rawData);
      }
    } catch {
      // Continue to next path candidate
    }
  }
  throw new Error('Could not find or read portfolio JSON data file');
}

// Helper to save portfolio data to JSON files
async function savePortfolioData(data: { portfolio?: any[]; archive?: any[] }) {
  const formatted = JSON.stringify(data, null, 2);
  // Ensure directory exists
  await fs.mkdir(path.dirname(PRIMARY_PATH), { recursive: true });

  for (const filePath of CANDIDATE_PATHS) {
    try {
      await fs.writeFile(filePath, formatted, 'utf-8');
    } catch (err: any) {
      console.warn(`[Express] Notice: unable to write to ${filePath}:`, err.message);
    }
  }
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// GET /api/portfolio - Returns main portfolio items from JSON
app.get('/api/portfolio', async (_req: Request, res: Response) => {
  try {
    const data = await getPortfolioData();
    const items = data.portfolio || (Array.isArray(data) ? data : []);
    res.json(items);
  } catch (error: any) {
    console.error('[Express] Error in /api/portfolio:', error.message);
    res.status(500).json({ error: 'Failed to retrieve portfolio data' });
  }
});

// GET /api/portfolio/archive - Returns archive projects from JSON
app.get('/api/portfolio/archive', async (_req: Request, res: Response) => {
  try {
    const data = await getPortfolioData();
    const archive = data.archive || (Array.isArray(data) ? data : []);
    res.json(archive);
  } catch (error: any) {
    console.error('[Express] Error in /api/portfolio/archive:', error.message);
    res.status(500).json({ error: 'Failed to retrieve archive portfolio data' });
  }
});

// GET /api/portfolio/:id - Returns single portfolio item by id
app.get('/api/portfolio/:id', async (req: Request, res: Response) => {
  try {
    const data = await getPortfolioData();
    const itemId = req.params.id;
    const portfolioList = data.portfolio || (Array.isArray(data) ? data : []);
    const archiveList = data.archive || [];

    const item = portfolioList.find((p: { id: string }) => p.id === itemId) ||
                 archiveList.find((a: { id: string }) => a.id === itemId);

    if (!item) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }
    res.json(item);
  } catch (error: any) {
    console.error('[Express] Error in /api/portfolio/:id:', error.message);
    res.status(500).json({ error: 'Failed to retrieve portfolio item' });
  }
});

// ================= ADMIN API ENDPOINTS ================= //

// GET /api/admin/data - Returns full JSON document (portfolio + archive)
app.get('/api/admin/data', async (_req: Request, res: Response) => {
  try {
    const data = await getPortfolioData();
    res.json({
      portfolio: data.portfolio || [],
      archive: data.archive || [],
    });
  } catch (error: any) {
    console.error('[Express] Error in GET /api/admin/data:', error.message);
    res.status(500).json({ error: 'Failed to load admin data' });
  }
});

// POST /api/admin/save - Saves entire data structure
app.post('/api/admin/save', async (req: Request, res: Response) => {
  try {
    const { portfolio, archive } = req.body;
    if (!Array.isArray(portfolio) && !Array.isArray(archive)) {
      return res.status(400).json({ error: 'Invalid data format. Expected portfolio or archive array.' });
    }

    const current = await getPortfolioData().catch(() => ({ portfolio: [], archive: [] }));
    const updated = {
      portfolio: Array.isArray(portfolio) ? portfolio : (current.portfolio || []),
      archive: Array.isArray(archive) ? archive : (current.archive || []),
    };

    await savePortfolioData(updated);
    res.json({ success: true, message: 'Portfolio data updated successfully' });
  } catch (error: any) {
    console.error('[Express] Error in POST /api/admin/save:', error.message);
    res.status(500).json({ error: 'Failed to save portfolio data' });
  }
});

// POST /api/admin/portfolio - Add new showcase item
app.post('/api/admin/portfolio', async (req: Request, res: Response) => {
  try {
    const newItem = req.body;
    if (!newItem || !newItem.title) {
      return res.status(400).json({ error: 'Portfolio item must include title' });
    }
    const data = await getPortfolioData();
    const portfolio = data.portfolio || [];
    if (!newItem.id) {
      newItem.id = `item-${Date.now()}`;
    }
    portfolio.push(newItem);
    data.portfolio = portfolio;
    await savePortfolioData(data);
    res.status(201).json({ success: true, item: newItem });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to add portfolio item' });
  }
});

// PUT /api/admin/portfolio/:id - Update existing showcase item
app.put('/api/admin/portfolio/:id', async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const updatedItem = req.body;
    const data = await getPortfolioData();
    const portfolio = data.portfolio || [];
    const index = portfolio.findIndex((p: { id: string }) => p.id === itemId);

    if (index === -1) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }

    portfolio[index] = { ...portfolio[index], ...updatedItem, id: itemId };
    data.portfolio = portfolio;
    await savePortfolioData(data);
    res.json({ success: true, item: portfolio[index] });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update portfolio item' });
  }
});

// DELETE /api/admin/portfolio/:id - Delete showcase item
app.delete('/api/admin/portfolio/:id', async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const data = await getPortfolioData();
    const portfolio = data.portfolio || [];
    const filtered = portfolio.filter((p: { id: string }) => p.id !== itemId);

    if (filtered.length === portfolio.length) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }

    data.portfolio = filtered;
    await savePortfolioData(data);
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to delete portfolio item' });
  }
});

// POST /api/admin/archive - Add new archive item
app.post('/api/admin/archive', async (req: Request, res: Response) => {
  try {
    const newItem = req.body;
    if (!newItem || !newItem.title) {
      return res.status(400).json({ error: 'Archive item must include title' });
    }
    const data = await getPortfolioData();
    const archive = data.archive || [];
    if (!newItem.id) {
      newItem.id = `archive-${Date.now()}`;
    }
    archive.push(newItem);
    data.archive = archive;
    await savePortfolioData(data);
    res.status(201).json({ success: true, item: newItem });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to add archive item' });
  }
});

// PUT /api/admin/archive/:id - Update archive item
app.put('/api/admin/archive/:id', async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const updatedItem = req.body;
    const data = await getPortfolioData();
    const archive = data.archive || [];
    const index = archive.findIndex((a: { id: string }) => a.id === itemId);

    if (index === -1) {
      return res.status(404).json({ error: 'Archive item not found' });
    }

    archive[index] = { ...archive[index], ...updatedItem, id: itemId };
    data.archive = archive;
    await savePortfolioData(data);
    res.json({ success: true, item: archive[index] });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update archive item' });
  }
});

// DELETE /api/admin/archive/:id - Delete archive item
app.delete('/api/admin/archive/:id', async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const data = await getPortfolioData();
    const archive = data.archive || [];
    const filtered = archive.filter((a: { id: string }) => a.id !== itemId);

    if (filtered.length === archive.length) {
      return res.status(404).json({ error: 'Archive item not found' });
    }

    data.archive = filtered;
    await savePortfolioData(data);
    res.json({ success: true, message: 'Archive item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to delete archive item' });
  }
});

// POST /api/admin/login - Authenticate admin credentials
const ADMIN_USER = 'asamedia';
const ADMIN_PASS = 'Balalalalaasamedia2027';

app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body || {};
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({ success: true, token: `asa_${Date.now()}` });
  }
  return res.status(401).json({ success: false, error: 'Username atau password salah' });
});

// POST /api/admin/upload - Upload image to public/uploads directory
app.post('/api/admin/upload', async (req: Request, res: Response) => {
  try {
    const { filename, base64 } = req.body;
    if (!filename || !base64) {
      return res.status(400).json({ error: 'Filename and base64 data are required' });
    }

    // Extract raw base64 content
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Clean and create unique filename
    const ext = path.extname(filename) || '.png';
    const baseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9-_]/g, '-');
    const safeFilename = `${baseName}-${Date.now()}${ext}`;

    const uploadsDir = path.resolve(__dirname, '../public/uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const targetPath = path.join(uploadsDir, safeFilename);
    await fs.writeFile(targetPath, buffer);

    const publicUrl = `/uploads/${safeFilename}`;
    console.log(`[Express] 📸 Uploaded image saved to: ${publicUrl}`);
    res.json({ success: true, imagePath: publicUrl });
  } catch (err: any) {
    console.error('[Express] Image upload failed:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

app.listen(PORT, () => {
  console.log(`[Express] 🚀 API server listening on http://localhost:${PORT}`);
});
