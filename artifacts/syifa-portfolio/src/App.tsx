import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, ExternalLink, Instagram, Mail, Menu, MousePointer2, Phone, X } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  category: 'Data & BI' | 'Product & UX' | 'Personal';
  label: string;
  page: number;
  deck: string;
  challenge: string;
  solution: string;
  tools: string[];
  extraPages?: number[];
  duration?: string;
  insights?: string[];
};

const asset = (name: string) => `/assets/portfolio/${name}`;
const cvPage = (page: number) => asset(`cv-page-${String(page).padStart(2, '0')}.png`);

const projects: Project[] = [
  {
    id: 'zara', title: 'Zara Sales Performance', category: 'Data & BI', label: 'Sales analysis · Tableau', page: 2,
    deck: 'A five-year look at Zara sales, shaped into a clear Tableau story for more confident decisions.',
    challenge: 'Five years of retail data can hide the patterns that matter. This analysis covered sales from 2018–2022, with a focus on product, price, seasonality and revenue.',
    solution: 'I cleaned and explored the data in Excel, then built an interactive Tableau dashboard to make the performance patterns easier to read.',
    tools: ['Excel', 'Tableau'],
    insights: ['Product categories and seasonality mattered more than price alone.', 'Blouse and Beach Shirt were the leading revenue categories.', 'Sales patterns remained relatively stable from 2018 to 2022.'],
  },
  {
    id: 'pizza', title: 'Pizza Sales Performance', category: 'Data & BI', label: 'Sales analysis · Excel', page: 3,
    deck: 'A year of transactions transformed into a dynamic dashboard that makes demand patterns visible.',
    challenge: 'The sales data could not quickly answer which pizzas drive revenue, when demand peaks, or which sizes and categories deserve attention.',
    solution: 'I structured one year of sales data and built an interactive Excel dashboard with pivot tables, formulas and dynamic charts for day, hour, category and size.',
    tools: ['Excel'],
    insights: ['Friday and Saturday evenings saw the highest order volumes.', 'Demand peaks around lunch (12–1) and dinner (4–8).', 'Classic category and Large size together drove nearly half of sales.'],
  },
  {
    id: 'nexamart', title: 'NexaMart', category: 'Data & BI', label: 'Retail dashboard · Power BI', page: 4,
    deck: 'A Power BI retail dashboard connecting the signals across sales, profit, customers, products and regions.',
    challenge: 'Retail data across customers, products, sales, profit, discounts and regions was difficult to interpret in raw tables.',
    solution: 'I created a Power BI dashboard with KPI cards, charts and interactive filters so users can explore business performance and identify important patterns.',
    tools: ['Power BI'],
  },
  {
    id: 'iris', title: 'Building a Cloud-Based Iris Classification Workflow', category: 'Data & BI', label: 'Cloud database · Machine learning', page: 5,
    deck: 'A cloud workflow exploring database, spatial, graph and machine-learning capabilities with Oracle Cloud.',
    challenge: 'Build a connected workflow to classify Iris species while exploring cloud-native database and machine-learning tools.',
    solution: 'The workflow applies CRISP-DM with Oracle Autonomous Database, OML AutoML, Oracle Spatial, and Property Graph / PGQL.',
    tools: ['Oracle Cloud', 'Autonomous Database', 'OML AutoML', 'Oracle Spatial', 'Property Graph / PGQL'],
  },
  {
    id: 'travelbuddy', title: 'TravelBuddy', category: 'Product & UX', label: 'Travel planning · Figma', page: 6, duration: 'One month',
    deck: 'A travel-planning app concept for bringing destinations, activities, schedules and trip details into one place.',
    challenge: 'Planning a trip often means juggling destinations, activities, schedules and travel information across multiple places.',
    solution: 'I worked across business and UI/UX to shape a structured app concept that helps users organize travel plans in a more convenient way.',
    tools: ['Figma', 'Business analysis', 'UI/UX'],
  },
  {
    id: 'kulasku', title: 'KulkasKu', category: 'Product & UX', label: 'Fridge inventory · Figma', page: 7, duration: 'One week',
    deck: 'A fridge companion concept for knowing what is on hand, what is expiring and what to cook next.',
    challenge: 'Forgotten ingredients, last-minute grocery runs and uncertainty about what to cook can make everyday meal planning harder.',
    solution: 'KulkasKu helps users track fridge stock and expiry dates, scan ingredients with a camera, and discover recipes based on what they already have.',
    tools: ['Figma', 'Business analysis', 'UI/UX'],
  },
  {
    id: 'money-rv', title: 'Money RV', category: 'Product & UX', label: 'Smart waste · Figma', page: 8, duration: 'Two weeks',
    deck: 'A smart waste-management concept for bin monitoring, collection planning and more informed operations.',
    challenge: 'Manual bin inspections make it difficult to know when bins are full, which can lead to inefficient collection routes and limited visibility into waste conditions.',
    solution: 'A Figma concept that uses IoT and AI/ML to monitor waste conditions, predict bin capacity, identify waste patterns and optimize collection routes.',
    tools: ['Figma', 'IoT concept', 'AI/ML concept'],
  },
  {
    id: 'my-bin', title: 'My Bin', category: 'Product & UX', label: 'Smart waste · Figma', page: 9, duration: 'Two weeks',
    deck: 'A second, separately presented smart waste-management concept focused on smarter bin monitoring and collection.',
    challenge: 'Manual bin inspections make it difficult to know when bins are full, which can lead to inefficient collection routes and limited visibility into waste conditions.',
    solution: 'A Figma concept that uses IoT and AI/ML to monitor waste conditions, predict bin capacity, identify waste patterns and optimize waste collection routes.',
    tools: ['Figma', 'IoT concept', 'AI/ML concept'],
  },
  {
    id: 'edulearn', title: 'EduLearn', category: 'Product & UX', label: 'Learning platform · Figma', page: 10,
    deck: 'A mobile learning platform concept designed to bring student routines and resources into one clear space.',
    challenge: 'Students can find it difficult to access and manage academic activities across digital platforms, especially with different levels of digital literacy and unstable internet connections.',
    solution: 'EduLearn brings learning progress, class schedules, course materials, assignments, discussions and personal information into a simple mobile platform.',
    tools: ['Figma'],
  },
  {
    id: 'toko-cris', title: 'Toko Cris', category: 'Product & UX', label: 'Inventory system · Figma', page: 11,
    deck: 'A centralized inventory web concept for a seller working across Tokopedia, TikTok Shop and Shopee.',
    challenge: 'Manual stock updates across three marketplaces make it difficult to see remaining inventory, fast-selling items and when to reorder.',
    solution: 'I designed a centralized inventory management experience in Figma to sync stock and orders across marketplaces and replace scattered tracking.',
    tools: ['Figma', 'Process analysis', 'Inventory management'],
  },
  {
    id: 'kreaologi', title: 'Kreaologi', category: 'Product & UX', label: 'Craft learning & community · Figma', page: 12,
    deck: 'A web and mobile learning and community platform for Indonesian craft enthusiasts and UMKM.',
    challenge: 'Learning, product discovery and community for local craft makers are scattered across different platforms.',
    solution: 'I independently designed the complete experience end-to-end in Figma, bringing classes, activities, product discovery and community together.',
    tools: ['Figma', 'End-to-end design'],
  },
  {
    id: 'hampiness', title: 'Hampiness', category: 'Product & UX', label: 'Ordering system · Figma + Draw.io', page: 13, extraPages: [14, 15],
    deck: 'A hampers information system connecting customers, vendors and administrators in one ordering journey.',
    challenge: 'Customers faced unclear product information and delivery estimates, while vendors needed better order notifications and administrators needed an overview of order activity.',
    solution: 'I designed an integrated platform for browsing and ordering hampers, vendor product and order management, and administrator reporting. Supporting materials include the real data-flow, fishbone, use-case and sequence diagrams.',
    tools: ['Figma', 'Draw.io', 'Process analysis'],
  },
  {
    id: 'focus-room', title: 'Focus Room', category: 'Personal', label: 'Pomodoro study website · VS Code', page: 16,
    deck: 'A personal Pomodoro study website designed to make focused sessions feel a little more inviting.',
    challenge: 'I wanted a simple way to manage study time and breaks, and found a plain timer did not make studying feel inspiring.',
    solution: 'I created Focus Room as a Pomodoro website with a visual study companion, then built it in VS Code for my own daily use.',
    tools: ['VS Code', 'HTML', 'CSS'],
  },
];

