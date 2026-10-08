import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Save,
  RefreshCw,
  Code2,
  Layers,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  X,
  FileJson,
  FolderOpen,
  Lock,
  User,
  LogOut,
  Upload,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Check,
} from 'lucide-react';

interface MatchedProject {
  id?: string;
  code?: string;
  client?: string;
  fullName?: string;
  category?: string;
  year?: string;
  description?: string;
  highlight?: string;
  frameworks?: string[];
  keyOutcomes?: string[];
  color?: string;
  aspect?: string;
  featuredQuote?: string;
  deliverables?: string[];
}

export interface PortfolioItemAdmin {
  id: string;
  num: string;
  title: string;
  category: string;
  client: string;
  year: string;
  image: string;
  aspectRatio: string;
  rotation: string;
  summary: string;
  frameworks: string[];
  matchedProject?: MatchedProject;
}

export interface ArchiveItemAdmin {
  id: string;
  slug: string;
  title: string;
  client: string;
  fullName: string;
  category: string;
  year: string;
  image: string;
  aspectRatio: string;
  cardSpan: 'standard' | 'tall' | 'wide';
  summary: string;
  frameworks: string[];
  deliverables: string[];
  keyOutcomes: string[];
  code: string;
}

interface AdminPortfolioProps {
  onBackToHome: () => void;
  onNavigateToPortfolio?: () => void;
}

type TabType = 'portfolio' | 'archive' | 'json';

