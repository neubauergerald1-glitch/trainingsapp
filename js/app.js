(function () {
  const D = window.APP_DATA, S = window.Store;
  const TAG = { mtb: ["mtb", "MTB"], biz: ["biz", "Bizeps"], abs: ["abs", "Bauch"] };
  const DAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const $ = id => document.getElementById(id);

  /* ---------- Hilfsfunktionen ---------- */
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const iso = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const parseISO = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const fmtD = s => { const p = s.split("-"); return p[2] + "." + p[1] + "." + p[0]; };
  const num = v => { const m = String(v).replace(",", ".").match(/\d+(\.\d+)?/); return m ? parseFloat(m[0]) : null; };
  const hkey = n => String(n).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const unitOf = t => t === "Körpergewicht" ? " s" : " kg";
  const fmtV = (v, t) => { const n = num(v); return n === null ? esc(v) : String(n).replace(".", ",") + unitOf(t); };
  const dayMs = 864e5;
  let TODAY = iso(new Date());

  function mondayOf(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; }

  /* ---------- Trainingswoche, Phase, heutiger Plan ---------- */
  function cycleInfo() {
    const st = S.state.startDate ? mondayOf(parseISO(S.state.startDate)) : mondayOf(new Date());
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const week = Math.floor((mondayOf(today) - st) / dayMs / 7) + 1;
    let phase, phaseWeek, sets;
    if (week < 1) { phase = 0; sets = 2; }
    else if (week <= 2) { phase = 1; sets = 2; phaseWeek = week; }
    else {
      const c = (week - 3) % 6;           // 0..4 = Woche 3–7, 5 = Woche 8
      phaseWeek = c + 3;
      phase = c === 5 ? 3 : 2;
      sets = c === 5 ? 2 : 3;
    }
    const odd = week % 2 === 1;
    const schedule = { 1: odd ? "A" : "B", 3: odd ? "B" : "A", 5: odd ? "A" : "B" };
    const dow = today.getDay();
    let todayPlan = schedule[dow] || null, next = null;
    if (!todayPlan) {
      for (let i = 1; i <= 7; i++) {
        const nd = new Date(today.getTime() + i * dayMs), w2 = Math.floor((mondayOf(nd) - st) / dayMs / 7) + 1;
        const o2 = w2 % 2 === 1, s2 = { 1: o2 ? "A" : "B", 3: o2 ? "B" : "A", 5: o2 ? "A" : "B" }[nd.getDay()];
        if (s2) { next = { plan: s2, day: DAYS[nd.getDay()], inDays: i }; break; }
      }
    }
    return { week, phase, phaseWeek, sets, odd, todayPlan, next };
  }

  function renderToday() {
    const c = cycleInfo();
    const phaseTxt = c.phase === 0 ? "Start steht noch bevor" :
      c.phase === 1 ? (c.week === 1 ? "Testwoche · 2 Sätze" : "Einstieg · 2 Sätze") :
      c.phase === 3 ? "Leichte Woche · 2 Sätze, −20 %" : "Aufbau · 3 Sätze";
    const main = c.todayPlan
      ? `Heute: <button type="button" class="go" data-go="${c.todayPlan}">Plan ${c.todayPlan}</button>`
      : c.next ? `Heute Ruhetag · nächste Einheit ${c.next.inDays === 1 ? "morgen" : c.next.day}: Plan ${c.next.plan}` : "Heute Ruhetag";
    $("today").innerHTML = `<div class="t-week"><span class="h-l">Trainingswoche</span><b>${c.week > 0 ? c.week : "–"}</b></div>
      <div class="t-main"><span class="h-l">${esc(phaseTxt)}${c.phaseWeek ? " · Plan-Woche " + c.phaseWeek : ""}</span><b>${main}</b></div>`;
    document.querySelectorAll(".wk").forEach(el => el.classList.toggle("cur", c.week > 0 && (el.dataset.parity === "1") === c.odd));
    document.querySelectorAll(".ph").forEach(el => el.classList.toggle("cur", +el.dataset.phase === c.phase));
    return c;
  }

  /* ---------- Verlauf ---------- */
  function entries(hk) {
    const e = S.state.history[hk] || {};
    return Object.keys(e).filter(d => String(e[d]).trim() !== "").sort().map(d => ({ d, v: e[d], n: num(e[d]) }));
  }

  function spark(es) {
    const pts = es.filter(x => x.n !== null).slice(-12);
    if (pts.length < 2) return "";
    const W = 120, H = 32, P = 3;
    const min = Math.min(...pts.map(p => p.n)), max = Math.max(...pts.map(p => p.n)), rng = max - min || 1;
    const xy = pts.map((p, i) => [P + i * (W - 2 * P) / (pts.length - 1), H - P - (p.n - min) / rng * (H - 2 * P)]);
    const path = xy.map((q, i) => (i ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" ");
    const last = xy[xy.length - 1];
    return `<svg class="spark" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Verlauf der letzten ${pts.length} Einträge">
      <path d="${path}" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
      <circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="3" fill="currentColor"/></svg>`;
  }

  function histHTML(hk, t) {
    const es = entries(hk);
    const prev = es.filter(x => x.d < TODAY).pop() || es[es.length - 1];
    let best = null; es.forEach(x => { if (x.n !== null && (!best || x.n > best.n)) best = x; });
    const last = prev ? `${fmtV(prev.v, t)}<small>${fmtD(prev.d)}</small>` : '<span class="h-muted">noch kein Eintrag</span>';
    const rec = best ? `${fmtV(best.v, t)}<small>${fmtD(best.d)}</small>${best.d === TODAY && es.length > 1 ? '<span class="new">Neu!</span>' : ""}` : '<span class="h-muted">–</span>';
    const sp = spark(es);
    return `<div><span class="h-l">Letztes Training</span><b>${last}</b></div><div><span class="h-l">Rekord</span><b>${rec}</b></div>${sp ? `<div class="full sp-row">${sp}<span class="h-muted">${es.length} Einträge</span></div>` : ""}`;
  }

  /* ---------- Trainingsliste ---------- */
  function setCount(x, c) {
    const fromDose = parseInt(x.d, 10) || 3;
    return Math.min(fromDose, c.sets);
  }

  function renderPlan() {
    const st = S.state, v = st.view, c = cycleInfo();
    $("list").innerHTML = D.plans[v].map((x, i) => {
      const key = v + i, hk = hkey(x.n), n = setCount(x, c);
      const sets = Array.from({ length: n }, (_, s) =>
        `<button type="button" class="set" data-k="${key}" data-s="${s}" aria-pressed="${!!(st.done[key] || [])[s]}" aria-label="Satz ${s + 1}">${s + 1}</button>`).join("");
      const ph = x.t === "Körpergewicht" ? "z. B. 40 s" : "z. B. 40 kg";
      const today = (st.history[hk] || {})[TODAY] || "";
      return `<article class="ex"><div class="num">${i + 1}</div><div class="ex-body">
        <div class="ex-head"><h3>${esc(x.n)}</h3><div class="dose">${esc(x.d.replace(/^\d+/, n))}</div></div>
        <div class="meta"><span class="chip">${esc(x.t)}</span><span class="chip">Pause ${esc(x.p)}</span>${x.g.map(g => `<span class="chip ${TAG[g][0]}">${TAG[g][1]}</span>`).join("")}</div>
        <p class="tip">${esc(x.tip)}</p>
        <div class="hist" data-h="${hk}" data-t="${esc(x.t)}">${histHTML(hk, x.t)}</div>
        <div class="track"><div class="sets">${sets}</div>
          <div class="kg"><label for="kg-${key}">Heute</label><input id="kg-${key}" data-h="${hk}" data-t="${esc(x.t)}" inputmode="decimal" autocomplete="off" placeholder="${ph}" value="${esc(today)}"></div></div>
      </div></article>`;
    }).join("");
  }

  /* ---------- Rezepte ---------- */
  function weekRecipes() {
    const mon = mondayOf(new Date());
    const idx = Math.round(mon.getTime() / dayMs / 7);
    const out = [];
    D.weeklyPick.forEach(([when, count]) => {
      const pool = D.recipes.filter(r => r.when === when);
      for (let k = 0; k < count && k < pool.length; k++) out.push(pool[(idx * count + k) % pool.length]);
    });
    return { list: out, stand: iso(mon) };
  }

  function card(r, mode) {
    const saved = !!S.state.box[r.id];
    const btn = mode === "box"
      ? `<button type="button" class="add rm" data-rm="${esc(r.id)}">Aus Rezeptebox entfernen</button>`
      : `<button type="button" class="add" data-add="${esc(r.id)}" aria-pressed="${saved}">${saved ? "In der Rezeptebox ✓" : "In die Rezeptebox"}</button>`;
    return `<article class="rc"><div class="when">${esc(r.when || "")}</div><h3>${esc(r.name || "")}</h3>${r.protein ? `<div class="prot">ca. ${esc(r.protein)} g Eiweiß</div>` : ""}<p>${esc(r.text || "")}</p>${btn}</article>`;
  }

  function renderNutrition() {
    const w = weekRecipes();
    $("wk-stand").textContent = "Woche ab " + fmtD(w.stand);
    $("recipes").innerHTML = w.list.map(r => card(r, "week")).join("");
    const items = Object.values(S.state.box).sort((a, b) => String(b.addedAt).localeCompare(String(a.addedAt)));
    $("box-count").textContent = items.length ? `${items.length} ${items.length === 1 ? "Rezept" : "Rezepte"}` : "";
    $("box").innerHTML = items.length ? items.map(r => card(r, "box")).join("")
      : '<p class="note">Noch leer. Tippe bei einem Rezept auf „In die Rezeptebox“, dann landet es hier und bleibt gespeichert.</p>';
  }

  /* ---------- Gesamtansicht ---------- */
  function render() {
    const st = S.state;
    document.querySelectorAll(".switch button").forEach(b => b.setAttribute("aria-selected", b.dataset.view === st.view));
    const isN = st.view === "N";
    $("training").hidden = isN;
    $("nutrition").hidden = !isN;
    if (isN) renderNutrition(); else renderPlan();
  }

  function setView(v) { S.state.view = v; S.save(); render(); }

  let toastT;
  function toast(t) { const el = $("toast"); el.textContent = t; el.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { el.hidden = true; }, 2200); }

  /* ---------- Ereignisse ---------- */
  document.querySelector(".switch").addEventListener("click", e => { const b = e.target.closest("button"); if (b) setView(b.dataset.view); });
  $("today").addEventListener("click", e => { const b = e.target.closest("[data-go]"); if (b) { setView(b.dataset.go); document.querySelector(".switch").scrollIntoView({ behavior: "smooth" }); } });

  $("list").addEventListener("click", e => {
    const b = e.target.closest(".set"); if (!b) return;
    const st = S.state, a = st.done[b.dataset.k] || [];
    a[+b.dataset.s] = !a[+b.dataset.s];
    st.done[b.dataset.k] = a; st.doneDate = TODAY;
    b.setAttribute("aria-pressed", !!a[+b.dataset.s]);
    if (a[+b.dataset.s] && navigator.vibrate) navigator.vibrate(15);
    S.save();
  });

  function storeWeight(i) {
    const hk = i.dataset.h, v = i.value.trim(), h = Object.assign({}, S.state.history[hk] || {});
    if (v) h[TODAY] = v; else delete h[TODAY];
    S.state.history[hk] = h; S.save();
    document.querySelectorAll(`.hist[data-h="${hk}"]`).forEach(el => { el.innerHTML = histHTML(hk, el.dataset.t); });
  }
  $("list").addEventListener("change", e => { if (e.target.matches("input[data-h]")) { storeWeight(e.target); if (e.target.value.trim()) toast("Gespeichert"); } });
  $("list").addEventListener("keydown", e => { if (e.key === "Enter" && e.target.matches("input[data-h]")) e.target.blur(); });

  $("reset").addEventListener("click", () => { S.state.done = {}; S.state.doneDate = null; S.save(); render(); });

  $("nutrition").addEventListener("click", e => {
    const b = e.target.closest("button[data-add],button[data-rm]"); if (!b) return;
    const id = b.dataset.add || b.dataset.rm, box = S.state.box;
    if (b.dataset.rm || box[id]) delete box[id];
    else { const r = D.recipes.find(x => x.id === id); if (r) box[id] = Object.assign({}, r, { addedAt: new Date().toISOString() }); }
    S.save(); renderNutrition();
  });

  /* Einstellungen */
  const sd = $("start-date");
  sd.addEventListener("change", () => { if (sd.value) { S.state.startDate = sd.value; S.save(); renderToday(); render(); } });

  $("export").addEventListener("click", () => {
    const blob = new Blob([S.exportJSON()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = `training-sicherung-${TODAY}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  $("import-file").addEventListener("change", async e => {
    const f = e.target.files[0]; if (!f) return;
    const msg = $("settings-msg");
    try { S.importJSON(await f.text()); sd.value = S.state.startDate || ""; renderToday(); render(); msg.textContent = "Sicherung importiert."; }
    catch (err) { msg.textContent = "Die Datei konnte nicht gelesen werden: " + err.message; }
    msg.hidden = false; e.target.value = "";
  });

  /* Tageswechsel (App bleibt am Handy oft offen) */
  function onNewDay() {
    const t = iso(new Date());
    if (t === TODAY) return;
    TODAY = t;
    if (S.state.doneDate && S.state.doneDate !== TODAY) { S.state.done = {}; S.state.doneDate = null; S.save(); }
    const c = renderToday(); if (c.todayPlan) S.state.view = c.todayPlan;
    render();
  }
  document.addEventListener("visibilitychange", () => { if (!document.hidden) onNewDay(); });

  /* ---------- Start ---------- */
  const first = S.load();
  if (first) S.seed(D);
  if (S.state.doneDate && S.state.doneDate !== TODAY) { S.state.done = {}; S.state.doneDate = null; }
  try { const h = location.hash.slice(1).toLowerCase(); if (h === "a" || h === "b") S.state.view = h.toUpperCase(); if (h === "ernaehrung") S.state.view = "N"; } catch (e) {}
  const c = renderToday();
  if (!location.hash && c.todayPlan) S.state.view = c.todayPlan;
  if (!S.state.view) S.state.view = (c.next && c.next.plan) || "A";
  sd.value = S.state.startDate || "";
  S.save();
  render();
  if (!S.persistent) toast("Achtung: Speichern ist in diesem Browser blockiert.");
})();