const skillGroups = [
  { title: 'Data & intelligence', values: ['Excel', 'SQL', 'Tableau', 'Power BI', 'Data analysis', 'Data visualization', 'Dashboards'] },
  { title: 'Systems & cloud', values: ['Oracle Cloud', 'AutoML', 'Database management'] },
  { title: 'Product & collaboration', values: ['Business analysis', 'Process analysis', 'Figma', 'Draw.io', 'Stakeholder communication'] },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function ProjectModal({ project, onClose, onImage }: { project: Project; onClose: () => void; onImage: (src: string, alt: string) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const items = document.querySelectorAll<HTMLElement>('.project-modal button, .project-modal a, .project-modal [tabindex="0"]');
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow; previous?.focus(); };
  }, [onClose]);
  const pages = [project.page, ...(project.extraPages ?? [])];
  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-deck">
        <div className="modal-top"><span>Selected work · CV page {String(project.page).padStart(2, '0')}</span><button ref={closeRef} className="icon-button" onClick={onClose} aria-label="Close project details" data-testid="button-close-project"><X size={18} /></button></div>
        <div className="modal-content">
          <h2 id="modal-title">{project.title}</h2>
          <p className="modal-deck" id="modal-deck">{project.deck}</p>
          <img className="modal-image" src={cvPage(project.page)} alt={`${project.title} real project presentation from CV page ${project.page}`} />
          <div className="modal-summary">
            <div><h3>The brief</h3><p>{project.challenge}</p></div>
            <div><h3>My approach</h3><p>{project.solution}</p>{project.duration && <p><strong>Duration:</strong> {project.duration}</p>}<div className="modal-tools">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div>
          </div>
          {project.insights && <div className="project-insights"><h3>What the data showed</h3><ul>{project.insights.map((insight) => <li key={insight}>{insight}</li>)}</ul></div>}
          {pages.length > 1 && <div className="modal-extra" aria-label="Supporting project visuals">{pages.slice(1).map((page) => <button className={`support-image ${page === 14 || page === 15 ? 'wide' : ''}`} key={page} onClick={() => onImage(cvPage(page), `Hampiness supporting project visual, CV page ${page}`)} aria-label={`Enlarge Hampiness supporting visual from CV page ${page}`}><img src={cvPage(page)} alt={`Hampiness supporting diagram and project visual from CV page ${page}`} /></button>)}</div>}
        </div>
      </section>
    </div>
  );
}