export const AdminPortfolio: React.FC<AdminPortfolioProps> = ({
  onBackToHome,
  onNavigateToPortfolio,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(sessionStorage.getItem('asa_admin_token'));
  });
  const [loginUsername, setLoginUsername] = useState('asamedia');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // CMS Tabs & Data State
  const [activeTab, setActiveTab] = useState<TabType>('portfolio');
  const [portfolioList, setPortfolioList] = useState<PortfolioItemAdmin[]>([]);
  const [archiveList, setArchiveList] = useState<ArchiveItemAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // File upload input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Raw JSON state
  const [rawJson, setRawJson] = useState<string>('');
  const [rawJsonError, setRawJsonError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingType, setEditingType] = useState<'portfolio' | 'archive'>('portfolio');

  // Form State for Showcase Portfolio
  const [formPortfolio, setFormPortfolio] = useState<PortfolioItemAdmin>({
    id: '',
    num: '01',
    title: '',
    category: 'Reporting · Design',
    client: '',
    year: new Date().getFullYear().toString(),
    image: '',
    aspectRatio: '768 / 576',
    rotation: '0deg',
    summary: '',
    frameworks: [],
    matchedProject: {
      deliverables: [],
      keyOutcomes: [],
      frameworks: [],
    },
  });

  // Form State for Archive Item
  const [formArchive, setFormArchive] = useState<ArchiveItemAdmin>({
    id: '',
    slug: '',
    title: '',
    client: '',
    fullName: '',
    category: 'Sustainability Report',
    year: new Date().getFullYear().toString(),
    image: '',
    aspectRatio: '768 / 576',
    cardSpan: 'standard',
    summary: '',
    frameworks: [],
    deliverables: [],
    keyOutcomes: [],
    code: '',
  });

  // Load data from Express API
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/data');
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const data = await res.json();
      const pItems: PortfolioItemAdmin[] = data.portfolio || [];
      const aItems: ArchiveItemAdmin[] = data.archive || [];
      setPortfolioList(pItems);
      setArchiveList(aItems);
      setRawJson(JSON.stringify({ portfolio: pItems, archive: aItems }, null, 2));
      setRawJsonError(null);
    } catch (err: any) {
      console.error('Failed to load portfolio data:', err);
      showMessage('error', `Failed to load data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginUsername.trim(),
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem('asa_admin_token', data.token || 'auth_token');
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || 'Username atau password salah.');
      }
    } catch (err: any) {
      // Offline fallback: if username & password match client credentials directly
      if (
        loginUsername.trim() === 'asamedia' &&
        loginPassword === 'Balalalalaasamedia2027'
      ) {
        sessionStorage.setItem('asa_admin_token', 'offline_auth_token');
        setIsAuthenticated(true);
      } else {
        setLoginError('Koneksi server gagal atau kredensial tidak sesuai.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('asa_admin_token');
    setIsAuthenticated(false);
    setLoginPassword('');
    setLoginError(null);
  };

  // Save whole state to server
  const persistChanges = async (
    newPortfolio: PortfolioItemAdmin[],
    newArchive: ArchiveItemAdmin[]
  ) => {
    try {
      setSaving(true);
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolio: newPortfolio, archive: newArchive }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setPortfolioList(newPortfolio);
      setArchiveList(newArchive);
      setRawJson(JSON.stringify({ portfolio: newPortfolio, archive: newArchive }, null, 2));
      showMessage('success', 'Perubahan berhasil disimpan ke portfolio.json!');
    } catch (err: any) {
      showMessage('error', `Gagal menyimpan: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Image Upload Handler
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check size limit (e.g. 15MB)
    if (file.size > 15 * 1024 * 1024) {
      alert('Ukuran gambar terlalu besar (maksimal 15MB).');
      return;
    }

    setUploadingImage(true);
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const base64 = reader.result as string;
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            base64,
          }),
        });

        const data = await res.json();
        if (res.ok && data.imagePath) {
          if (editingType === 'portfolio') {
            setFormPortfolio((prev) => ({ ...prev, image: data.imagePath }));
          } else {
            setFormArchive((prev) => ({ ...prev, image: data.imagePath }));
          }
          showMessage('success', `Gambar "${file.name}" berhasil diupload!`);
        } else {
          throw new Error(data.error || 'Upload gagal');
        }
      } catch (err: any) {
        console.error('Upload image error:', err);
        showMessage('error', `Gagal mengupload gambar: ${err.message}`);
      } finally {
        setUploadingImage(false);
      }
    };

    reader.onerror = () => {
      setUploadingImage(false);
      showMessage('error', 'Gagal membaca file gambar.');
    };

    reader.readAsDataURL(file);
  };

  // Delete Portfolio item
  const handleDeletePortfolio = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus item portofolio ini?')) return;
    const updated = portfolioList.filter((item) => item.id !== id);
    await persistChanges(updated, archiveList);
  };

  // Delete Archive item
  const handleDeleteArchive = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus item arsip ini?')) return;
    const updated = archiveList.filter((item) => item.id !== id);
    await persistChanges(portfolioList, updated);
  };

  // Open Create Modal
  const handleOpenCreate = (type: 'portfolio' | 'archive') => {
    setEditingType(type);
    setModalMode('create');
    const nextNum = String(portfolioList.length + 1).padStart(2, '0');
    if (type === 'portfolio') {
      setFormPortfolio({
        id: `item-${Date.now()}`,
        num: nextNum,
        title: '',
        category: 'Reporting · Design',
        client: '',
        year: new Date().getFullYear().toString(),
        image: '',
        aspectRatio: '768 / 576',
        rotation: '0deg',
        summary: '',
        frameworks: ['GRI Standards', 'POJK 51'],
        matchedProject: {
          code: '',
          client: '',
          fullName: '',
          category: 'Annual Report',
          deliverables: ['Annual Report Dossier'],
          keyOutcomes: [],
        },
      });
    } else {
      setFormArchive({
        id: `archive-${Date.now()}`,
        slug: `project-${Date.now()}`,
        title: '',
        client: '',
        fullName: '',
        category: 'Sustainability Report',
        year: new Date().getFullYear().toString(),
        image: '',
        aspectRatio: '768 / 576',
        cardSpan: 'standard',
        summary: '',
        frameworks: ['GRI Standards 2021', 'POJK 51'],
        deliverables: ['Full Report'],
        keyOutcomes: [],
        code: `PRJ-${new Date().getFullYear()}`,
      });
    }
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditPortfolio = (item: PortfolioItemAdmin) => {
    setEditingType('portfolio');
    setModalMode('edit');
    setFormPortfolio(JSON.parse(JSON.stringify(item)));
    setIsModalOpen(true);
  };

  const handleOpenEditArchive = (item: ArchiveItemAdmin) => {
    setEditingType('archive');
    setModalMode('edit');
    setFormArchive(JSON.parse(JSON.stringify(item)));
    setIsModalOpen(true);
  };

  // Submit Modal Form
  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingType === 'portfolio') {
      let updated: PortfolioItemAdmin[];
      if (modalMode === 'create') {
        updated = [...portfolioList, formPortfolio];
      } else {
        updated = portfolioList.map((item) =>
          item.id === formPortfolio.id ? formPortfolio : item
        );
      }
      await persistChanges(updated, archiveList);
    } else {
      let updated: ArchiveItemAdmin[];
      if (modalMode === 'create') {
        updated = [...archiveList, formArchive];
      } else {
        updated = archiveList.map((item) =>
          item.id === formArchive.id ? formArchive : item
        );
      }
      await persistChanges(portfolioList, updated);
    }
    setIsModalOpen(false);
  };

  // Save Raw JSON
  const handleSaveRawJson = async () => {
    try {
      setRawJsonError(null);
      const parsed = JSON.parse(rawJson);
      if (!parsed.portfolio && !Array.isArray(parsed)) {
        throw new Error('JSON harus memiliki array "portfolio" atau berupa array item.');
      }
      const pItems = parsed.portfolio || parsed;
      const aItems = parsed.archive || archiveList;
      await persistChanges(pItems, aItems);
    } catch (err: any) {
      setRawJsonError(err.message);
      showMessage('error', `Format JSON tidak valid: ${err.message}`);
    }
  };

  // Format Raw JSON in editor
  const handleFormatRawJson = () => {
    try {
      const parsed = JSON.parse(rawJson);
      setRawJson(JSON.stringify(parsed, null, 2));
      setRawJsonError(null);
    } catch (err: any) {
      setRawJsonError(err.message);
    }
  };

  // ================= 1. LOGIN SCREEN (IF NOT AUTHENTICATED) ================= //
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070709] text-neutral-100 flex flex-col justify-center items-center p-6 font-sans selection:bg-[#188F42]/30 selection:text-white relative overflow-hidden">
        {/* Subtle Ambient Background Tint */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#188F42]/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Back to Home Button */}
        <div className="absolute top-6 left-6">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors bg-neutral-900/80 hover:bg-neutral-800 px-3.5 py-2 rounded-xl border border-neutral-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Website</span>
          </button>
        </div>

        {/* Login Card */}
        <div className="relative w-full max-w-md bg-[#131418] border border-neutral-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl z-10 backdrop-blur-md">
          {/* Logo / Brand Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#188F42]/15 border border-[#188F42]/30 mb-4 shadow-[0_0_20px_rgba(24,143,66,0.2)]">
              <Lock className="w-6 h-6 text-[#188F42]" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              ASA Media CMS
            </h1>
            <p className="text-xs text-neutral-400 font-mono mt-2">
              Autentikasi Administrator Portofolio
            </p>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                Username
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-neutral-500 pointer-events-none">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full pl-10 pr-4 py-3 bg-[#0C0D10] border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#188F42] focus:ring-1 focus:ring-[#188F42] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                Password
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-neutral-500 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full pl-10 pr-11 py-3 bg-[#0C0D10] border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#188F42] focus:ring-1 focus:ring-[#188F42] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-neutral-500 hover:text-neutral-300 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-2 py-3.5 px-4 bg-[#188F42] hover:bg-[#137536] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-[0_4px_20px_rgba(24,143,66,0.3)] hover:shadow-[0_4px_25px_rgba(24,143,66,0.4)] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <span>Masuk ke Dashboard CMS</span>
              )}
            </button>
          </form>

          {/* Quick Helper Note */}
          <div className="mt-8 pt-6 border-t border-neutral-800/60 text-center">
            <p className="text-[11px] text-neutral-500 font-mono">
              Akses khusus tim internal ASA Media
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ================= 2. DASHBOARD VIEW (WHEN AUTHENTICATED) ================= //
  return (
    <div className="min-h-screen bg-[#0F1012] text-neutral-100 flex flex-col font-sans selection:bg-[#188F42]/30 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#16171B]/95 backdrop-blur-md border-b border-neutral-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors bg-neutral-800/80 hover:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700/60 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </button>

            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#188F42] shadow-[0_0_10px_#188F42]" />
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                <span>ASA Media</span>
                <span className="text-neutral-500 font-normal">/</span>
                <span className="text-[#188F42] font-mono text-sm uppercase">Portfolio CMS</span>
              </h1>
            </div>
          </div>

          {/* Quick Actions & Logout */}
          <div className="flex items-center gap-3">
            {onNavigateToPortfolio && (
              <button
                onClick={onNavigateToPortfolio}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-800/60 hover:bg-neutral-800 px-3 py-1.5 rounded-md border border-neutral-700/50 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Portfolio</span>
              </button>
            )}

            <button
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 px-3 py-1.5 rounded-md border border-neutral-700 hover:border-neutral-600 transition-colors cursor-pointer"
              title="Reload data from portfolio.json"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Reload</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-950/70 border border-rose-900/60 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
              title="Keluar dari sesi admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Alert Notification */}
      {statusMessage && (
        <div
          className={`px-6 py-3 border-b text-xs sm:text-sm font-medium flex items-center justify-between ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300'
              : 'bg-rose-950/60 border-rose-800/60 text-rose-300'
          }`}
        >
          <div className="max-w-7xl mx-auto w-full flex items-center gap-2">
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 flex flex-col">
        {/* Navigation Tabs & Overview */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div className="flex items-center gap-2 p-1 bg-neutral-900 rounded-xl border border-neutral-800 w-fit">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'portfolio'
                  ? 'bg-[#188F42] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Showcase Items ({portfolioList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('archive')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'archive'
                  ? 'bg-[#188F42] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Archive ({archiveList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('json')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'json'
                  ? 'bg-[#188F42] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>Raw JSON Editor</span>
            </button>
          </div>

          {/* Action button based on active tab */}
          {activeTab === 'portfolio' && (
            <button
              onClick={() => handleOpenCreate('portfolio')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#188F42] hover:bg-[#137536] px-4 py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Showcase Item</span>
            </button>
          )}

          {activeTab === 'archive' && (
            <button
              onClick={() => handleOpenCreate('archive')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#188F42] hover:bg-[#137536] px-4 py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Archive Item</span>
            </button>
          )}
        </div>

        {/* TAB 1: SHOWCASE PORTFOLIO ITEMS */}
        {activeTab === 'portfolio' && (
          <div className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs text-neutral-400 font-mono">
                Item portofolio yang ditampilkan di section beranda & halaman /portfolio. Data tersimpan di{' '}
                <code className="text-emerald-400">portfolio.json</code>.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-64 rounded-2xl bg-neutral-900 border border-neutral-800 animate-pulse"
                  />
                ))}
              </div>
            ) : portfolioList.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-neutral-800 rounded-2xl">
                <p className="text-neutral-500 text-sm mb-4">Belum ada item portofolio.</p>
                <button
                  onClick={() => handleOpenCreate('portfolio')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#188F42] px-4 py-2 rounded-lg cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Item Pertama</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioList.map((item, idx) => (
                  <div
                    key={item.id}
                    className="group bg-[#16171B] border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm"
                  >
                    <div>
                      {/* Image Preview & Badge */}
                      <div className="relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden border-b border-neutral-800">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLElement).style.opacity = '0.3';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600 text-xs font-mono gap-1">
                            <ImageIcon className="w-6 h-6 text-neutral-700" />
                            <span>Belum ada gambar</span>
                          </div>
                        )}
                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-mono text-emerald-400 font-semibold border border-white/10">
                          #{item.num || String(idx + 1).padStart(2, '0')}
                        </div>
                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-mono text-white border border-white/10">
                          {item.year}
                        </div>
                      </div>

                      {/* Card Info */}
                      <div className="p-5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#188F42] font-semibold">
                          {item.category}
                        </span>
                        <h3 className="text-base font-semibold text-white mt-1 leading-snug line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">{item.client}</p>
                        <p className="text-xs text-neutral-500 mt-3 line-clamp-2 leading-relaxed">
                          {item.summary}
                        </p>

                        {/* Frameworks */}
                        {item.frameworks && item.frameworks.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {item.frameworks.map((fw, fIdx) => (
                              <span
                                key={fIdx}
                                className="text-[9px] font-mono px-2 py-0.5 rounded bg-neutral-800/80 text-neutral-300 border border-neutral-700/50"
                              >
                                {fw}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="px-5 py-3.5 bg-neutral-900/60 border-t border-neutral-800/80 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-500">ID: {item.id}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditPortfolio(item)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                          title="Edit Item"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePortfolio(item.id)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                          title="Hapus Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ARCHIVE ITEMS */}
        {activeTab === 'archive' && (
          <div className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs text-neutral-400 font-mono">
                Item khusus arsip tambahan.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-64 rounded-2xl bg-neutral-900 border border-neutral-800 animate-pulse"
                  />
                ))}
              </div>
            ) : archiveList.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-neutral-800 rounded-2xl">
                <p className="text-neutral-500 text-sm mb-4">Belum ada item arsip.</p>
                <button
                  onClick={() => handleOpenCreate('archive')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#188F42] px-4 py-2 rounded-lg cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Item Arsip</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {archiveList.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-[#16171B] border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden border-b border-neutral-800">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLElement).style.opacity = '0.3';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600 text-xs font-mono gap-1">
                            <ImageIcon className="w-6 h-6 text-neutral-700" />
                            <span>Belum ada gambar</span>
                          </div>
                        )}
                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-mono text-emerald-400 font-semibold border border-white/10">
                          {item.code || 'ARCHIVE'}
                        </div>
                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-mono text-white border border-white/10">
                          {item.year}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#188F42] font-semibold">
                          {item.category}
                        </span>
                        <h3 className="text-base font-semibold text-white mt-1 leading-snug line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">{item.client}</p>
                        <p className="text-xs text-neutral-500 mt-3 line-clamp-2 leading-relaxed">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="px-5 py-3.5 bg-neutral-900/60 border-t border-neutral-800/80 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-500">ID: {item.id}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditArchive(item)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                          title="Edit Item"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteArchive(item.id)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                          title="Hapus Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: RAW JSON CODE EDITOR */}
        {activeTab === 'json' && (
          <div className="pt-6 flex-1 flex flex-col">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-white">Direct JSON Editor</h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Edit data portfolio.json secara langsung. Format divalidasi sebelum disimpan ke disk.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleFormatRawJson}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded-lg border border-neutral-700 transition-colors cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Format JSON</span>
                </button>

                <button
                  onClick={handleSaveRawJson}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#188F42] hover:bg-[#137536] px-4 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Menyimpan...' : 'Simpan ke File'}</span>
                </button>
              </div>
            </div>

            {rawJsonError && (
              <div className="mb-4 p-3 rounded-lg bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs font-mono">
                Syntax Error: {rawJsonError}
              </div>
            )}

            <div className="flex-1 min-h-[500px] rounded-xl overflow-hidden border border-neutral-800 bg-[#121316] relative flex flex-col">
              <textarea
                value={rawJson}
                onChange={(e) => {
                  setRawJson(e.target.value);
                  setRawJsonError(null);
                }}
                spellCheck={false}
                className="w-full flex-1 p-5 font-mono text-xs sm:text-sm text-neutral-200 bg-transparent resize-none focus:outline-none focus:ring-1 focus:ring-[#188F42]"
                style={{ tabSize: 2 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Input for Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* MODAL: ADD / EDIT PORTFOLIO OR ARCHIVE ITEM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#16171B] border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#188F42] font-semibold">
                  {editingType === 'portfolio' ? 'Showcase Item' : 'Archive Item'}
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  {modalMode === 'create' ? 'Tambah Item Baru' : 'Edit Item'}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleModalSubmit} className="space-y-4">
              {editingType === 'portfolio' ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        ID (slug unik, misal: asbi-23)
                      </label>
                      <input
                        type="text"
                        required
                        value={formPortfolio.id}
                        onChange={(e) =>
                          setFormPortfolio({ ...formPortfolio, id: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#188F42]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Nomor Urut (misal: 01, 02)
                      </label>
                      <input
                        type="text"
                        value={formPortfolio.num}
                        onChange={(e) =>
                          setFormPortfolio({ ...formPortfolio, num: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#188F42]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Judul Laporan / Proyek
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Annual Report"
                        value={formPortfolio.title}
                        onChange={(e) =>
                          setFormPortfolio({ ...formPortfolio, title: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#188F42]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Nama Klien
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Asuransi Bintang"
                        value={formPortfolio.client}
                        onChange={(e) =>
                          setFormPortfolio({ ...formPortfolio, client: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#188F42]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Kategori
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Reporting · Design"
                        value={formPortfolio.category}
                        onChange={(e) =>
                          setFormPortfolio({ ...formPortfolio, category: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#188F42]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Tahun
                      </label>
                      <input
                        type="text"
                        value={formPortfolio.year}
                        onChange={(e) =>
                          setFormPortfolio({ ...formPortfolio, year: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#188F42]"
                      />
                    </div>
                  </div>

                  {/* IMAGE UPLOAD & PATH FIELD */}
                  <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-neutral-200">
                        Gambar Portofolio
                      </label>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#188F42] hover:bg-[#137536] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm"
                      >
                        {uploadingImage ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Mengupload...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Gambar Sendiri</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Preview Thumbnail if image is set */}
                    {formPortfolio.image && (
                      <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                        <img
                          src={formPortfolio.image}
                          alt="Preview"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400">
                          {formPortfolio.image}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                        Path Gambar (Otomatis terisi saat upload atau masukkan URL/path manual):
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. /ASBI-23-a-768x576.png atau /uploads/gambar-anda.png"
                        value={formPortfolio.image}
                        onChange={(e) =>
                          setFormPortfolio({ ...formPortfolio, image: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-[#188F42]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Ringkasan / Summary
                    </label>
                    <textarea
                      rows={2}
                      value={formPortfolio.summary}
                      onChange={(e) =>
                        setFormPortfolio({ ...formPortfolio, summary: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#188F42]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Frameworks (Pisahkan dengan koma)
                    </label>
                    <input
                      type="text"
                      placeholder="OJK POJK 51, GRI Standards, IDX Governance"
                      value={formPortfolio.frameworks.join(', ')}
                      onChange={(e) =>
                        setFormPortfolio({
                          ...formPortfolio,
                          frameworks: e.target.value
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#188F42]"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        ID
                      </label>
                      <input
                        type="text"
                        required
                        value={formArchive.id}
                        onChange={(e) =>
                          setFormArchive({ ...formArchive, id: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#188F42]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Slug (URL identifier)
                      </label>
                      <input
                        type="text"
                        required
                        value={formArchive.slug}
                        onChange={(e) =>
                          setFormArchive({ ...formArchive, slug: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#188F42]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Judul
                      </label>
                      <input
                        type="text"
                        required
                        value={formArchive.title}
                        onChange={(e) =>
                          setFormArchive({ ...formArchive, title: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#188F42]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Klien
                      </label>
                      <input
                        type="text"
                        required
                        value={formArchive.client}
                        onChange={(e) =>
                          setFormArchive({ ...formArchive, client: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#188F42]"
                      />
                    </div>
                  </div>

                  {/* IMAGE UPLOAD & PATH FIELD FOR ARCHIVE */}
                  <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-neutral-200">
                        Gambar Arsip
                      </label>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#188F42] hover:bg-[#137536] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm"
                      >
                        {uploadingImage ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Mengupload...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Gambar</span>
                          </>
                        )}
                      </button>
                    </div>

                    {formArchive.image && (
                      <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                        <img
                          src={formArchive.image}
                          alt="Preview"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    <input
                      type="text"
                      placeholder="e.g. /uploads/gambar.png"
                      value={formArchive.image}
                      onChange={(e) =>
                        setFormArchive({ ...formArchive, image: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-[#188F42]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Summary
                    </label>
                    <textarea
                      rows={2}
                      value={formArchive.summary}
                      onChange={(e) =>
                        setFormArchive({ ...formArchive, summary: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#188F42]"
                    />
                  </div>
                </>
              )}

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-neutral-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-800 rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#188F42] hover:bg-[#137536] rounded-lg shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
