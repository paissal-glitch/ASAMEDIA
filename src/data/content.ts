export interface Project {
  id: string;
  code: string;
  client: string;
  fullName: string;
  category: 'Sustainability Report' | 'Annual Report' | 'ESG & PROPER' | 'Communication';
  year: string;
  description: string;
  highlight: string;
  frameworks: string[];
  keyOutcomes: string[];
  color: string;
  aspect: 'portrait' | 'landscape' | 'square';
  featuredQuote?: string;
  deliverables: string[];
}

export interface Service {
  id: string;
  num: string;
  title: string;
  subservices: string[];
  description: string;
  capabilities: string[];
  editorialLead: string;
}

export interface InsightArticle {
  id: string;
  category: 'Sustainability' | 'ESG' | 'Reporting' | 'Corporate Communication';
  title: string;
  date: string;
  readTime: string;
  lead: string;
  paragraphs: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  specialization: string;
  image?: string;
  experience?: string;
}

export const SERVICES: Service[] = [
  {
    id: 'reporting',
    num: '01',
    title: 'REPORTING',
    subservices: ['Annual Reports', 'Sustainability Reports', 'Company Profiles'],
    description:
      'Reports that go beyond compliance — translating company performance, values, and sustainability commitments into clear and compelling stories.',
    editorialLead:
      'We orchestrate end-to-end disclosure cycles from materiality assessment to final editorial publication, aligning regulatory adherence with brand gravitas.',
    capabilities: [
      'GRI Standards 2021 & Sector Standards compliance',
      'OJK POJK 51/POJK.03/2017 regulatory mapping',
      'IFRS S1 & S2 (ISSB) climate disclosure preparation',
      'Editorial copywriting, bilingual translation & proofreading',
      'Executive layout design, data visualization & infographics',
    ],
  },
  {
    id: 'esg-proper',
    num: '02',
    title: 'ESG RATING ASSISTANCE & PROPER',
    subservices: [
      'PROPER documentation',
      'ESG rating preparation',
      'Narrative development',
      'Supporting documentation',
    ],
    description:
      'Strategic support to help companies prepare stronger sustainability narratives and documentation for ESG assessments and PROPER requirements.',
    editorialLead:
      'Navigating rigorous environmental and social audits requires precision. We translate complex operational metrics into verifiable compliance dossiers.',
    capabilities: [
      'KLHK PROPER Beyond Compliance (Hijau & Emas) dossier structuring',
      'Life Cycle Assessment (LCA) & Social Return on Investment (SROI) narratives',
      'S&P Global CSA, MSCI, and Sustainalytics response alignment',
      'Stakeholder engagement verification & materiality matrices',
      'Policy document drafting & gap analysis for ESG scoring',
    ],
  },
  {
    id: 'communication',
    num: '03',
    title: 'SUSTAINABILITY COMMUNICATION',
    subservices: [
      'Company Calendars',
      'Internal Magazines',
      'Marketing Collaterals',
      'Infographics',
      'Posters',
    ],
    description:
      'Creative communication that makes sustainability initiatives easier to understand, remember, and engage with.',
    editorialLead:
      'Sustainability fails when locked inside a 300-page PDF. We translate corporate commitments into compelling cultural touchpoints across every stakeholder channel.',
    capabilities: [
      'Corporate sustainability culture campaigns & employee engagement',
      'Executive stakeholder summary brochures & digital microsites',
      'Complex ESG infographics, dashboards & impact visual systems',
      'Commemorative institutional publications & calendars',
      'Public disclosure launches & media briefing collaterals',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'kideco',
    code: 'KIDECO',
    client: 'Kideco Jaya Agung',
    fullName: 'PT Kideco Jaya Agung',
    category: 'Sustainability Report',
    year: '2024 / 2025',
    description:
      'Comprehensive sustainability reporting charting landmark energy transition, post-mining environmental rehabilitation, and community empowerment in East Kalimantan.',
    highlight: 'Beyond compliance reporting aligned with GRI Standards and PROPER Emas verification.',
    frameworks: ['GRI Standards 2021', 'POJK 51', 'PROPER Emas Alignment', 'TCFD Framework'],
    keyOutcomes: [
      '100% compliant with OJK Regulation No. 51/POJK.03/2017',
      'Featured comprehensive biodiversity restoration & carbon offset indices',
      'Clear stakeholder accountability across 5 regional operational hubs',
    ],
    color: '#162b1e',
    aspect: 'portrait',
    featuredQuote: 'Transforming industrial stewardship into an authentic, measurable sustainability dialogue.',
    deliverables: ['Full Sustainability Report (320 pages)', 'Executive Summary Booklet', 'Digital Interactive PDF'],
  },
  {
    id: 'danamon',
    code: 'DANAMON',
    client: 'Bank Danamon Indonesia',
    fullName: 'PT Bank Danamon Indonesia Tbk',
    category: 'Annual Report',
    year: '2024',
    description:
      'Integrated corporate reporting presenting sustainable finance milestones, inclusive banking initiatives, and financial governance under MUFG global alignment.',
    highlight: 'Integrated corporate reporting articulating financial resilience and green financing growth.',
    frameworks: ['OJK Rules', 'GRI 2021', 'POJK 51', 'IDX Corporate Governance'],
    keyOutcomes: [
      'Seamless financial performance and sustainable portfolio synthesis',
      'Editorial elegance reflecting premier banking governance',
      'Bilingual publication delivered under strict disclosure timelines',
    ],
    color: '#1b2230',
    aspect: 'landscape',
    featuredQuote: 'Framing banking governance with editorial precision and financial transparency.',
    deliverables: ['Annual Financial & Governance Report', 'Interactive Data Annex', 'Shareholder Briefing Suite'],
  },
  {
    id: 'wilmar',
    code: 'WILMAR',
    client: 'Wilmar Group Indonesia',
    fullName: 'Wilmar Nabati Indonesia & Plantation Entities',
    category: 'ESG & PROPER',
    year: '2024',
    description:
      'Specialized PROPER documentation and NDPE (No Deforestation, No Peat, No Exploitation) performance disclosures across processing facilities.',
    highlight: 'Rigorous multi-facility documentation achieving exceptional environmental compliance ratings.',
    frameworks: ['KLHK PROPER', 'RSPO / ISPO Compliance', 'GRI Topic Standards'],
    keyOutcomes: [
      'Comprehensive environmental management dossiers across 12 industrial sites',
      'Transparent supply chain traceability and community grievance mechanisms',
      'Verified waste-to-energy and biomass utilization storytelling',
    ],
    color: '#21291c',
    aspect: 'portrait',
    deliverables: ['PROPER Environmental Dossiers', 'Traceability Narrative Systems', 'Benchmarking Analysis'],
  },
  {
    id: 'metrodata',
    code: 'METRODATA',
    client: 'Metrodata Electronics',
    fullName: 'PT Metrodata Electronics Tbk',
    category: 'Sustainability Report',
    year: '2024',
    description:
      'Narrating the digital transformation leader’s ESG commitments, e-waste lifecycle stewardship, and cybersecurity governance in Indonesia’s digital economy.',
    highlight: 'Technology ESG disclosure addressing Scope 2 greenhouse emissions and data trust architecture.',
    frameworks: ['GRI Standards', 'POJK 51', 'SASB Technology & Communications'],
    keyOutcomes: [
      'First comprehensive carbon footprint mapping across digital supply chains',
      'Clear narrative on human capital development and tech equity',
      'Editorial layout reflecting dynamic tech-industry sophistication',
    ],
    color: '#182433',
    aspect: 'square',
    deliverables: ['Digital Sustainability Report', 'ESG Highlight Deck', 'Investor Infographic Series'],
  },
  {
    id: 'mnc',
    code: 'MNC',
    client: 'MNC Media & Entertainment',
    fullName: 'MNC Media Ecosystem',
    category: 'Communication',
    year: '2023 / 2024',
    description:
      'Internal sustainability campaign, executive calendars, and creative infographics translating group-wide ESG milestones for tens of thousands of employees.',
    highlight: 'Engaging, human-centered communications turning complex corporate metrics into cultural resonance.',
    frameworks: ['Corporate Identity Standards', 'Employee ESG Guidelines'],
    keyOutcomes: [
      'Nationwide circulation across multimedia and broadcast divisions',
      'Measurable increase in internal sustainability program engagement',
      'Distinctive editorial magazine format for corporate anniversary',
    ],
    color: '#2a1e27',
    aspect: 'portrait',
    deliverables: ['Quarterly Internal ESG Magazine', 'Executive Calendar Series', 'Digital Motion Infographics'],
  },
  {
    id: 'emi',
    code: 'EMI',
    client: 'Energy Management Indonesia',
    fullName: 'PT Energy Management Indonesia (Persero)',
    category: 'ESG & PROPER',
    year: '2024',
    description:
      'National energy efficiency consultancy report showcasing decarbonization roadmaps, renewable energy audits, and public-private sector partnerships.',
    highlight: 'Technical decarbonization narratives made accessible for state and private investors.',
    frameworks: ['ISO 50001 Alignment', 'POJK 51', 'GRI Energy Sector'],
    keyOutcomes: [
      'Detailed case studies on industrial energy conservation audits',
      'High-impact visual diagrams of carbon reduction trajectories',
      'Strategic alignment with Indonesia Net Zero Emission 2060 roadmap',
    ],
    color: '#1c2826',
    aspect: 'landscape',
    deliverables: ['Strategic Energy Audit Disclosures', 'Decarbonization Roadmap Visuals', 'Annual Review'],
  },
  {
    id: 'wtjj',
    code: 'WTJJ',
    client: 'Wika Tirta Jaya Jatiluhur',
    fullName: 'PT Wika Tirta Jaya Jatiluhur',
    category: 'Annual Report',
    year: '2023',
    description:
      'Drinking water infrastructure infrastructure project reporting, tracking critical pipeline development and safe water supply access for Greater Jakarta.',
    highlight: 'Infrastructure development and SDG 6 (Clean Water and Sanitation) reporting.',
    frameworks: ['GRI Standards', 'POJK 51', 'SDG Impact Metrics'],
    keyOutcomes: [
      'Clear demonstration of socioeconomic impact for 2 million urban beneficiaries',
      'Construction environmental mitigation and watershed protection narratives',
      'Stringent infrastructure governance and audit reporting',
    ],
    color: '#172738',
    aspect: 'portrait',
    deliverables: ['Annual Report Document', 'Milestone Documentation Suite', 'Executive Briefing Book'],
  },
  {
    id: 'kideco-proper',
    code: 'STAR',
    client: 'Star Energy Geothermal',
    fullName: 'Star Energy Geothermal Group',
    category: 'ESG & PROPER',
    year: '2024',
    description:
      'Geothermal sustainability storytelling highlighting clean baseload energy, volcanic biodiversity conservation, and zero-incident environmental stewardship.',
    highlight: 'Renewable energy ESG disclosures benchmarked against global clean energy leaders.',
    frameworks: ['GRI Energy Standards', 'PROPER Hijau / Emas Criteria', 'TCFD'],
    keyOutcomes: [
      'Pioneering volcanic geothermal ecosystem protection narrative',
      'Transparent greenhouse gas avoidance calculations',
      'Community stewardship around Wayang Windu, Salak, and Darajat fields',
    ],
    color: '#183020',
    aspect: 'landscape',
    deliverables: ['ESG Assessment Dossier', 'Biodiversity Conservation Book', 'Executive Factsheet'],
  },
  {
    id: 'asbi',
    code: 'ASBI',
    client: 'Asuransi Bintang',
    fullName: 'PT Asuransi Bintang Tbk',
    category: 'Annual Report',
    year: '2023 / 2024',
    description:
      'Insurance risk management disclosures, climate resilience underwriting, and corporate governance for one of Indonesia’s longest-standing general insurers.',
    highlight: 'Articulating underwriting prudence and long-term financial solvency.',
    frameworks: ['OJK Insurance Directives', 'POJK 51', 'GRI Standards'],
    keyOutcomes: [
      'Rigorous integration of climate risk into general insurance portfolios',
      'Modernized editorial presentation celebrating corporate longevity',
      'Full compliance with OJK transparency standards',
    ],
    color: '#282318',
    aspect: 'square',
    deliverables: ['Annual & Sustainability Integrated Report', 'Interactive Digital Version'],
  },
  {
    id: 'sun',
    code: 'SUN',
    client: 'SUN Energy',
    fullName: 'PT Surya Utama Nuansa (SUN Energy)',
    category: 'Sustainability Report',
    year: '2024',
    description:
      'Rooftop solar and commercial solar adoption reports celebrating megawatt-peak deployment across manufacturing plants throughout Southeast Asia.',
    highlight: 'Clean energy commercialization and Scope 2 emission reduction disclosures.',
    frameworks: ['GRI 2021', 'POJK 51', 'GHG Protocol Corporate Standard'],
    keyOutcomes: [
      'Calculated 200,000+ metric tons of lifetime CO2 avoided for clients',
      'High-impact visual breakdowns of C&I solar economics',
      'Regional expansion storytelling across Indonesia, Thailand, and Vietnam',
    ],
    color: '#1e2d28',
    aspect: 'portrait',
    deliverables: ['Corporate Sustainability Report', 'Impact Portfolio Brochure', 'Client Case Deck'],
  },
  {
    id: 'witon',
    code: 'WITON',
    client: 'Wijaya Karya Beton',
    fullName: 'PT Wijaya Karya Beton Tbk (WIKA Beton)',
    category: 'Annual Report',
    year: '2023',
    description:
      'Precast concrete engineering leadership report highlighting green concrete formulations, industrial safety, and mega-infrastructure contributions.',
    highlight: 'Industrial engineering governance and eco-concrete research disclosures.',
    frameworks: ['POJK 51', 'GRI Construction & Real Estate', 'IDX Disclosure Rules'],
    keyOutcomes: [
      'Comprehensive reporting on low-carbon binder and slag utilization',
      'Clear occupational safety (K3) zero-fatality benchmarks',
      'Clean architectural layout honoring engineering precision',
    ],
    color: '#23252a',
    aspect: 'landscape',
    deliverables: ['Annual Financial & Operational Report', 'Sustainability Performance Insert'],
  },
  {
    id: 'tamaris',
    code: 'TAMARIS',
    client: 'Tamaris Hydro',
    fullName: 'PT Tamaris Hydro',
    category: 'ESG & PROPER',
    year: '2024',
    description:
      'Run-of-river mini-hydro development reporting, balancing localized rural electrification with aquatic ecosystem preservation.',
    highlight: 'Run-of-river clean power impact metrics and riparian zone environmental audits.',
    frameworks: ['GRI Standards', 'PROPER Environmental Audit', 'IFC Performance Standards'],
    keyOutcomes: [
      'River ecosystem baseline and fish pass preservation reporting',
      'Decentralized renewable power generation data across Sumatra and Sulawesi',
      'Structured compliance documentation for international development financiers',
    ],
    color: '#1a2b25',
    aspect: 'portrait',
    deliverables: ['Environmental & Social Due Diligence Report', 'PROPER Narrative Annex'],
  },
  {
    id: 'niaga',
    code: 'NIAGA',
    client: 'CIMB Niaga Auto Finance',
    fullName: 'PT CIMB Niaga Auto Finance (CNAF)',
    category: 'Annual Report',
    year: '2023 / 2024',
    description:
      'Consumer auto financing disclosures featuring electric vehicle loan portfolio expansion and digital-first credit underwriting.',
    highlight: 'Sustainable mobility financing and digital customer experience disclosures.',
    frameworks: ['POJK 51', 'OJK Multifinance Directives', 'GRI Standards'],
    keyOutcomes: [
      'Tripled green financing portfolio for hybrid and electric vehicles documented',
      'Digital paperless loan processing metrics highlighted',
      'Warm editorial tone reinforcing trusted corporate governance',
    ],
    color: '#2b1e1e',
    aspect: 'square',
    deliverables: ['Integrated Annual Report', 'Financial Statement Book', 'ESG Summary Leaflet'],
  },
  {
    id: 'jihd',
    code: 'JIHD',
    client: 'Jakarta International Hotels & Dev.',
    fullName: 'PT Jakarta International Hotels & Development Tbk',
    category: 'Annual Report',
    year: '2023',
    description:
      'Iconic hospitality and property development reporting (Hotel Borobudur, SCBD development) focusing on heritage preservation and urban sustainability.',
    highlight: 'Hospitality stewardship, historic conservation, and modern urban management.',
    frameworks: ['POJK 51', 'GRI Hospitality Standards', 'IDX Governance'],
    keyOutcomes: [
      'Energy and water efficiency measures across premier hospitality assets',
      'Heritage preservation of Jakarta urban landmarks',
      'Premium editorial layout reflecting luxury hospitality standards',
    ],
    color: '#252119',
    aspect: 'landscape',
    deliverables: ['Annual Report', 'Sustainability Overview', 'Executive Presentation'],
  },
  {
    id: 'cepu',
    code: 'CEPU',
    client: 'Cepu Block Energy Alliance',
    fullName: 'ExxonMobil Cepu Limited & Partners',
    category: 'Communication',
    year: '2024',
    description:
      'Community stewardship and local vendor development publications showcasing sustainable community empowerment in Bojonegoro and Tuban.',
    highlight: 'Grassroots socioeconomic impact and high-value local supply chain development.',
    frameworks: ['SKK Migas Guidelines', 'Local Content Directives (TKDN)', 'Community Investment Standards'],
    keyOutcomes: [
      'High-impact human interest documentary storytelling',
      'Clear tracking of billions of rupiah in localized economic development',
      'Distributed to government regulators, local regencies, and civic stakeholders',
    ],
    color: '#1d222b',
    aspect: 'portrait',
    deliverables: ['Community Impact Review Magazine', 'Infographic Wall Maps', 'Stakeholder Overview'],
  },
  {
    id: 'ehp',
    code: 'EHP',
    client: 'Eagle High Plantations',
    fullName: 'PT Eagle High Plantations Tbk',
    category: 'Sustainability Report',
    year: '2024',
    description:
      'Sustainable palm oil governance, NDPE commitments, zero-deforestation monitoring, and smallholder empowerment across plantation estates.',
    highlight: 'Comprehensive NDPE disclosures and RSPO/ISPO traceability framework.',
    frameworks: ['GRI Standards', 'POJK 51', 'RSPO / ISPO Guidelines'],
    keyOutcomes: [
      'Transparent traceability to plantation mapping',
      'Smallholder inclusive economic partnership indicators',
      'Audited conservation area (HCV/HCS) preservation data',
    ],
    color: '#1a291e',
    aspect: 'portrait',
    deliverables: ['Annual Sustainability Report', 'Executive Summary', 'Investor Presentation'],
  },
  {
    id: 'dumai',
    code: 'DUMAI',
    client: 'Dumai Industrial Port Complex',
    fullName: 'Kawasan Industri Dumai',
    category: 'ESG & PROPER',
    year: '2023 / 2024',
    description:
      'Port terminal environmental stewardship, wastewater treatment compliance, and industrial marine biodiversity monitoring in Riau.',
    highlight: 'Maritime industrial environmental compliance and port sustainability disclosures.',
    frameworks: ['KLHK PROPER', 'POJK 51', 'ISO 14001 Standards'],
    keyOutcomes: [
      'Comprehensive marine and coastal effluent monitoring records',
      'Clean air and industrial energy optimization benchmarks',
      'Regulatory clearance with provincial environmental agencies',
    ],
    color: '#1c242e',
    aspect: 'landscape',
    deliverables: ['PROPER Environmental Management Report', 'Port ESG Overview', 'Monitoring Annex'],
  },
  {
    id: 'mega',
    code: 'MEGA',
    client: 'Bank Mega',
    fullName: 'PT Bank Mega Tbk',
    category: 'Annual Report',
    year: '2023',
    description:
      'Retail banking modernization, digital financial inclusion, and corporate governance disclosures for the national banking franchise.',
    highlight: 'Prudent banking governance and digital transaction security reporting.',
    frameworks: ['OJK Disclosure Regulations', 'POJK 51', 'GRI Standards'],
    keyOutcomes: [
      'Clear financial and sustainable finance performance metrics',
      'Digital banking consumer protection disclosures',
      'Strict corporate governance compliance with banking authorities',
    ],
    color: '#2d2218',
    aspect: 'square',
    deliverables: ['Annual Financial & Corporate Report', 'Governance Briefing', 'Digital Data Sheet'],
  },
  {
    id: 'dsn',
    code: 'DSN',
    client: 'Dharma Satya Nusantara',
    fullName: 'PT Dharma Satya Nusantara Tbk (DSNG)',
    category: 'Sustainability Report',
    year: '2024',
    description:
      'Circular economy reporting celebrating Bio-CNG renewable energy capture, certified wood products, and zero-waste palm oil mills.',
    highlight: 'Pioneering Bio-CNG renewable energy capture and circular resource management.',
    frameworks: ['GRI Standards 2021', 'POJK 51', 'TCFD Climate Disclosures'],
    keyOutcomes: [
      'Detailed Bio-CNG diesel displacement and GHG avoidance calculation',
      'FSC certified wood processing and sustainable forestry metrics',
      'Recognized national benchmark in circular agribusiness disclosure',
    ],
    color: '#192b21',
    aspect: 'portrait',
    deliverables: ['Sustainability Report Document', 'Executive Summary Deck', 'Interactive ESG Data Table'],
  },
];

export const PRINCIPLES = [
  {
    num: '01',
    title: 'CLARITY',
    summary: 'Making complex information understandable.',
    description:
      'Corporate operations, emissions data, supply chain networks, and financial structures are inherently complex. We distill vast spreadsheets and technical documentation into intuitive, unambiguous narratives that senior executives and external analysts can instantly digest.',
  },
  {
    num: '02',
    title: 'CREDIBILITY',
    summary: 'Building reports and narratives grounded in accurate information.',
    description:
      'Greenwashing has no place in modern business. We verify data points, cross-reference disclosure guidelines (POJK 51, GRI, ISSB, PROPER), and construct unassailable narratives backed by verifiable metrics and auditable methodologies.',
  },
  {
    num: '03',
    title: 'CREATIVITY',
    summary: 'Combining strategic thinking with strong visual communication.',
    description:
      'Data without visual structure is noise. We apply high-level Swiss editorial typography, purposeful color restraint, bespoke information graphics, and cinematic pacing so that reading a corporate report feels engaging and memorable.',
  },
  {
    num: '04',
    title: 'COLLABORATION',
    summary: 'Working closely with clients throughout the sustainability journey.',
    description:
      'We do not operate as detached vendors. We sit as strategic advisors beside your board, corporate secretary, ESG committee, and operational teams — guiding you through audits, content gathering, stakeholder feedback, and executive sign-offs.',
  },
];

export const TEAM: TeamMember[] = [
  {
    name: 'Carolin',
    role: 'Managing Director',
    specialization: 'Strategic Advisory & Corporate Governance',
    experience: '7+ Years Experience',
    image: '/team-hendra.jpg',
    bio: 'With over 7 years of leadership in corporate communication and sustainability, Carolin guides corporate boards through regulatory transitions, disclosure strategies, and sustainable governance architecture.',
  },
  {
    name: 'Aji Sanjaya',
    role: 'Creative Director',
    specialization: 'Information Architecture & Editorial Systems',
    experience: '7+ Years Experience',
    image: '/team-aji.webp',
    bio: 'Championing editorial craft and visual rigor, turning complex data into compelling annual reports across manufacturing, retail, and healthcare with unmistakable clarity.',
  },
  {
    name: 'Mike Sanjaya',
    role: 'Account Executive',
    specialization: 'Client Partnership & Disclosure Operations',
    experience: '3+ Years Experience',
    image: '/team-mike.jpg',
    bio: 'Ensuring seamless project momentum, multi-stakeholder synchronization, and strict adherence to regulatory filing deadlines across public listed and state-owned enterprises.',
  },
  {
    name: 'Muhamad Hendra Prasetya',
    role: 'Writer',
    specialization: 'ESG Analysis & Regulatory Copywriting',
    experience: 'Report Specialist',
    image: '/team-carolin.jpg',
    bio: 'Translating complex sustainability indicators, PROPER environmental matrices, and corporate strategy into articulate narratives that reflect company values and sustainable impact.',
  },
];

export const INSIGHTS: InsightArticle[] = [
  {
    id: 'ojk-issb-transition',
    category: 'Reporting',
    title: 'Navigating the Intersection of POJK 51 and ISSB IFRS S1/S2 in Indonesia',
    date: 'February 2026',
    readTime: '6 min read',
    lead: 'As the Financial Services Authority (OJK) harmonizes national disclosure requirements with global baseline standards, Indonesian public companies must adapt their reporting architecture.',
    paragraphs: [
      'Over the past five years, POJK 51/POJK.03/2017 established a solid baseline for sustainable finance and mandatory sustainability reporting across Indonesian financial institutions, issuers, and public companies. However, the international consolidation of disclosure standards under the International Sustainability Standards Board (ISSB) — specifically IFRS S1 (General Requirements) and IFRS S2 (Climate-related Disclosures) — is now reshaping institutional investor expectations.',
      'The critical shift lies in moving from purely qualitative descriptive commitments to rigorous, financially material risk assessments. Under ISSB, climate disclosures are not an appendix to the annual report; they are directly linked to financial statements and enterprise value creation.',
      'At ASA Media, we help corporate secretaries and ESG task forces build unified data gathering mechanisms. Rather than running parallel reporting efforts, we structure materiality matrices that satisfy OJK compliance while pre-aligning with ISSB Scope 1, 2, and 3 disclosure recommendations.',
    ],
  },
  {
    id: 'proper-beyond-compliance',
    category: 'ESG',
    title: 'Beyond Compliance: Deconstructing the Criteria for PROPER Emas & Hijau',
    date: 'January 2026',
    readTime: '8 min read',
    lead: 'Securing a Green or Gold rating in the Ministry of Environment and Forestry’s PROPER program requires more than meeting regulatory standards — it demands systemic proof of regenerative value.',
    paragraphs: [
      'The PROPER assessment overseen by KLHK has evolved into one of the world’s most comprehensive national industrial environmental rating systems. While Blue status verifies standard regulatory compliance, ascending to Hijau (Green) and Emas (Gold) mandates continuous improvement in Life Cycle Assessment (LCA), biodiversity conservation, greenhouse gas accounting, water stewardship, and social innovation.',
      'Many organizations generate remarkable on-the-ground community impacts but falter during documentation. A winning PROPER dossier requires methodical narrative construction: articulating Social Return on Investment (SROI) calculations, demonstrating stakeholder co-creation, and establishing closed-loop circular economy initiatives.',
      'Our team specializes in synthesizing disparate engineering logs, community development audits, and environmental metrics into an unassailable, verified submission dossier that clearly proves leadership beyond compliance.',
    ],
  },
  {
    id: 'editorial-restraint-in-sustainability',
    category: 'Corporate Communication',
    title: 'The Death of Greenwash Clichés: Why Editorial Restraint Builds Real Trust',
    date: 'December 2025',
    readTime: '5 min read',
    lead: 'Why the era of stock photos showing hands holding seedlings is officially over — and what discerning stakeholders actually expect from corporate sustainability communication.',
    paragraphs: [
      'For decades, corporate sustainability design fell victim to visual tropes: bright green leaf motifs, cartoonish eco-badges, and vague promises of a "greener tomorrow." Today’s capital allocators, credit rating agencies, and discerning public stakeholders see through decorative environmentalism instantly.',
      'True credibility requires editorial dignity. A report that frankly addresses difficult Scope 3 supply chain realities, acknowledges technological bottlenecks in decarbonization, and presents real engineering data in clear typography earns infinitely more institutional trust than one wrapped in superficial eco-marketing.',
      'Design should never mask uncertainty; it should provide structural clarity. When corporate communications embrace restraint, every verified achievement speaks with amplified authority.',
    ],
  },
  {
    id: 'gri-universal-standards-evolution',
    category: 'Sustainability',
    title: 'Materiality in Practice: Implementing the Revised GRI Sector Standards',
    date: 'November 2025',
    readTime: '7 min read',
    lead: 'The Global Reporting Initiative’s Sector Standards place unprecedented emphasis on double materiality and sectoral context. Here is how Indonesian leaders are preparing.',
    paragraphs: [
      'The latest iterations of GRI Universal Standards have permanently shifted the focus from company-centric sustainability storytelling to the company’s actual positive and negative impacts on the economy, environment, and people. For extractive industries, agriculture, and financial services in Southeast Asia, this means granular disclosures.',
      'Conducting a genuine materiality assessment is not an annual check-the-box exercise. It requires structured engagement with indigenous communities, labor unions, downstream supply chain vendors, and institutional investors.',
      'By architecting clear stakeholder engagement roadmaps and verifiable indicator tables, ASA Media ensures that your disclosures withstand third-party assurance audits while conveying a distinct corporate legacy.',
    ],
  },
];