function App() {
  const [filter, setFilter] = useState('All work');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewer, setViewer] = useState<{ src: string; alt: string } | null>(null);
  const viewerCloseRef = useRef<HTMLButtonElement>(null);
  useReveal();
  const visibleProjects = useMemo(() => filter === 'All work' ? projects : projects.filter((project) => project.category === filter), [filter]);
  useEffect(() => {
    if (!viewer) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    viewerCloseRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setViewer(null);
      if (event.key === 'Tab') { event.preventDefault(); viewerCloseRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow; previous?.focus(); };
  }, [viewer]);
  const nav = [
    ['About', '#about'],
    ['Selected work', '#work'],
    ['Approach', '#approach'],
    ['Contact', '#contact'],
  ];
  const tickerItems = ['Business analysis', 'BI & data storytelling', 'Clear decisions', 'Curious by nature', 'Product thinking', 'Business analysis', 'BI & data storytelling', 'Clear decisions', 'Curious by nature', 'Product thinking'];
  const filters = ['All work', 'Data & BI', 'Product & UX', 'Personal'];

  return (
    <main className="portfolio">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Syifa Sabrina Amalia, back to top"><span className="brand-mark">S</span><span>SYIFA SABRINA AMALIA</span></a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} data-testid="button-menu-toggle">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
      </header>
      <div id="top" />
      <section className="hero" id="main-content" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Information Systems · BINUS University</div>
          <h1 id="hero-title">Make data<br />mean <em>something.</em></h1>
          <p className="hero-intro">I’m <strong>Syifa Sabrina Amalia</strong> — an Information Systems student drawn to the space where business questions, thoughtful analysis and clear stories meet.</p>
          <div className="hero-actions"><a className="button-primary" href="#work">Explore my work <ArrowDown size={15} /></a><a className="text-link" href="mailto:syifasabrina634@gmail.com">Start a conversation <ArrowUpRight size={14} /></a></div>
        </div>
        <div className="hero-art" aria-label="Portrait of Syifa Sabrina Amalia">
          <div className="portrait-frame"><img src={asset('syifa-portrait.png')} alt="Syifa Sabrina Amalia seated in a white blouse and black knit, portrait photograph" /></div>
          <div className="portrait-stamp" aria-hidden="true"><span>SS</span>CURIOUS<br />BY DESIGN</div>
          <div className="hero-note" aria-hidden="true">A little clarity<br />changes everything.</div>
        </div>
        <div className="hero-index" aria-hidden="true">PORTFOLIO / 2025—26</div>
      </section>
      <div className="ticker" aria-label="Areas of interest"><div className="ticker-track">{tickerItems.map((item, index) => <span key={`${item}-${index}`} style={{ display: 'contents' }}><span>{item}</span><span className="ticker-dot" /></span>)}</div></div>

      <section className="section about" id="about">
        <div className="about-aside reveal"><div className="quote-mark">“</div><p>Good analysis doesn’t end at an answer. It helps someone know what to do next.</p><small>A point of view I bring to every project</small><img className="about-photo" src={asset('syifa-portrait-closeup.png')} alt="Syifa Sabrina Amalia, close-up portrait" loading="lazy" /></div>
        <div className="about-copy reveal">
          <div className="section-kicker">A little about me</div><h2 className="section-heading">Curious about<br />the why.</h2>
          <p>I study <strong>Information Systems at BINUS University</strong>, where I’ve found my footing between business needs and technology. I like untangling a question, finding the signal in the data, then making the result clear enough to act on.</p>
          <p>From dashboards to product concepts, I care about the decision on the other side of the screen — and the people who need to make it.</p>
          <div className="skill-label">A toolkit for turning questions into direction</div>
          <div className="skill-list">{['Business analysis', 'BI', 'Data analysis', 'Dashboards', 'Data visualization', 'Process analysis', 'Stakeholder communication'].map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}</div>
        </div>
      </section>

      <section className="section projects" id="work">
        <div className="projects-head reveal"><div><div className="section-kicker">A selection of things I’ve worked on</div><h2 className="section-heading">From question<br />to point of view.</h2></div><p>Data stories and product ideas, each grounded in a real brief. Choose a project to explore its source presentation and summary.</p></div>
        <div className="filters" role="group" aria-label="Filter projects">{filters.map((value) => <button key={value} className="filter-btn" aria-pressed={filter === value} onClick={() => setFilter(value)} data-testid={`filter-${value.toLowerCase().replaceAll(' ', '-')}`}>{value}</button>)}</div>
        <div className="project-grid" aria-live="polite">
          {visibleProjects.map((project, index) => <button className="project-card reveal" key={project.id} onClick={() => setSelectedProject(project)} aria-label={`Open ${project.title} project details`} data-testid={`card-project-${project.id}`}>
            <div className="project-image"><span className="project-num">{String(projects.indexOf(project) + 1).padStart(2, '0')} / 13</span><img src={cvPage(project.page)} alt={`${project.title} real project visual from CV page ${project.page}`} loading={index > 3 ? 'lazy' : 'eager'} /><span className="project-tag">{project.category}</span></div>
            <div className="project-card-body"><div><h3>{project.title}</h3><p>{project.label}</p></div><span className="project-open" aria-hidden="true"><ArrowUpRight size={17} /></span></div>
          </button>)}
          {visibleProjects.length === 0 && <div className="empty-filter">No projects in this category yet. Try another filter.</div>}
        </div>
      </section>

      <section className="section process" id="approach">
        <div className="section-kicker">How I like to work</div><h2 className="section-heading reveal">A good question<br />deserves a clear answer.</h2>
        <div className="process-grid reveal">
          <article className="process-step"><span className="process-index">01 / LISTEN</span><h3>Start with context</h3><p>Understand the business question, the people asking it and what a useful decision looks like.</p></article>
          <article className="process-step"><span className="process-index">02 / INVESTIGATE</span><h3>Find the signal</h3><p>Structure information, explore patterns and stay curious about what the data does not say yet.</p></article>
          <article className="process-step"><span className="process-index">03 / SHAPE</span><h3>Make it legible</h3><p>Turn findings into a dashboard, flow or product concept that feels natural to navigate.</p></article>
          <article className="process-step"><span className="process-index">04 / SHARE</span><h3>Move forward</h3><p>Tell the story in plain language so a team can see the insight and choose a next step.</p></article>
        </div>
      </section>

      <section className="section tools-section" id="toolkit">
        <div className="reveal"><div className="section-kicker">Tools & strengths</div><h2 className="section-heading">Practical tools.<br /><em>People-first</em> thinking.</h2><p className="tools-intro">The tools change from project to project. The through line is making complex information useful, clear and considered.</p></div>
        <div className="reveal">{skillGroups.map((group, index) => <div className="tools-group" key={group.title}><h3>0{index + 1} / {group.title}</h3><div>{group.values.map((value) => <span key={value}>{value}</span>)}</div></div>)}</div>
      </section>

      <section className="section life" id="volunteering">
        <div className="life-copy reveal"><div className="section-kicker">Beyond the screen</div><h2 className="section-heading">Learning is<br />better shared.</h2><p>During my volunteer experience, I joined educational activities focused on cultural and environmental awareness. I taught children at an orphanage about Indonesian culture through fun, interactive learning activities.</p><p>I also led an educational session for students at SMA Mutiara Bangsa 6 about the importance of maintaining clean water and sanitation in support of SDG 6. These experiences helped me grow my communication, public speaking, teamwork and teaching skills.</p><a href="#contact" className="text-link">Say hello <ArrowRight size={13} /></a></div>
        <figure className="life-visual reveal"><img src={cvPage(17)} alt="Volunteer education activities and community photos from Syifa's CV" loading="lazy" /><figcaption>Education, culture & clean water awareness · CV page 17</figcaption></figure>
      </section>

      <section className="section certificates" id="certificates">
        <div className="cert-head reveal"><div><div className="section-kicker">Learning, always</div><h2 className="section-heading">A few things<br />I’ve learned.</h2></div><p>Selected certificate pages from my CV. Open an image to view it larger; names are intentionally left within the original documents.</p></div>
        <div className="cert-grid">
          {[18, 19].map((page) => <button className="cert-card reveal" key={page} onClick={() => setViewer({ src: cvPage(page), alt: `Certificate gallery page ${page} from Syifa's CV` })} aria-label={`Enlarge certificate gallery page ${page}`} data-testid={`button-certificate-${page}`}><img src={cvPage(page)} alt={`Certificate gallery page ${page} from Syifa's CV`} loading="lazy" /><p>Certificate gallery · CV page {page} <MousePointer2 size={12} /></p></button>)}
        </div>
      </section>

      <footer className="section contact" id="contact">
        <div className="section-kicker">Have a good question?</div><h2 className="section-heading">Let’s make the<br />next decision clearer.</h2>
        <div className="contact-info"><a href="mailto:syifasabrina634@gmail.com"><Mail size={15} /> syifasabrina634@gmail.com <ExternalLink size={12} /></a><a href="tel:+6287874631320"><Phone size={15} /> +62 878-7463-1320</a><a href="https://www.instagram.com/Syifafrza_/" target="_blank" rel="noreferrer"><Instagram size={15} /> @Syifafrza_ <ExternalLink size={12} /></a></div>
        <div className="contact-foot"><span>Syifa Sabrina Amalia · BINUS Information Systems</span><span>Made with curiosity, from Indonesia</span><a href="#top" style={{ color: 'inherit', textDecoration: 'none' }}>Back to top ↑</a></div>
      </footer>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} onImage={(src, alt) => setViewer({ src, alt })} />}
      {viewer && <div className="image-viewer" role="dialog" aria-modal="true" aria-label="Enlarged certificate visual" onClick={() => setViewer(null)}><button ref={viewerCloseRef} className="icon-button" aria-label="Close enlarged image" style={{ position: 'absolute', right: 20, top: 20, color: 'var(--paper)' }} onClick={() => setViewer(null)}><X size={20} /></button><img src={viewer.src} alt={viewer.alt} /></div>}
    </main>
  );
}

export default App;
