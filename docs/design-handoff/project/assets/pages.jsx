// ============================================================
// Pages — Home, Projects index, Case Study, About, Resume, Contact
// ============================================================

const { VizConnect, VizSpectra, VizAI, VizCircles } = window.VIZ;

// ---------- HOME ----------
function PageHome({ t, lang, heroVariant }) {
  return (
    <main className="page" data-screen-label="01 Home">
      <section className="hero container">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="eyebrow">{t("hero.eyebrow")}</div>
            <h1 className="h-display h1">
              {t("hero.headline.a")}<br/>
              <em>{t("hero.headline.b")}</em><br/>
              {t("hero.headline.c")}
            </h1>
            <div className="hero-ctas">
              <a href="#/work" className="btn btn-primary">{t("hero.cta.work")} <span className="arrow">→</span></a>
              <a href="#/contact" className="btn btn-ghost">{t("hero.cta.note")}</a>
            </div>
          </div>
          <div className="hero-visual">
            <HeroDeck lang={lang} variant={heroVariant} t={t} />
          </div>
        </div>
      </section>

      <section className="container">
        <div className="now">
          <div className="now-label">
            <span className="dot"></span>
            <span className="text">{t("now.label")}</span>
          </div>
          <div className="now-item">
            <h4>{t("now.reading")}</h4>
            <p>{t("now.reading.val")}</p>
          </div>
          <div className="now-item">
            <h4>{t("now.building")}</h4>
            <p>{t("now.building.val")}</p>
          </div>
          <div className="now-item">
            <h4>{t("now.learning")}</h4>
            <p>{t("now.learning.val")}</p>
          </div>
          <div className="now-item">
            <h4>{t("now.location")}</h4>
            <p>{t("now.location.val")}</p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="approach">
          <div className="approach-text">
            <div className="label">{t("approach.label")}</div>
            <h2 className="h-display h2">
              {t("approach.title")} <em>{t("approach.title.em")}</em>
            </h2>
            <p className="prose">{t("approach.body")}</p>
          </div>
          <div className="approach-steps">
            {[1,2,3,4].map(i => (
              <div className="approach-step" key={i}>
                <div className="num">0{i}</div>
                <h4>{t(`approach.step.${i}.t`)}</h4>
                <p>{t(`approach.step.${i}.b`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="feat-head">
          <div>
            <div className="label">{t("feat.label")}</div>
            <h2 className="h-display h2">{t("feat.title")}</h2>
          </div>
          <a href="#/work" className="feat-cta">{t("feat.footer")} <span>→</span></a>
        </div>

        <div className="feat-list">
          <FeatItem n="01" k="connect" t={t} viz={<VizConnect/>} href="#/case/connect"/>
          <FeatItem n="02" k="spectra" t={t} viz={<VizSpectra/>} flip href="#/case/spectra"/>
          <FeatItem n="03" k="ai" t={t} viz={<VizAI/>} href="#/case/ai"/>
          <FeatItem n="04" k="circles" t={t} viz={<VizCircles/>} flip href="#/case/circles"/>
        </div>
      </section>

      <section className="container">
        <div className="end-cta">
          <h3 className="h-display">
            {lang === "en"
              ? <>Think we'd be <em>useful to each other?</em></>
              : <>觉得我们<em>可能合得来？</em></>}
          </h3>
          <div>
            <p className="prose" style={{ marginBottom: 24 }}>
              {lang === "en"
                ? "I reply to every real email within 48 hours. No form, no filter."
                : "每一封真实的邮件，48 小时内必回。没有表单，也没有过滤器。"}
            </p>
            <a href="#/contact" className="btn btn-primary">{t("hero.cta.note")} <span className="arrow">→</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatItem({ n, k, t, viz, flip, href }) {
  return (
    <a className={`feat-item ${flip ? "flip" : ""}`} href={href} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="feat-visual">
        <span className="num">{n}</span>
        {viz}
      </div>
      <div className="feat-body">
        <div className="eyebrow">{t(`proj.${k}.kicker`)}</div>
        <h3>{t(`proj.${k}.title`)}</h3>
        <p className="sub">{t(`proj.${k}.sub`)}</p>
        <dl className="feat-meta">
          <dt>{t("cs.role")}</dt><dd>{t(`proj.${k}.role`)}</dd>
          <dt>{t("cs.time")}</dt><dd>{t(`proj.${k}.date`)}</dd>
        </dl>
        <div className="feat-metrics">
          <span className="m">{t(`proj.${k}.m1`)}</span>
          <span className="m">{t(`proj.${k}.m2`)}</span>
          <span className="m">{t(`proj.${k}.m3`)}</span>
        </div>
        <span className="feat-cta">{t("feat.footer")} <span>→</span></span>
      </div>
    </a>
  );
}

// ---------- PROJECTS INDEX ----------
function PageWork({ t, lang }) {
  const [filter, setFilter] = React.useState("all");
  const filters = [
    { id: "all", en: "All", zh: "全部" },
    { id: "flag", en: "Flagship", zh: "旗舰" },
    { id: "research", en: "Research-led", zh: "研究驱动" },
    { id: "acc", en: "Accessibility", zh: "无障碍" },
    { id: "ai", en: "AI / ML", zh: "AI" },
    { id: "social", en: "Social", zh: "社交" },
  ];
  const items = [
    { n: "01", k: "connect", tags: ["flag","research"], role: "Solo", year: "2024", dur: "4 mo" },
    { n: "02", k: "spectra", tags: ["flag","acc","research"], role: "Lead", year: "2024", dur: "4 mo" },
    { n: "03", k: "ai",      tags: ["ai","research"], role: "Designer", year: "2024", dur: "5 mo" },
    { n: "04", k: "circles", tags: ["social","research"], role: "Solo", year: "2024–", dur: "ongoing" },
  ];
  const shown = filter === "all" ? items : items.filter(i => i.tags.includes(filter));

  return (
    <main className="page" data-screen-label="02 Work">
      <section className="container idx-hero">
        <div className="label">{t("nav.work")}</div>
        <h1 className="h-display h1" style={{ marginTop: 16 }}>
          {lang === "en"
            ? <>Four projects. <em>Every one shipped or shipping.</em></>
            : <>四个项目。<em>全部已上线或在上线路上。</em></>}
        </h1>
        <div className="idx-meta">
          <span>{lang === "en" ? "Last shipped" : "最近上线"} <b>Jun 2024</b></span>
          <span>{lang === "en" ? "In progress" : "进行中"} <b>1</b></span>
          <span>{lang === "en" ? "Measured outcomes" : "量化成果"} <b>3 / 4</b></span>
        </div>
      </section>

      <section className="container">
        <div className="idx-filters" role="tablist" aria-label={lang === "en" ? "Filter projects" : "筛选项目"}>
          {filters.map(f => (
            <button key={f.id}
              className={`idx-filter ${filter === f.id ? "active" : ""}`}
              onClick={() => setFilter(f.id)}
              role="tab" aria-selected={filter === f.id}
            >{f[lang]}</button>
          ))}
        </div>
      </section>

      <section className="container">
        {shown.map(i => (
          <a className="idx-flag" href={`#/case/${i.k}`} key={i.k}>
            <div className="idx-flag-n">
              {i.n}
              {i.tags.includes("flag") && <div style={{marginTop: 10, color: "var(--accent)"}}>★ {lang === "en" ? "Flagship" : "旗舰"}</div>}
            </div>
            <div className="idx-flag-body">
              <div className="eyebrow">{t(`proj.${i.k}.kicker`)}</div>
              <h3 className="idx-flag-title">{t(`proj.${i.k}.title`)}</h3>
              <p>{t(`proj.${i.k}.sub`)}</p>
              <div className="idx-flag-tags">
                <span className="tag tag-accent">{t(`proj.${i.k}.m1`)}</span>
                <span className="tag">{t(`proj.${i.k}.m2`)}</span>
                <span className="tag">{t(`proj.${i.k}.m3`)}</span>
              </div>
            </div>
            <div className="idx-flag-side">
              <div>{t("cs.role")} · <b>{t(`proj.${i.k}.role`)}</b></div>
              <div>{t("cs.time")} · <b>{t(`proj.${i.k}.date`)}</b></div>
              <div style={{marginTop: 8, color: "var(--accent)"}}>{t("feat.footer")} →</div>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}

// ---------- CASE STUDY (UQ Connect as the sample) ----------
function PageCase({ t, lang, slug }) {
  // For now only UQ Connect is fully written; others show "sample in progress"
  const isConnect = slug === "connect";
  if (!isConnect) return <PageCaseStub t={t} lang={lang} slug={slug} />;

  return (
    <main className="page" data-screen-label={`03 Case · ${slug}`}>
      <section className="container cs-hero">
        <a className="cs-back" href="#/work">{t("cs.back")}</a>
        <div className="eyebrow" style={{marginBottom: 12}}>{t("proj.connect.kicker")}</div>
        <h1>{t("cs.hero.title")}</h1>
        <p className="sub">{t("cs.hero.sub")}</p>
        <dl className="cs-meta">
          <div><dt>{t("cs.role")}</dt><dd>{t("cs.role.val")}</dd></div>
          <div><dt>{t("cs.time")}</dt><dd>{t("cs.time.val")}</dd></div>
          <div><dt>{t("cs.team")}</dt><dd>{t("cs.team.val")}</dd></div>
          <div><dt>{t("cs.tools")}</dt><dd>{t("cs.tools.val")}</dd></div>
        </dl>
        <figure className="cs-cover">
          <VizConnect/>
        </figure>
      </section>

      <section className="container">
        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side"><div className="label">{t("cs.ch.label")}</div></div>
            <div className="cs-row-body">
              <h2>{t("cs.ch.title")}</h2>
              <p className="prose">{t("cs.ch.p")}</p>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side"><div className="label">{t("cs.re.label")}</div></div>
            <div className="cs-row-body">
              <h2>{t("cs.re.title")}</h2>
              <div className="cs-method-grid">
                {[1,2,3].map(i => (
                  <div key={i}>
                    <h5>{t(`cs.re.m${i}.t`)}</h5>
                    <p>{t(`cs.re.m${i}.b`)}</p>
                  </div>
                ))}
              </div>
              <div className="quote" style={{marginTop: 32, maxWidth: "36em"}}>
                <p>{t("cs.re.quote")}</p>
                <cite>— {t("cs.re.quote.who")}</cite>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side"><div className="label">{t("cs.sy.label")}</div></div>
            <div className="cs-row-body">
              <h2>{t("cs.sy.title")}</h2>
              <p className="prose">{t("cs.sy.p")}</p>
              <div className="cs-tree">
                <div>
                  <h6>{lang === "en" ? "Before · 12 staff-oriented" : "原版 · 12 个部门导向"}</h6>
                  <ul>
                    <li className="ko">HiQ</li>
                    <li className="ko">SI-net</li>
                    <li className="ko">my.UQ</li>
                    <li className="ko">ask.UQ</li>
                    <li className="ko">Money</li>
                    <li className="ko">+7 more</li>
                  </ul>
                </div>
                <div>
                  <h6>{lang === "en" ? "After · 6 task-oriented" : "新版 · 6 个任务导向"}</h6>
                  <ul>
                    <li className="ok">{lang === "en" ? "I'm new" : "我是新生"}</li>
                    <li className="ok">{lang === "en" ? "Study" : "学业"}</li>
                    <li className="ok">{lang === "en" ? "Belong" : "归属"}</li>
                    <li className="ok">{lang === "en" ? "Fees & finance" : "缴费 & 财务"}</li>
                    <li className="ok">{lang === "en" ? "Life on campus" : "校园生活"}</li>
                    <li className="ok">{lang === "en" ? "Moving on" : "毕业离开"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side"><div className="label">{t("cs.id.label")}</div></div>
            <div className="cs-row-body"><p className="prose">{t("cs.id.p")}</p></div>
          </div>
        </div>
        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side"><div className="label">{t("cs.pr.label")}</div></div>
            <div className="cs-row-body"><p className="prose">{t("cs.pr.p")}</p></div>
          </div>
        </div>
        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side"><div className="label">{t("cs.te.label")}</div></div>
            <div className="cs-row-body"><p className="prose">{t("cs.te.p")}</p></div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side"><div className="label">{t("cs.ou.label")}</div></div>
            <div className="cs-row-body">
              <dl className="cs-metrics">
                {[1,2,3].map(i => (
                  <div key={i}>
                    <dt>{t(`cs.ou.m${i}`)}</dt>
                    <dd dangerouslySetInnerHTML={{__html: t(`cs.ou.m${i}.v`).replace("→", "<em>→</em>")}}/>
                  </div>
                ))}
              </dl>
              <p className="prose">{t("cs.ou.p")}</p>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-row">
            <div className="cs-row-side"><div className="label">{t("cs.rf.label")}</div></div>
            <div className="cs-row-body"><p className="prose">{t("cs.rf.p")}</p></div>
          </div>
        </div>

        <div className="cs-section" style={{borderTop: "1px solid var(--border)", paddingTop: 48}}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap"}}>
            <a href="#/work" className="btn btn-ghost">← {t("nav.work")}</a>
            <a href="#/case/spectra" className="btn btn-primary">{t("cs.next")} · Spectra Lens →</a>
          </div>
        </div>
      </section>
    </main>
  );
}

function PageCaseStub({ t, lang, slug }) {
  return (
    <main className="page" data-screen-label={`03 Case · ${slug}`}>
      <section className="container cs-hero">
        <a className="cs-back" href="#/work">{t("cs.back")}</a>
        <div className="eyebrow" style={{marginBottom: 12}}>{t(`proj.${slug}.kicker`)}</div>
        <h1>{t(`proj.${slug}.title`)}</h1>
        <p className="sub">{t(`proj.${slug}.sub`)}</p>
        <dl className="cs-meta">
          <div><dt>{t("cs.role")}</dt><dd>{t(`proj.${slug}.role`)}</dd></div>
          <div><dt>{t("cs.time")}</dt><dd>{t(`proj.${slug}.date`)}</dd></div>
          <div><dt>{t("cs.team")}</dt><dd>—</dd></div>
          <div><dt>{t("cs.tools")}</dt><dd>Figma · Framer</dd></div>
        </dl>
        <figure className="cs-cover">
          {slug === "spectra" ? <VizSpectra/> : slug === "ai" ? <VizAI/> : <VizCircles/>}
        </figure>
        <div style={{padding: "64px 0", textAlign: "center"}}>
          <div className="hand" style={{fontSize: 28, display: "block", marginBottom: 16}}>
            {lang === "en" ? "Full case study in progress." : "完整案例研究正在写。"}
          </div>
          <p className="prose" style={{margin: "0 auto"}}>
            {lang === "en"
              ? "See UQ Connect for the full treatment — same structure will apply here: challenge, research, synthesis, IA, prototype, test, outcome, reflection."
              : "UQ Connect 是完整版参考 —— 本篇会沿用同一结构：问题、研究、综合、IA、原型、测试、成果、反思。"}
          </p>
          <div style={{marginTop: 32}}>
            <a href="#/case/connect" className="btn btn-primary">{lang === "en" ? "Read UQ Connect →" : "阅读 UQ Connect →"}</a>
          </div>
        </div>
      </section>
    </main>
  );
}

// ---------- ABOUT ----------
function PageAbout({ t, lang }) {
  return (
    <main className="page" data-screen-label="04 About">
      <section className="container about-hero">
        <div className="label">{t("about.kicker")}</div>
        <h1 className="h-display h1" style={{marginTop: 16}}>
          {lang === "en"
            ? <>I make digital things <em>people</em> can actually find their way through.</>
            : <>我做的是「让<em>人</em>能找到路」的数字产品。</>}
        </h1>
      </section>

      <section className="container">
        <div className="about-grid">
          <div className="about-prose">
            <p className="prose">{t("about.p1")}</p>
            <p className="prose">{t("about.p2")}</p>
            <p className="prose">{t("about.p3")}</p>
          </div>
          <aside className="about-side">
            <div className="label">{t("about.tl.label")}</div>
            <div className="about-tl" style={{marginTop: 16}}>
              {[
                { y: "2026", k: "tl.2026" },
                { y: "2025", k: "tl.2025" },
                { y: "2024", k: "tl.2024" },
                { y: "2020–24", k: "tl.2020" },
              ].map((row, i) => (
                <div className="about-tl-row" key={i}>
                  <div className="y">{row.y}</div>
                  <div className="t">{t(`about.${row.k}`)}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="container section">
        <div className="label">{t("about.philo.label")}</div>
        <div className="about-philo" style={{marginTop: 24}}>
          {[1,2,3,4].map(i => (
            <div className="about-philo-item" key={i}>
              <h4>{t(`about.philo.${i}.t`)}</h4>
              <p>{t(`about.philo.${i}.b`)}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// ---------- RESUME ----------
function PageResume({ t, lang }) {
  return (
    <main className="page" data-screen-label="05 Resume">
      <section className="container res-hero">
        <div>
          <div className="label">{t("resume.kicker")}</div>
          <h1 className="h-display h2" style={{marginTop: 16}}>{t("resume.headline")}</h1>
        </div>
        <div className="res-actions">
          <button className="btn btn-ghost" onClick={() => window.print()}>{t("resume.print")}</button>
          <button className="btn btn-primary" onClick={() => alert(lang === "en" ? "PDF download would trigger here." : "这里会下载 PDF。")}>
            {t("resume.download")} <span className="arrow">↓</span>
          </button>
        </div>
      </section>

      <section className="container">
        <div className="res-body">
          <div>
            <div className="res-section">
              <h3>{t("resume.section.exp")}</h3>
              <div className="res-entry">
                <div className="date">2024 · 10 – {lang === "en" ? "Now" : "至今"}</div>
                <div>
                  <h4>{lang === "en" ? "Product Designer (self-initiated)" : "产品设计师（自主项目）"}</h4>
                  <p className="org">Connect Circles · {lang === "en" ? "International student social app" : "国际学生社交 App"}</p>
                  <ul>
                    <li>{lang === "en" ? "Led 15 depth interviews across 3 cultural cohorts (East/South Asia, Europe)." : "主导跨 3 个文化群体的 15 次深度访谈（东亚 / 南亚 / 欧洲）。"}</li>
                    <li>{lang === "en" ? "Ran a 2-week diary study (n=8) and 3 co-design workshops." : "执行 2 周日记研究（n=8）及 3 场共创工作坊。"}</li>
                    <li>{lang === "en" ? "Synthesised three academic frameworks (Weiss, SDT, SIT) into a product direction." : "整合三个学术框架（Weiss / SDT / SIT）到产品方向。"}</li>
                  </ul>
                </div>
              </div>
              <div className="res-entry">
                <div className="date">2024 · 08 – 11</div>
                <div>
                  <h4>{lang === "en" ? "Lead UX Designer" : "首席 UX 设计师"}</h4>
                  <p className="org">Spectra Lens · {lang === "en" ? "AR accessibility tool" : "AR 无障碍工具"}</p>
                  <ul>
                    <li>{lang === "en" ? "Interviewed 12 colourblind users across deutan / protan / tritan types." : "访谈 12 位色盲用户，覆盖 deutan / protan / tritan 三类。"}</li>
                    <li>{lang === "en" ? "Co-designed multi-modal feedback with target users; validated via 8-person usability test." : "与目标用户共创多模态反馈；通过 8 人可用性测试验证。"}</li>
                    <li>{lang === "en" ? "Recognition success 75 → 92%, avg. 3.1s. Selected for UQ Design Showcase 2024." : "识别成功率 75 → 92%，平均 3.1 秒。入选昆大 2024 设计年展。"}</li>
                  </ul>
                </div>
              </div>
              <div className="res-entry">
                <div className="date">2024 · 03 – 06</div>
                <div>
                  <h4>UX Researcher & Designer</h4>
                  <p className="org">UQ Connect · {lang === "en" ? "Student portal IA redesign" : "学生门户 IA 重设计"}</p>
                  <ul>
                    <li>{lang === "en" ? "Designed and ran tree tests (n=50), open card sort (n=24), and task analyses (n=10)." : "设计并执行树测试（n=50）、开放卡片分类（n=24）、任务分析（n=10）。"}</li>
                    <li>{lang === "en" ? "Findability 58 → 84%, task success 72 → 94%, SUS 61 → 78." : "可发现率 58 → 84%，任务成功率 72 → 94%，SUS 61 → 78。"}</li>
                    <li>{lang === "en" ? "Tree test protocol reused on two subsequent UQ digital projects." : "这套树测试协议被沿用到后续两个昆大数字化项目。"}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="res-section">
              <h3>{t("resume.section.edu")}</h3>
              <div className="res-entry">
                <div className="date">2024 – 2026</div>
                <div>
                  <h4>{lang === "en" ? "Master of Interaction Design" : "交互设计硕士"}</h4>
                  <p className="org">{lang === "en" ? "The University of Queensland, Brisbane" : "昆士兰大学，布里斯班"}</p>
                  <ul>
                    <li>{lang === "en" ? "Research methods, IA, evaluation, design studio practice." : "研究方法、信息架构、评估、设计工作室实践。"}</li>
                    <li>GPA 6.7 / 7.0</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="res-section">
              <h3>{t("resume.section.awards")}</h3>
              <div className="res-entry">
                <div className="date">2024</div>
                <div>
                  <h4>{lang === "en" ? "UQ Design Showcase — Selected" : "昆大设计年展 —— 入选"}</h4>
                  <p className="org">Spectra Lens</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="res-side">
            <div className="res-side-card">
              <h4>{t("resume.section.skills")}</h4>
              {[
                { n: "User research", v: 92 },
                { n: "Information architecture", v: 88 },
                { n: "Interaction design", v: 85 },
                { n: "Prototyping (Figma, Framer)", v: 90 },
                { n: "HTML / CSS / React", v: 72 },
                { n: "Usability testing", v: 88 },
              ].map((s,i) => (
                <div className="res-skill" key={i}>
                  <div className="row"><span>{lang === "en" ? s.n : translateSkill(s.n)}</span><span>{s.v}</span></div>
                  <div className="bar"><i style={{width: `${s.v}%`}}></i></div>
                </div>
              ))}
            </div>
            <div className="res-side-card">
              <h4>{lang === "en" ? "Tools" : "工具"}</h4>
              <p style={{margin: 0, fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--text-2)", lineHeight: 1.7}}>
                Figma · Framer · Protopie · Maze · OptimalSort · Treejack · Otter · Dovetail · Notion · Rive · Miro · VS Code
              </p>
            </div>
            <div className="res-side-card">
              <h4>{lang === "en" ? "Languages" : "语言"}</h4>
              <p style={{margin: 0, fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--text-2)", lineHeight: 1.7}}>
                {lang === "en" ? "English (IELTS 7.5) · Mandarin (native)" : "英语（雅思 7.5） · 中文（母语）"}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function translateSkill(n) {
  const map = {
    "User research": "用户研究",
    "Information architecture": "信息架构",
    "Interaction design": "交互设计",
    "Prototyping (Figma, Framer)": "原型（Figma / Framer）",
    "HTML / CSS / React": "HTML / CSS / React",
    "Usability testing": "可用性测试",
  };
  return map[n] || n;
}

// ---------- CONTACT ----------
function PageContact({ t, lang }) {
  return (
    <main className="page" data-screen-label="06 Contact">
      <section className="container contact-hero">
        <div className="label">{t("contact.kicker")}</div>
        <h1 className="h-display h1" style={{marginTop: 16}}>
          {lang === "en"
            ? <>The shortest path is the <em>direct</em> one.</>
            : <>最短的路径，<em>就是直接那一条。</em></>}
        </h1>
        <p className="prose" style={{marginTop: 32}}>{t("contact.body")}</p>

        <div className="contact-card">
          <div>
            <div className="label" style={{marginBottom: 24}}>Email</div>
            <a className="contact-big-link" href={`mailto:${t("contact.email")}`}>{t("contact.email")}</a>
            <div style={{marginTop: 32}}>
              <div className="label" style={{marginBottom: 16}}>{lang === "en" ? "Elsewhere" : "别处"}</div>
              <ul style={{listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10, fontFamily: "var(--font-ui)", fontSize: 15}}>
                <li><a href="#" style={{color: "var(--text)", textDecoration: "none", borderBottom: "1px solid var(--border)"}}>LinkedIn · lewis-dong</a></li>
                <li><a href="#" style={{color: "var(--text)", textDecoration: "none", borderBottom: "1px solid var(--border)"}}>Read.cv · lewisdong</a></li>
                <li><a href="#" style={{color: "var(--text)", textDecoration: "none", borderBottom: "1px solid var(--border)"}}>{t("contact.cal")} · calendly.com/lewisdong</a></li>
              </ul>
            </div>
          </div>
          <div className="contact-fit">
            <h4 className="ok">{t("contact.fit.label")}</h4>
            <ul>
              <li>{t("contact.fit.1")}</li>
              <li>{t("contact.fit.2")}</li>
              <li>{t("contact.fit.3")}</li>
            </ul>
            <h4 className="no">{t("contact.notfit.label")}</h4>
            <ul>
              <li>{t("contact.notfit.1")}</li>
              <li>{t("contact.notfit.2")}</li>
              <li>{t("contact.notfit.3")}</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

window.PAGES = { PageHome, PageWork, PageCase, PageAbout, PageResume, PageContact };
