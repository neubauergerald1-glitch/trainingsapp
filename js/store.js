/* Lokale Speicherung (localStorage) mit Export/Import. */
(function () {
  const KEY = "trainingsapp.v1";
  const empty = () => ({
    version: 1,
    startDate: null,
    view: null,
    done: {},          // { "A0": [true,false,true] }
    doneDate: null,    // Datum, an dem die Haken gesetzt wurden
    history: {},       // { "chest-press": { "2026-11-04": "37,5" } }
    box: {}            // { "rezept-id": { ...rezept, addedAt } }
  });

  let state = empty();
  let memoryOnly = false;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { state = Object.assign(empty(), JSON.parse(raw)); return false; }
    } catch (e) { memoryOnly = true; }
    return true; // erster Start
  }

  function save() {
    if (memoryOnly) return;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { memoryOnly = true; }
  }

  function seed(data) {
    const s = data.seed;
    state.startDate = s.startDate;
    state.history = JSON.parse(JSON.stringify(s.history));
    const now = new Date().toISOString();
    s.box.forEach(id => {
      const r = data.recipes.find(x => x.id === id);
      if (r) state.box[id] = Object.assign({}, r, { addedAt: now });
    });
    save();
  }

  function exportJSON() {
    return JSON.stringify(Object.assign({ exportedAt: new Date().toISOString() }, state), null, 2);
  }

  function importJSON(text) {
    const d = JSON.parse(text);
    if (!d || typeof d !== "object" || typeof d.history !== "object") throw new Error("Keine gültige Sicherung");
    // Verlauf zusammenführen statt überschreiben
    Object.keys(d.history).forEach(k => {
      state.history[k] = Object.assign({}, state.history[k] || {}, d.history[k]);
    });
    Object.assign(state.box, d.box || {});
    if (d.startDate) state.startDate = d.startDate;
    save();
  }

  window.Store = {
    get state() { return state; },
    load, save, seed, exportJSON, importJSON,
    get persistent() { return !memoryOnly; }
  };
})();
