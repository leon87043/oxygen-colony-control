"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const spiralIllustrations = [
  { label: "COLONY", image: "https://assets.klei.com/f/259446/1920x1080/b21acc4aa3/oni-feature.jpg" },
  { label: "OXYGEN", image: "https://assets.klei.com/f/259446/1920x1080/4ed8d5f0ca/gas-biome.jpg" },
  { label: "BASE", image: "https://assets.klei.com/f/259446/1920x1080/c03bceb078/base.jpg" },
  { label: "POWER", image: "https://assets.klei.com/f/259446/1920x1080/ba46e95a48/arcade.jpg" },
  { label: "MORALE", image: "https://assets.klei.com/f/259446/1920x1080/43da0525f1/dance-party.jpg" },
  { label: "SURVIVAL", image: "https://assets.klei.com/f/259446/1920x1080/d3edbb3253/basic-base.jpg" },
];

const colonyResources = [
  { name: "銅礦", en: "COPPER ORE", glyph: "Cu", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Copper_Ore.png" },
  { name: "藻類", en: "ALGAE", glyph: "ALG", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Algae.png" },
  { name: "氧氣石", en: "OXYLITE", glyph: "O₂", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Oxylite.png" },
  { name: "煤炭", en: "COAL", glyph: "C", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Coal.png" },
  { name: "鐵礦", en: "IRON ORE", glyph: "Fe", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Iron_Ore.png" },
  { name: "金汞齊", en: "GOLD AMALGAM", glyph: "Au", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Gold_Amalgam.png" },
  { name: "火成岩", en: "IGNEOUS ROCK", glyph: "IG", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Igneous_Rock.png" },
  { name: "沙子", en: "SAND", glyph: "Si", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Sand.png" },
  { name: "磷礦", en: "PHOSPHORITE", glyph: "P", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Phosphorite.png" },
  { name: "漂白石", en: "BLEACH STONE", glyph: "Cl", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Bleach_Stone.png" },
  { name: "菌泥", en: "SLIME", glyph: "SLM", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Slime.png" },
  { name: "花崗岩", en: "GRANITE", glyph: "GR", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Granite.png" },
  { name: "硫磺", en: "SULFUR", glyph: "S", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Sulfur.png" },
  { name: "鹽", en: "SALT", glyph: "Na", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Salt.png" },
  { name: "泥土", en: "DIRT", glyph: "DT", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Dirt.png" },
  { name: "冰", en: "ICE", glyph: "ICE", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Ice.png" },
  { name: "鐵鏽", en: "RUST", glyph: "RS", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Rust.png" },
  { name: "黑曜石", en: "OBSIDIAN", glyph: "OB", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Obsidian.png" },
];

const systems = [
  {
    name: "氧氣",
    en: "Oxygen",
    number: "01",
    metric: "1,842 g/s",
    label: "可呼吸氣體產量",
    copy: "把藻類、水與電力，轉化成整座殖民地最珍貴的資產。氣體有重量，也有方向；真正優雅的基地，讓每一口呼吸都自然發生。",
    image: "https://assets.klei.com/f/259446/1920x1080/4ed8d5f0ca/gas-biome.jpg",
  },
  {
    name: "溫度",
    en: "Thermal",
    number: "02",
    metric: "24.6 °C",
    label: "核心生活區溫度",
    copy: "熱不會憑空消失。材質、傳導、冷卻與時間共同構成看不見的建築。控制熱量，就是控制殖民地的未來。",
    image: "https://assets.klei.com/f/259446/1920x1080/c03bceb078/base.jpg",
  },
  {
    name: "電力",
    en: "Power",
    number: "03",
    metric: "+2.8 kW",
    label: "即時能源餘裕",
    copy: "從第一台人力發電機，到自動化能源網路。每一條電線都是選擇，每一次過載都是系統要求你重新思考的訊號。",
    image: "https://assets.klei.com/f/259446/1920x1080/ba46e95a48/arcade.jpg",
  },
  {
    name: "士氣",
    en: "Morale",
    number: "04",
    metric: "+14",
    label: "殖民地平均士氣",
    copy: "生存不是活著而已。好吃的食物、舒服的房間與一場荒唐的舞會，會讓複製人記得：這裡不只是一座基地，而是家。",
    image: "https://assets.klei.com/f/259446/1920x1080/43da0525f1/dance-party.jpg",
  },
];

const buildings = [
  {
    number: "B—01", category: "OXYGEN", glyph: "O₂", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Electrolyzer.png",
    name: "電解器", en: "Electrolyzer",
    description: "將水分解為氧氣與氫氣，是中後期大型殖民地最可靠的呼吸核心。",
    specs: ["120 W", "888 g/s O₂"],
    tip: "設計重點：氧氣溫度高，氫氣會向上聚集。預留冷卻與氣體分離空間。",
  },
  {
    number: "B—02", category: "OXYGEN", glyph: "AIR", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Oxygen_Diffuser.png",
    name: "氧氣擴散器", en: "Oxygen Diffuser",
    description: "消耗藻類快速製氧，結構簡單，是殖民地前期最重要的生命線。",
    specs: ["120 W", "500 g/s O₂"],
    tip: "設計重點：放在生活區中央並保持氣流通暢，同時提前準備藻類耗盡後的替代方案。",
  },
  {
    number: "B—03", category: "POWER", glyph: "⚡", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Smart_Battery.png",
    name: "智慧電池", en: "Smart Battery",
    description: "儲存電力並輸出自動化訊號，讓發電機只在真正需要時運轉。",
    specs: ["20 kJ", "AUTOMATION"],
    tip: "設計重點：用自動化線連接發電機，可大幅減少燃料浪費與不必要的熱量。",
  },
  {
    number: "B—04", category: "POWER", glyph: "COAL", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Coal_Generator.png",
    name: "煤炭發電機", en: "Coal Generator",
    description: "燃燒煤炭提供穩定電力，是殖民地跨入自動化之前最實用的基礎能源。",
    specs: ["600 W", "CO₂ OUTPUT"],
    tip: "設計重點：放在基地下層收集二氧化碳，並搭配智慧電池避免持續空轉。",
  },
  {
    number: "B—05", category: "THERMAL", glyph: "−14°", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Thermo_Aquatuner.png",
    name: "液體冷卻器", en: "Thermo Aquatuner",
    description: "將管線內液體降溫，並把熱量集中到自身，是進階溫控系統的心臟。",
    specs: ["1.2 kW", "−14 °C"],
    tip: "設計重點：機器本身會吸收大量熱量。鋼材、蒸汽室與溫度感測器是經典搭配。",
  },
  {
    number: "B—06", category: "PLUMBING", glyph: "H₂O", image: "https://oxygennotincluded.wiki.gg/wiki/Special:Redirect/file/Liquid_Pump.png",
    name: "液體幫浦", en: "Liquid Pump",
    description: "把液體送入管線系統，串起供水、冷卻、農業與廢水處理的完整循環。",
    specs: ["240 W", "10 kg/s"],
    tip: "設計重點：幫浦必須浸在液體中。搭配液體感測器，可避免空轉與電力浪費。",
  },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [spiralActive, setSpiralActive] = useState(12);
  const [resourceStage, setResourceStage] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const spiralRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia("(pointer: fine)").matches) return;

    const move = (event: PointerEvent) => {
      cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
      const target = event.target;
      cursor.classList.toggle("cursor-hover", target instanceof Element && Boolean(target.closest("a, button")));
      cursor.classList.add("cursor-visible");
    };
    const down = () => cursor.classList.add("cursor-bite");
    const up = () => cursor.classList.remove("cursor-bite");
    const leave = () => cursor.classList.remove("cursor-visible");
    const enter = () => cursor.classList.add("cursor-visible");

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, []);

  useEffect(() => {
    const scroller = mainRef.current;
    const spiral = spiralRef.current;
    if (!scroller || !spiral) return;

    let frame = 0;
    const updateSpiral = () => {
      frame = 0;
      const distance = Math.max(1, scroller.scrollHeight - scroller.clientHeight);
      const progress = scroller.scrollTop / distance;
      const phase = 12 + progress * 48;
      const radius = Math.min(430, window.innerWidth * 0.34);
      const cards = spiral.querySelectorAll<HTMLElement>(".spiral-card");
      cards.forEach((card, index) => {
        const relative = index - phase;
        const angle = relative * 1.08 + Math.PI / 2;
        const depth = (Math.sin(angle) + 1) / 2;
        card.style.setProperty("--spiral-x", `${Math.cos(angle) * radius}px`);
        card.style.setProperty("--spiral-y", `${relative * 48}px`);
        card.style.setProperty("--spiral-scale", `${0.6 + depth * 0.42}`);
        card.style.setProperty("--spiral-opacity", `${0.14 + depth * 0.7}`);
        card.style.zIndex = `${Math.round(depth * 100)}`;
      });
      setSpiralActive(Math.min(71, Math.round(phase)));
      setResourceStage(Math.min(8, Math.floor(progress * 9)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateSpiral);
    };
    const onWindowWheel = (event: WheelEvent) => {
      const target = event.target;
      if (event.ctrlKey || (target instanceof Node && scroller.contains(target))) return;
      event.preventDefault();
      const multiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scroller.clientHeight : 1;
      scroller.scrollTop += event.deltaY * multiplier;
    };

    updateSpiral();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWindowWheel, { passive: false });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWindowWheel);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const current = systems[active];
  const visibleResources = Array.from({ length: 12 }, (_, index) => colonyResources[(resourceStage * 2 + index) % colonyResources.length]);

  return (
    <>
      <nav className="nav outer-nav">
        <a className="wordmark" href="#top" aria-label="缺氧首頁">
          <b>缺氧</b><span>OXYGEN NOT INCLUDED</span>
        </a>
        <div className="nav-center">
          <a href="#world">簡介</a><a href="#systems">系統</a><a href="#buildings">建築</a><a href="#story">旅程</a>
        </div>
        <a className="text-link light-link" href="https://store.steampowered.com/app/457140/Oxygen_Not_Included/" target="_blank" rel="noreferrer">立即遊玩 <i>↗</i></a>
      </nav>
      <div className="critter-cursor" ref={cursorRef} aria-hidden="true">
        <div className="silver-pointer" />
      </div>
      <div className="spiral-background" aria-hidden="true">
        <div className="spiral-orbit" ref={spiralRef}>
          {Array.from({ length: 72 }, (_, index) => {
            const illustration = spiralIllustrations[index % spiralIllustrations.length];
            const relative = index - 12;
            const angle = relative * 1.08 + Math.PI / 2;
            const depth = (Math.sin(angle) + 1) / 2;
            const style = {
              "--spiral-x": `${Math.cos(angle) * 430}px`,
              "--spiral-y": `${relative * 48}px`,
              "--spiral-scale": `${0.6 + depth * 0.42}`,
              "--spiral-opacity": `${0.14 + depth * 0.7}`,
              zIndex: Math.round(depth * 100),
            } as CSSProperties;
            return (
              <figure className={`spiral-card ${spiralActive === index ? "is-active" : ""}`} style={style} key={`${illustration.label}-${index}`}>
                <img
                  src={illustration.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(event) => {
                    const image = event.currentTarget;
                    const attempt = Number(image.dataset.fallbackAttempt ?? "0") + 1;
                    if (attempt < spiralIllustrations.length) {
                      image.dataset.fallbackAttempt = String(attempt);
                      image.src = spiralIllustrations[(index + attempt) % spiralIllustrations.length].image;
                      return;
                    }
                    image.style.display = "none";
                    image.closest(".spiral-card")?.classList.add("image-fallback");
                  }}
                />
                <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{illustration.label}</figcaption>
              </figure>
            );
          })}
        </div>
        <div className="spiral-core"><span>SCROLL</span><b>↻</b></div>
      </div>
      {(["left", "right"] as const).map((side, sideIndex) => (
        <aside className={`resource-rail resource-rail-${side}`} aria-label={`${side === "left" ? "左側" : "右側"}缺氧資源`} key={`${side}-${resourceStage}`}>
          <div className="resource-rail-label">RESOURCE / {String(resourceStage + 1).padStart(2, "0")}</div>
          {visibleResources.slice(sideIndex * 4, sideIndex * 4 + 4).map((resource, index) => (
            <div className="resource-chip" key={`${resource.en}-${index}`} title={resource.name}>
              <span className="resource-glyph" aria-hidden="true">{resource.glyph}</span>
              <img
                src={resource.image}
                alt={resource.name}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  event.currentTarget.parentElement?.classList.add("resource-image-fallback");
                }}
              />
              <div><b>{resource.name}</b><small>{resource.en}</small></div>
            </div>
          ))}
        </aside>
      ))}
      {(["left", "right"] as const).map((side, sideIndex) => (
        <div className={`unmined-wall unmined-wall-${side}`} aria-hidden="true" key={`wall-${side}-${resourceStage}`}>
          {visibleResources.slice(sideIndex * 6, sideIndex * 6 + 6).map((resource, index) => (
            <div className="unmined-tile" key={`${resource.en}-wall-${index}`}>
              <span>{resource.glyph}</span>
              <img
                src={resource.image}
                alt=""
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(event) => { event.currentTarget.style.display = "none"; }}
              />
            </div>
          ))}
        </div>
      ))}
      <main ref={mainRef}>
      <section className="cinema-hero" id="top">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="kicker">A SPACE COLONY SIMULATION</p>
          <h1><span>每一口氣，</span><br />都是設計。</h1>
          <p className="hero-intro">在小行星深處，把混亂設計成生存。</p>
          <a className="circle-link" href="#world" aria-label="向下探索"><span>↓</span></a>
        </div>
        <div className="hero-meta">
          <span>KLEI ENTERTAINMENT</span>
          <span>COLONY / TERRA</span>
          <span>2026 EDITION</span>
        </div>
      </section>

      <section className="editorial" id="world">
        <div className="section-index">01 — THE WORLD</div>
        <div className="editorial-head">
          <p>一座基地。<br />無數種可能。</p>
          <h2>生存，<br />從來不是偶然。</h2>
        </div>
        <div className="editorial-copy">
          <p>《缺氧》把物理、工程與人性交給你。挖掘小行星、引導水與氣體、管理熱量和壓力——然後，看著一個原本不可能存在的世界開始呼吸。</p>
          <span>SCROLL TO EXPLORE</span>
        </div>
      </section>

      <section className="image-break image-break-one">
        <div className="image-caption"><span>01</span><p>每一格物質，都遵循自己的規則。</p></div>
        <div className="floating-stat"><small>BREATHABILITY</small><b>92%</b><i>OPTIMAL</i></div>
      </section>

      <section className="systems-premium" id="systems">
        <header className="systems-head">
          <div className="section-index inverse">02 — CORE SYSTEMS</div>
          <h2>看不見的，<br />決定一切。</h2>
          <p>四個系統，一個持續演化的生命體。</p>
        </header>

        <div className="system-stage">
          <div className="system-visual" key={current.image} style={{ backgroundImage: `linear-gradient(90deg, rgba(5,9,8,.08), rgba(5,9,8,.5)), url(${current.image})` }}>
            <span className="visual-number">{current.number}</span>
            <div className="visual-metric"><small>{current.label}</small><b>{current.metric}</b></div>
          </div>
          <div className="system-panel">
            <div className="system-tabs" role="tablist" aria-label="核心系統">
              {systems.map((system, index) => (
                <button key={system.name} onClick={() => setActive(index)} className={active === index ? "active" : ""} role="tab" aria-selected={active === index}>
                  <span>{system.number}</span><b>{system.name}</b><small>{system.en}</small><i>↗</i>
                </button>
              ))}
            </div>
            <div className="system-copy" key={current.name}>
              <span>{current.en.toUpperCase()} / SYSTEM {current.number}</span>
              <p>{current.copy}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="building-library" id="buildings">
        <header className="building-head">
          <div className="section-index">03 — BUILDING ARCHIVE</div>
          <h2>建造一座<br />會呼吸的機器。</h2>
          <p>六座關鍵建築，串起氧氣、能源、溫度與水的完整循環。將游標移到卡片上，查看工程重點。</p>
        </header>
        <div className="building-grid">
          {buildings.map((building) => (
            <article className="building-card" key={building.name} tabIndex={0}>
              <div className="card-top"><span>{building.number}</span><small>{building.category}</small></div>
              <div className="building-glyph">
                <span aria-hidden="true">{building.glyph}</span>
                <img src={building.image} alt={`${building.name}在《缺氧》遊戲中的外觀`} loading="lazy" />
              </div>
              <div className="building-title"><h3>{building.name}</h3><span>{building.en}</span></div>
              <p>{building.description}</p>
              <div className="building-specs">{building.specs.map((spec) => <span key={spec}>{spec}</span>)}</div>
              <div className="card-reveal"><span>ENGINEERING NOTE</span><p>{building.tip}</p><i>↗</i></div>
            </article>
          ))}
        </div>
      </section>

      <section className="statement">
        <p className="kicker dark-kicker">DESIGN THE IMPOSSIBLE</p>
        <h2>不是管理資源。<br /><em>是設計循環。</em></h2>
        <div className="statement-stats">
          <div><b>∞</b><span>殖民方案</span></div>
          <div><b>100+</b><span>科技與建築</span></div>
          <div><b>1 g</b><span>都不能浪費</span></div>
        </div>
      </section>

      <section className="story" id="story">
        <div className="story-image" />
        <div className="story-content">
          <div className="section-index inverse">04 — THE JOURNEY</div>
          <h2>從三個人，<br />到一片星空。</h2>
          <p>所有偉大的殖民地，都從一間簡陋的廁所、幾塊未開採的礦石，以及三個對未來一無所知的複製人開始。</p>
          <div className="chapter-list">
            <div><span>01</span><b>活過第一夜</b><small>SURVIVE</small></div>
            <div><span>02</span><b>建立生命循環</b><small>THRIVE</small></div>
            <div><span>03</span><b>飛向未知星體</b><small>EXPLORE</small></div>
          </div>
        </div>
      </section>

      <section className="human-section">
        <div className="human-image" />
        <div className="human-copy">
          <span>05 — HUMAN AFTER ALL</span>
          <h2>讓他們<br />不只是活著。</h2>
          <p>複製人會工作、會壓力爆表，也會在音樂響起時跳一支很糟的舞。真正成功的基地，不只維持生命，也容得下快樂。</p>
        </div>
      </section>

      <section className="closing">
        <div className="closing-image" />
        <div className="closing-shade" />
        <div className="closing-content">
          <p className="kicker">YOUR COLONY AWAITS</p>
          <h2>深呼吸。<br />然後開始。</h2>
          <a className="premium-button" href="https://store.steampowered.com/app/457140/Oxygen_Not_Included/" target="_blank" rel="noreferrer"><span>前往 Steam</span><i>↗</i></a>
        </div>
      </section>

      <footer>
        <div className="wordmark"><b>缺氧</b><span>OXYGEN NOT INCLUDED</span></div>
        <p>非官方概念網站。遊戲與相關素材版權歸 Klei Entertainment 所有。</p>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
      </main>
    </>
  );
}
