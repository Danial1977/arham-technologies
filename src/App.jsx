import React, { useEffect, useState } from "react";

// Single-file React SPA for Arham Technologies Ltd
// - Light theme, professional design
// - All sections in one file (App.jsx)
// - Built-in <style> tag for CSS (no external CSS file required)
// - Uses live, royalty-free image URLs (Unsplash/Pexels)
// - Anchor navigation + smooth scrolling
// - Mobile responsive - this all covers the basics for a corporate site.

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    // Smooth scrolling for in-page anchors
    const handler = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute('href').substring(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        const y = el.getBoundingClientRect().top + window.pageYOffset - 76; // account for header height
        window.scrollTo({ top: y, behavior: 'smooth' });
        setMobileOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <>
      <style>{`
        :root{
          --bg:#f7fafc; /* light gray */
          --card:#ffffff;
          --text:#1f2937; /* slate-800 */
          --muted:#6b7280; /* slate-500 */
          --brand:#2563eb; /* blue-600 */
          --brand-2:#0ea5e9; /* sky-500 */
          --accent:#10b981; /* emerald-500 */
          --warning:#f59e0b; /* amber-500 */
          --ring: rgba(37,99,235,.25);
          --shadow: 0 10px 25px rgba(0,0,0,.07);
          --radius: 16px;
        }
        *{box-sizing:border-box}
        html,body,#root{height:100%}
        body{margin:0; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", "Helvetica Neue", sans-serif; color:var(--text); background:var(--bg);}
        img{display:block; max-width:100%; height:auto;}
        a{color:var(--brand); text-decoration:none}
        a:hover{text-decoration:underline}
        .container{width:min(1200px,92%); margin-inline:auto}
        .btn{display:inline-flex; align-items:center; gap:.5rem; padding:.875rem 1.15rem; border-radius:999px; background:var(--brand); color:#fff; font-weight:600; border:1px solid rgba(0,0,0,.06); box-shadow:var(--shadow)}
        .btn:hover{filter:brightness(.95)}
        .btn.outline{background:transparent; color:var(--brand); border:2px solid var(--brand)}
        .btn.ghost{background:rgba(37,99,235,.08); color:var(--brand);}
        .chip{display:inline-flex; align-items:center; gap:.5rem; padding:.35rem .7rem; border-radius:999px; background:#eef2ff; color:#3730a3; font-weight:600; font-size:.85rem; border:1px solid #e5e7eb}
        header{position:sticky; top:0; z-index:50; backdrop-filter:saturate(180%) blur(10px); background:rgba(255,255,255,.8); border-bottom:1px solid #e5e7eb}
        .nav{display:flex; align-items:center; justify-content:space-between; padding: .8rem 0}
        .brand{display:flex; align-items:center; gap:.6rem; font-weight:800; font-size:1.05rem}
        .brand-logo{width:36px; height:36px; border-radius:9px; background:linear-gradient(135deg,var(--brand),var(--brand-2)); display:grid; place-items:center; color:white; font-weight:900; letter-spacing:.5px}
        nav ul{display:flex; gap:1.1rem; list-style:none; padding:0; margin:0}
        nav a{color:var(--text); font-weight:600; opacity:.85}
        nav a:hover{opacity:1; text-decoration:none}
        .mobile-toggle{display:none; background:transparent; border:0; font-size:1.35rem}
        @media (max-width: 980px){
          nav ul{display:none}
          .mobile-toggle{display:block}
          .mobile-menu{display:flex; flex-direction:column; gap:.75rem; padding:1rem; border:1px solid #e5e7eb; background:#fff; border-radius:12px; margin-top:.5rem}
          .mobile-menu a{padding:.5rem 0}
        }
        .hero{padding: 80px 0 40px; background: linear-gradient(180deg,#ffffff, #f3f7ff 60%, #eef6ff)}
        .hero-grid{display:grid; grid-template-columns: 1.05fr .95fr; gap:2.2rem; align-items:center}
        .hero h1{font-size: clamp(2rem, 3.6vw, 3rem); margin:.25rem 0 1rem; line-height:1.1}
        .hero p{font-size:1.05rem; color:var(--muted)}
        .hero .stats{display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; margin-top:1.25rem}
        .stat{padding:1rem; background:#fff; border:1px solid #eef2f7; border-radius:var(--radius); box-shadow:var(--shadow); text-align:center}
        .stat b{font-size:1.35rem}
        .hero-image{position:relative; border-radius:24px; overflow:hidden; box-shadow:var(--shadow);}
        .hero-image img{width:100%; height:100%; object-fit:cover}
        .section{padding:64px 0}
        .section h2{font-size: clamp(1.6rem, 2.2vw, 2.1rem); margin:0 0 .5rem}
        .section .lead{color:var(--muted); max-width:900px}
        .grid{display:grid; gap:1.25rem}
        .grid-3{grid-template-columns:repeat(3,1fr)}
        .grid-2{grid-template-columns:repeat(2,1fr)}
        @media (max-width: 980px){.hero-grid,.grid-3,.grid-2{grid-template-columns:1fr}}
        .card{background:var(--card); border:1px solid #eef2f7; border-radius:var(--radius); padding:1.1rem; box-shadow:var(--shadow)}
        .icon{width:42px; height:42px; border-radius:10px; display:grid; place-items:center; background:rgba(37,99,235,.08)}
        .kicker{display:flex; align-items:center; gap:.5rem; color:var(--brand); font-weight:800; font-size:.9rem}
        .divider{height:1px; background:#e5e7eb; margin:1rem 0}
        .list{margin:.5rem 0 0; padding-left:1.1rem}
        .list li{margin:.4rem 0}
        .media{display:grid; grid-template-columns: 1fr 1fr; gap:1rem}
        .media .pic{border-radius:16px; overflow:hidden; border:1px solid #eef2f7; box-shadow:var(--shadow)}
        .quote{padding:1rem; background:#f5faff; border:1px dashed #c7ddff; border-radius:16px}
        .logos{display:grid; grid-template-columns:repeat(6,1fr); gap:1rem; align-items:center; justify-items:center; opacity:.9}
        @media (max-width:980px){.logos{grid-template-columns:repeat(3,1fr)}}
        .pricing{display:grid; grid-template-columns:repeat(3,1fr); gap:1rem}
        @media (max-width:980px){.pricing{grid-template-columns:1fr}}
        .price-card{position:relative}
        .badge{position:absolute; top:12px; right:12px; background:#ecfeff; color:#155e75; border:1px solid #a5f3fc; font-weight:800; padding:.3rem .6rem; border-radius:999px; font-size:.78rem}
        .faq details{background:#fff; border:1px solid #e5e7eb; border-radius:12px; padding:1rem}
        .faq summary{font-weight:700; cursor:pointer}
        .footer{padding:48px 0; background:#ffffff; border-top:1px solid #e5e7eb}
        .footer .cols{display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:1rem}
        @media (max-width:980px){.footer .cols{grid-template-columns:1fr 1fr}}
        .social a{display:inline-flex; align-items:center; gap:.5rem; padding:.4rem .7rem; background:#f1f5f9; border:1px solid #e5e7eb; border-radius:999px}
        .tag{font-size:.78rem; font-weight:700; background:#f0fdf4; color:#166534; padding:.2rem .5rem; border-radius:999px; border:1px solid #dcfce7}
      `}</style>

      {/* Header */}
      <header>
        <div className="container nav">
          <div className="brand">
            <div className="brand-logo">AT</div>
            <div>
              Arham Technologies Ltd
              <div style={{fontSize:'.8rem', color:'var(--muted)'}}>AI • Cloud • Cybersecurity • Data</div>
            </div>
          </div>

          <nav>
            <ul>
              {[
                ['Home','home'],
                ['About','about'],
                ['Services','services'],
                ['Solutions','solutions'],
                ['Industries','industries'],
                ['Case Studies','case-studies'],
                ['Portfolio','portfolio'],
                ['Technologies','tech'],
                ['Pricing','pricing'],
                ['Team','team'],
                ['Blog','blog'],
                ['Contact','contact']
              ].map(([label, id]) => (
                <li key={id}><a href={`#${id}`}>{label}</a></li>
              ))}
            </ul>
          </nav>

          <button className="mobile-toggle" aria-label="Toggle menu" onClick={()=>setMobileOpen(v=>!v)}>☰</button>
        </div>
        <div className="container">
          {mobileOpen && (
            <div className="mobile-menu">
              {[
                ['Home','home'],['About','about'],['Services','services'],['Solutions','solutions'],['Industries','industries'],['Case Studies','case-studies'],['Portfolio','portfolio'],['Technologies','tech'],['Pricing','pricing'],['Team','team'],['Blog','blog'],['Contact','contact']
              ].map(([label,id]) => (
                <a key={id} href={`#${id}`}>{label}</a>
              ))}
              <a href="#contact" className="btn">Get a Quote</a>
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="container hero-grid">
          <div>
            <span className="chip">Enterprise IT & AI Consulting</span>
            <h1>Build. Secure. Scale. <span style={{color:'var(--brand)'}}>Faster</span> with Arham Technologies Ltd</h1>
            <p>We design and deliver end‑to‑end digital platforms across Cloud, AI, Cybersecurity, Data Engineering, and ERP. From strategy to production, we partner with you to ship measurable value—securely and on time.</p>
            <div style={{display:'flex', gap:'.7rem', marginTop:'1rem'}}>
              <a href="#contact" className="btn">Get Proposal</a>
              <a href="#portfolio" className="btn outline">See Our Work</a>
            </div>
            <div className="stats">
              {[['120+','Enterprise Projects'],['25+','Fortune/Blue‑chip Clients'],['25 yrs','IT Leadership']].map(([n, t]) => (
                <div className="stat" key={t}><b>{n}</b><div style={{color:'var(--muted)'}}>{t}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1600&auto=format&fit=crop" alt="Team collaborating in modern tech office" />
          </div>
        </div>
      </section>

      {/* Trust Logos */}
      <section className="section" aria-label="Trusted by">
        <div className="container">
          <div className="kicker">Trusted by teams worldwide</div>
          <div className="logos" style={{marginTop:'1rem'}}>
            {[
              'microsoft','google','aws','oracle','ibm','sap'
            ].map((k)=> (
              <img key={k} alt={k}
                src={`https://dummyimage.com/180x60/edf2f7/94a3b8&text=${k.toUpperCase()}`}/>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <div className="container media">
          <div>
            <h2>About Arham Technologies Ltd</h2>
            <p className="lead">Founded by enterprise architects with two decades across the UK, US, and MENA, we blend strategic consulting with hands‑on engineering. Our mission is simple: <b>turn complex technology into business outcomes</b>.</p>
            <div className="grid grid-2" style={{marginTop:'1rem'}}>
              <div className="card">
                <div className="icon">⚙️</div>
                <h3>Delivery First</h3>
                <p>Outcome‑driven sprints, architecture reviews, and battle‑tested playbooks to ship value quickly.</p>
                <ul className="list">
                  <li>Architecture & Roadmaps</li>
                  <li>Proof‑of‑Value in 4–6 weeks</li>
                  <li>Executive and Engineering alignment</li>
                </ul>
              </div>
              <div className="card">
                <div className="icon">🛡️</div>
                <h3>Security by Design</h3>
                <p>Zero‑trust principles, threat modeling, and compliance baked into every delivery.</p>
                <ul className="list">
                  <li>ISO 27001 aligned</li>
                  <li>DevSecOps pipelines</li>
                  <li>Continuous monitoring</li>
                </ul>
              </div>
            </div>
            <div className="quote" style={{marginTop:'1rem'}}>
              “Arham turned our fragmented systems into a resilient, scalable platform in 12 weeks. Superb partner.” — CTO, Global Retailer
            </div>
          </div>
          <div className="pic">
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop" alt="Developers working on laptops"/>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section" style={{background:'#fff'}}>
        <div className="container">
          <h2>Services</h2>
          <p className="lead">End‑to‑end consulting and delivery across the modern technology stack.</p>
          <div className="grid grid-3" style={{marginTop:'1rem'}}>
            {[
              {icon:'🤖', title:'AI Solutions', text:'GenAI copilots, RAG, NLP chatbots, vision models & MLOps.' , items:['Use‑case discovery','Data pipelines','Model deployment','Responsible AI']},
              {icon:'☁️', title:'Cloud & DevOps', text:'AWS • Azure • GCP design, migration, IaC, SRE & FinOps.', items:['Landing zones','Kubernetes','CI/CD','Observability']},
              {icon:'🛡️', title:'Cybersecurity', text:'Zero‑trust, IAM, SOC, SIEM, incident response & GRC.', items:['Risk & controls','Pen‑testing','SSO/MFA','Compliance automation']},
              {icon:'📊', title:'Data & Analytics', text:'Data lakes, warehouses, ELT, BI dashboards, real‑time.', items:['Lakehouse','dbt/ETL','Streaming','Self‑service BI']},
              {icon:'🏢', title:'ERP & Automation', text:'SAP/Oracle/MS Dynamics, RPA, BPM & integrations.', items:['Process mapping','RPA bots','API gateways','Change management']},
              {icon:'🧩', title:'Custom Engineering', text:'Web, mobile, APIs, microservices & legacy modernization.', items:['React/Next.js','.NET/Node','Microservices','Testing & QA']}
            ].map(s => (
              <div className="card" key={s.title}>
                <div className="icon" aria-hidden>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul className="list">{s.items.map(i=> <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="section">
        <div className="container">
          <h2>Solution Accelerators</h2>
          <p className="lead">Pre‑built blueprints that cut weeks from delivery.</p>
          <div className="grid grid-3" style={{marginTop:'1rem'}}>
            {[
              {img:'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop',title:'GenAI Knowledge Copilot', text:'Enterprise‑safe RAG chatbot over your PDFs, docs, tickets & wiki.', pts:['SSO + RBAC','Vector search','Audit & redaction','Azure OpenAI/Bedrock']},
              {img:'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1200&auto=format&fit=crop',title:'Cloud Migration Factory', text:'Repeatable landing zones, IaC modules, app patterns & guardrails.', pts:['Terraform modules','Blueprint repos','Cost baselines','Automated tagging']},
              {img:'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',title:'Security Command Center', text:'Unified SOC with SIEM, SOAR & threat intel, tuned for your org.', pts:['MITRE ATT&CK','Playbooks','Deception traps','Compliance packs']}
            ].map(card => (
              <div className="card" key={card.title}>
                <img src={card.img} alt={card.title} style={{borderRadius:12, marginBottom:12}}/>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <ul className="list">{card.pts.map(p=> <li key={p}>{p}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="section" style={{background:'#fff'}}>
        <div className="container">
          <h2>Industries</h2>
          <p className="lead">We navigate domain complexity with proven playbooks.</p>
          <div className="grid grid-3" style={{marginTop:'1rem'}}>
            {[
              ['Financial Services','https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1200&auto=format&fit=crop','Payments • Core banking • Risk & AML • Open APIs'],
              ['Retail & eCommerce','https://as1.ftcdn.net/v2/jpg/05/26/53/52/1000_F_526535232_3FG0tckX1I3yAaHqqBeCdt0MVE1A5UQ2.jpg','Omnichannel • Personalization • Supply chain visibility'],
              ['Healthcare & Pharma','https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop','HL7/FHIR • Patient portals • Data privacy & compliance'],
              ['Public Sector','https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1200&auto=format&fit=crop','Citizen services • Digital identity • Secure clouds'],
              ['Telecom','https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop','5G • OSS/BSS • Network analytics'],
              ['Manufacturing','https://as1.ftcdn.net/v2/jpg/10/02/59/82/1000_F_1002598222_e94HmXnajs0Gv4L6F7h8GOtWmJliQuH0.jpg','IoT • MES • Predictive maintenance']
            ].map(([title,img,desc]) => (
              <div className="card" key={title}>
                <img src={img} alt={title} style={{borderRadius:12, marginBottom:12}}/>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="section">
        <div className="container">
          <h2>Case Studies</h2>
          <p className="lead">Real outcomes delivered with measurable impact.</p>
          <div className="grid grid-3" style={{marginTop:'1rem'}}>
            {[
              {title:'Retail GenAI Support', result:'+27% CSAT • −35% AHT', text:'Built RAG assistant over 120k tickets & manuals with guardrails.', img:'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop'},
              {title:'Banking Cloud Migration', result:'40% cost optim. • 99.95% SLA', text:'Migrated 120 services to AWS with IaC, FinOps & blue/green.', img:'https://as2.ftcdn.net/v2/jpg/16/49/55/31/1000_F_1649553199_7lHDxpfukha3aoMAWMvimGPKVhx9aDyJ.jpg'},
              {title:'Pharma Data Platform', result:'FDA-ready • 10x faster trials', text:'Lakehouse with governed pipelines & lineage dashboards.', img:'https://images.unsplash.com/photo-1581090700227-1e37b190418e?q=80&w=1200&auto=format&fit=crop'}
            ].map(c => (
              <div className="card" key={c.title}>
                <img src={c.img} alt={c.title} style={{borderRadius:12, marginBottom:12}}/>
                <h3>{c.title}</h3>
                <div className="tag" style={{margin:'6px 0 10px'}}>{c.result}</div>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="section" style={{background:'#fff'}}>
        <div className="container">
          <h2>Selected Work</h2>
          <p className="lead">A glimpse of platforms, apps, and integrations we have shipped.</p>
          <div className="grid grid-3" style={{marginTop:'1rem'}}>
            {[
              ['AI Contract Analyzer','https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1200&auto=format&fit=crop','NLP engine to parse risk clauses; dashboard with review workflows.'],
              ['IoT Factory Monitor','https://as1.ftcdn.net/v2/jpg/12/93/23/62/1000_F_1293236203_q4ZDVYykRiE7NxvoI6hg3nVopoSY5Enf.jpg','Edge telemetry, anomaly detection, and predictive maintenance.'],
              ['eCommerce Personalizer','https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop','Real‑time recommendations and A/B testing platform.'],
              ['Cyber Threat Hunter','https://as1.ftcdn.net/v2/jpg/08/77/20/48/1000_F_877204893_3VSqWsfRjMDeySKbGShAv3VUzYuFZZg6.jpg','SIEM + SOAR with ML‑driven detections and auto‑response playbooks.'],
              ['Banking Onboarding','https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop','KYC, e‑sign, workflow automation, and audit trails.'],
              ['Analytics Hub','https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop','Warehouse + dashboards for executive insights.']
            ].map(([title,img,desc]) => (
              <div className="card" key={title}>
                <img src={img} alt={title} style={{borderRadius:12, marginBottom:12}}/>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section id="tech" className="section">
        <div className="container">
          <h2>Technologies</h2>
          <p className="lead">We work with a pragmatic, vendor‑agnostic toolbox.</p>
          <div className="grid grid-3" style={{marginTop:'1rem'}}>
            {[
              ['Cloud','AWS • Azure • GCP • Kubernetes • Terraform'],
              ['Data','Databricks • Snowflake • BigQuery • dbt • Kafka'],
              ['AI/ML','OpenAI • Azure OpenAI • Bedrock • HuggingFace'],
              ['Web & APIs','React • Next.js • Node • .NET • GraphQL'],
              ['ERP & RPA','SAP • Oracle • Dynamics • UiPath • Camunda'],
              ['Security','Okta • Azure AD • CrowdStrike • Splunk • Sentinel']
            ].map(([title,stack]) => (
              <div className="card" key={title}>
                <div className="icon">💠</div>
                <h3>{title}</h3>
                <p>{stack}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{background:'#fff'}}>
        <div className="container grid grid-2">
          <div>
            <h2>Why ArhamTechnologies?</h2>
            <p className="lead">Strategy + Delivery under one roof, led by senior architects with skin in the game.</p>
            <ul className="list">
              <li><b>Senior‑only squads:</b> Staffed with architects & staff+ engineers.</li>
              <li><b>Security & compliance first:</b> Zero‑trust, privacy, and governance baked in.</li>
              <li><b>Transparent pricing:</b> Fixed‑scope accelerators or flexible squads.</li>
              <li><b>Global delivery:</b> UK, US, and Pakistan time‑zone coverage.</li>
            </ul>
          </div>
          <div className="pic">
            <img style={{borderRadius:'12px'}} src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop" alt="Team discussion"/>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <h2>What Clients Say</h2>
          <div className="grid grid-3" style={{marginTop:'1rem'}}>
            {[
              ['CIO, FinTech','“They delivered a secure, scalable platform in record time.”'],
              ['Head of Data, Pharma','“Our trial analytics went from weeks to hours—transformational.”'],
              ['CISO, Retail','“Best vendor for pragmatic security and DevSecOps automation.”']
            ].map(([role,quote]) => (
              <div className="card" key={role}>
                <div className="icon">⭐</div>
                <p style={{fontStyle:'italic'}}>{quote}</p>
                <div className="divider"></div>
                <div style={{color:'var(--muted)'}}>{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section" style={{background:'#fff'}}>
        <div className="container">
          <h2>Partners</h2>
          <p className="lead">We collaborate with hyperscalers and leading ISVs.</p>
          <div className="logos" style={{marginTop:'1rem'}}>
            {['AWS','Azure','GCP','Oracle','SAP','Databricks'].map(n => (
              <img key={n} alt={n} src={`https://dummyimage.com/180x60/edf2f7/94a3b8&text=${encodeURIComponent(n)}`}/>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section">
        <div className="container">
          <h2>Pricing</h2>
          <p className="lead">Simple models for predictable delivery.</p>
          <div className="pricing" style={{marginTop:'1rem'}}>
            {[
              {name:'Starter', price:'$', period:'/month', features:['One product squad','Up to 2 workstreams','Slack + weekly demos','Basic security & QA']},
              {name:'Growth', price:'$', period:'/month', features:['Two senior squads','Multi‑cloud & Data','24/5 support','DevSecOps + SRE'], badge:'Most Popular'},
              {name:'Enterprise', price:'Custom', period:'', features:['Regulated industries','24/7 support','Dedicated architect','On‑site workshops']}
            ].map((p)=> (
              <div className="card price-card" key={p.name}>
                {p.badge && <div className="badge">{p.badge}</div>}
                <h3>{p.name}</h3>
                <div style={{fontSize:'2rem', fontWeight:800}}>{p.price}<span style={{fontSize:'1rem', color:'var(--muted)'}}>{p.period}</span></div>
                <ul className="list">{p.features.map(f => <li key={f}>{f}</li>)}</ul>
                <a href="#contact" className="btn ghost">Choose {p.name}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section" style={{background:'#fff'}}>
        <div className="container">
          <h2>Leadership</h2>
          <p className="lead">Hands‑on leaders with deep experience in enterprise delivery.</p>
          <div className="grid grid-3" style={{marginTop:'1rem'}}>
            {[
              ['Yasir Butt','Director, Tech Solutions & Cybersecurity','https://as2.ftcdn.net/v2/jpg/08/69/85/85/1000_F_869858569_Q7uUyhCOwHxO0KR1LJyvK3ir0Ce8bz2L.jpg'],
              ['Lucy Andrew','Chief Technology Officer','https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1200&auto=format&fit=crop'],
              ['A. Khan','Solutions Architect','https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1200&auto=format&fit=crop']
            ].map(([name,role,img]) => (
              <div className="card" key={name}>
                <img src={img} alt={name} style={{borderRadius:12, marginBottom:12, aspectRatio:'16/9', objectFit:'cover'}}/>
                <h3>{name}</h3>
                <div style={{color:'var(--muted)'}}>{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog teasers */}
      <section id="blog" className="section">
        <div className="container">
          <h2>Insights</h2>
          <p className="lead">Practical guides from our architects and engineers.</p>
          <div className="grid grid-3" style={{marginTop:'1rem'}}>
            {[
              ['A CTO Guide to GenAI in 2025','https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop','From pilots to production: governance, cost, and KPIs.'],
              ['Designing a Zero‑Trust Enterprise','https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1200&auto=format&fit=crop','Identity, segmentation, and continuous verification.'],
              ['Lakehouse vs. Warehouse','https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop','Choosing the right data backbone for analytics.']
            ].map(([title,img,desc]) => (
              <div className="card" key={title}>
                <img src={img} alt={title} style={{borderRadius:12, marginBottom:12}}/>
                <h3>{title}</h3>
                <p>{desc}</p>
                <a href="#contact">Read more →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section id="careers" className="section">
        <div className="container grid grid-2">
          <div>
            <h2>Careers at ArhamTechnologies</h2>
            <p className="lead">Join a senior‑first, remote‑friendly team delivering meaningful platforms.</p>
            <ul className="list">
              <li>Principal Engineer (Cloud/Platform)</li>
              <li>Data Engineer (Lakehouse)</li>
              <li>Security Engineer (SOC/SIEM)</li>
            </ul>
          </div>
          <div className="pic">
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop" alt="Laptop and code" style={{borderRadius:12, marginBottom:0}}/>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <div className="container">
          <h2>Contact Us</h2>
          <p className="lead">Tell us about your goals. We’ll get back within 1 business day.</p>
          <div className="grid grid-2" style={{marginTop:'1rem'}}>
            <form className="card" onSubmit={(e)=>{e.preventDefault(); alert('Thanks! We\'ll reach out soon.')}}>
              <div style={{display:'grid', gap:'.7rem'}}>
                <label>Full Name<input required placeholder="Your name" style={inputStyle}/></label>
                <label>Email<input required type="email" placeholder="name@company.com" style={inputStyle}/></label>
                <label>Company<input placeholder="Company name" style={inputStyle}/></label>
                <label>Budget<select defaultValue="" style={inputStyle}><option value="" disabled>Choose...</option><option>Under $10k</option><option>$10k–$50k</option><option>$50k–$200k</option><option>$200k+</option></select></label>
                <label>How can we help?<textarea rows={5} placeholder="Project details…" style={inputStyle}/></label>
                <button className="btn" type="submit">Request Proposal</button>
              </div>
            </form>
            <div>
              <div className="card">
                <h3>Head Office</h3>
                <p>Arham Technologies Ltd<br/>Overseas Enclave, Bahria Town, Lahore, Pakistan</p>
                <p><b>Email:</b> Info@arhamtechnologies.ltd<br/><b>Phone:</b> +92 32 1492 1865</p>
              </div>
              <div className="card" style={{marginTop:'1rem'}}>
                <h3>FAQ</h3>
                <div className="faq" style={{display:'grid', gap:'.6rem'}}>
                  <details><summary>How quickly can you start?</summary><p>Typically within 1–2 weeks after scoping.</p></details>
                  <details><summary>Do you work fixed‑price?</summary><p>Yes—for well‑defined scopes using our accelerators.</p></details>
                  <details><summary>Which time zones?</summary><p>UK, EU, US, and PK coverage.</p></details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container cols">
          <div>
            <div className="brand" style={{marginBottom:'.5rem'}}>
              <div className="brand-logo">AT</div>
              <div>Arham Technologies Ltd</div>
            </div>
            <p>Building secure, scalable platforms with AI, Cloud, Data, and Cybersecurity excellence.</p>
            <div className="social" style={{display:'flex', gap:'.5rem', marginTop:'.6rem'}}>
              <a href="#">LinkedIn</a>
              <a href="#">YouTube</a>
              <a href="#">GitHub</a>
            </div>
          </div>
          <div>
            <h4>Company</h4>
            <ul className="list">
              <li><a href="#about">About</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul className="list">
              <li><a href="#services">AI</a></li>
              <li><a href="#services">Cloud</a></li>
              <li><a href="#services">Security</a></li>
              <li><a href="#services">Data</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul className="list">
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="container" style={{marginTop:'1rem', color:'var(--muted)', fontSize:'.9rem'}}>
          © {year} Arham Technologies Ltd. All rights reserved.
        </div>
      </footer>
    </>
  );
}

const inputStyle = {
  width: '100%',
  padding: '.8rem',
  borderRadius: '10px',
  border: '1px solid #e5e7eb',
  outline: 'none',
  background: '#fff',
  boxShadow: 'inset 0 1px 2px rgba(0,0,0,.03)'
};