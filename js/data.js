/* Inhalte der App: Trainingspläne, Rezepte, Startdaten. Nur hier ändern, um den Plan anzupassen. */
window.APP_DATA = {
  plans: {
    A: [
      { n: "Seated Leg Press", d: "3 × 10–12", p: "2 min", t: "Life Fitness", g: ["mtb"], tip: "Füße schulterbreit auf der Platte, Knie oben nicht ganz durchstrecken. Rücken bleibt am Polster." },
      { n: "Chest Press", d: "3 × 8–12", p: "90 s", t: "Life Fitness", g: [], tip: "Sitz so einstellen, dass die Griffe auf Brusthöhe sind. Schulterblätter nach hinten-unten." },
      { n: "Pulldown", d: "3 × 10–12", p: "90 s", t: "Life Fitness", g: ["mtb", "biz"], tip: "Griffe zur oberen Brust ziehen, Brust raus, Oberkörper ruhig. Trainiert Rücken und Bizeps mit." },
      { n: "Back Extension", d: "3 × 12–15", p: "90 s", t: "Life Fitness", g: ["mtb", "abs"], tip: "Hüfte am Drehpunkt ausrichten, Füße fest, Arme vor der Brust verschränkt. Langsam und kontrolliert nach hinten strecken, bis der Körper gerade ist, nicht ins Hohlkreuz überstrecken. Kräftigt den unteren Rücken, der bei langen Anstiegen und im Stehen bergab am meisten arbeitet." },
      { n: "Biceps Curl", d: "3 × 10–12", p: "60 s", t: "Life Fitness", g: ["biz"], tip: "Ellbogen auf Höhe der Drehachse. Oben kurz anspannen, 2–3 Sekunden ablassen." },
      { n: "Abdominal", d: "3 × 12–15", p: "60 s", t: "Life Fitness", g: ["abs"], tip: "Mit dem Bauch einrollen, nicht mit den Armen ziehen. Beim Einrollen ausatmen." },
      { n: "Torso Rotation", d: "2 × 12 / Seite", p: "60 s", t: "Life Fitness", g: ["abs", "mtb"], tip: "Kontrolliert drehen, ein kleiner Bewegungsradius reicht. Wichtig für Stabilität im Trail." }
    ],
    B: [
      { n: "Seated Leg Press", d: "3 × 12–15", p: "2 min", t: "Life Fitness", g: ["mtb"], tip: "Etwas leichter als in Plan A, dafür mehr Wiederholungen. Füße etwas höher auf die Platte, das betont Po und Oberschenkelrückseite." },
      { n: "Shoulder Press", d: "3 × 10–12", p: "90 s", t: "Life Fitness", g: ["mtb"], tip: "Griffe auf Schulterhöhe, nach oben drücken ohne die Ellbogen ganz durchzustrecken. Kein Hohlkreuz." },
      { n: "Pectoral Fly", d: "3 × 12–15", p: "60 s", t: "Life Fitness", g: [], tip: "Sitz so einstellen, dass die Griffe auf Brusthöhe sind. Arme leicht gebeugt im Bogen zusammenführen, kurz halten, langsam öffnen, nur so weit, wie es in der Schulter angenehm bleibt." },
      { n: "Pulldown", d: "3 × 10–12", p: "90 s", t: "Life Fitness", g: ["mtb", "biz"], tip: "Wie in Plan A. Wenn möglich mit Griff im Untergriff, das fordert den Bizeps stärker." },
      { n: "Biceps Curl", d: "3 × 12–15", p: "60 s", t: "Life Fitness", g: ["biz"], tip: "Etwas leichter, dafür mehr Wiederholungen. Im letzten Satz unten 2 Sekunden halten." },
      { n: "Calf Extension", d: "3 × 12–15", p: "60 s", t: "Life Fitness", g: ["mtb"], tip: "Volle Bewegung: tief in die Dehnung, oben kurz halten. Stabilisiert die Füße auf den Pedalen." },
      { n: "Hip Abduction", d: "3 × 12–15", p: "60 s", t: "Life Fitness", g: ["mtb"], tip: "Rücken ans Polster, Polster außen an den Knien. Beine kontrolliert nach außen drücken, kurz halten, 2–3 Sekunden zurück. Kräftigt den seitlichen Po, der Knie und Becken auf dem Rad stabil hält." },
      { n: "Plank", d: "3 × 30–45 s", p: "45 s", t: "Körpergewicht", g: ["abs", "mtb"], tip: "Auf den Unterarmen, Körper gerade wie ein Brett, Bauch und Po fest. Normal weiteratmen." }
    ]
  },

  /* Rezeptpool. Jede Woche (ab Montag) werden daraus 8 Vorschläge gezogen:
     2 Frühstück, 2 Mittag, 2 Abend, 1 Snack, 1 Nach dem Training. */
  recipes: [
    { id: "apfel-zimt-topfen-porridge", when: "Frühstück", name: "Apfel-Zimt-Topfen-Porridge", protein: "38", text: "40 g Haferflocken mit 150 ml Milch und einem geriebenen Apfel 5 min köcheln, dann 200 g Magertopfen und Zimt einrühren. Mit 1 EL gehackten Walnüssen bestreuen." },
    { id: "schwammerl-spinat-omelett", when: "Frühstück", name: "Schwammerl-Spinat-Omelett mit Bergkäse", protein: "34", text: "2 Eier und 150 g Eiklar verquirlen, mit angebratenen Champignons, Babyspinat und 20 g geriebenem Bergkäse in der Pfanne stocken lassen. Dazu 1 Scheibe Vollkornbrot." },
    { id: "ruehrei-vollkornbrot", when: "Frühstück", name: "Rührei auf Vollkornbrot", protein: "30", text: "3 Eier mit Schnittlauch und Paprika, dazu 1–2 Scheiben Vollkornbrot und ein paar Cocktailtomaten." },
    { id: "topfen-beeren-schuessel", when: "Frühstück", name: "Topfen-Beeren-Schüssel", protein: "36", text: "250 g Magertopfen mit etwas Milch cremig rühren, 150 g Beeren (auch TK), 30 g Haferflocken und 1 EL Leinsamen darüber." },
    { id: "lachs-huettenkaese-brot", when: "Frühstück", name: "Räucherlachs-Hüttenkäse-Brot", protein: "32", text: "2 Scheiben Vollkornbrot mit 100 g Hüttenkäse, 60 g Räucherlachs, Gurke, Kren und Dille belegen." },

    { id: "puten-kraut-pfanne", when: "Mittag", name: "Puten-Kraut-Pfanne mit Kümmel", protein: "42", text: "180 g Putenbrust in Streifen anbraten, mit Zwiebel, fein geschnittenem Weißkraut, Kümmel und Paprikapulver 15 min dünsten. Dazu 150 g gekochte Erdäpfel." },
    { id: "krautfleckerl-light", when: "Mittag", name: "Krautfleckerl light mit Rindfaschiertem", protein: "38", text: "60 g Vollkornfleckerl kochen; 150 g mageres Rindfaschiertes mit Zwiebel, Weißkraut und Kümmel anbraten und mit den Fleckerln vermischen. Mit Pfeffer und Petersilie abschmecken." },
    { id: "hendl-gemuese-pfanne", when: "Mittag", name: "Hendl-Gemüse-Pfanne", protein: "45", text: "180 g Hühnerbrust in Streifen, Brokkoli, Paprika, Zucchini, Sojasauce und Ingwer. Dazu 60 g (roh) Basmati- oder Vollkornreis." },
    { id: "linsen-bolognese", when: "Mittag", name: "Linsen-Bolognese mit Vollkornspaghetti", protein: "40", text: "100 g mageres Rindfaschiertes mit Zwiebel, Karotte und 50 g roten Linsen anbraten, mit passierten Tomaten 15 min köcheln. Dazu 70 g Vollkornspaghetti und etwas Parmesan." },
    { id: "rindsgulasch-light", when: "Mittag", name: "Rindsgulasch light mit Erdäpfeln", protein: "40", text: "160 g mageres Rindfleisch (Wadschinken) mit viel Zwiebel, Paprikapulver, Kümmel und Majoran schmoren. Dazu 150 g Erdäpfel und ein grüner Salat." },

    { id: "forelle-rote-rueben-salat", when: "Abend", name: "Forelle mit Rote-Rüben-Salat", protein: "36", text: "180 g Forellenfilet auf der Hautseite knusprig braten, dazu Salat aus gekochten Roten Rüben, Kren, Apfelessig und Rucola. Liefert reichlich Omega-3." },
    { id: "steirischer-kaeferbohnen-salat", when: "Abend", name: "Steirischer Käferbohnensalat mit Hendl & Ei", protein: "40", text: "150 g gekochte Käferbohnen, 120 g gebratene Hendlbruststreifen und 1 hartes Ei mit roter Zwiebel, Vogerlsalat, Apfelessig und 1 EL Kürbiskernöl anrichten. In 15 min fertig." },
    { id: "lachs-ofengemuese", when: "Abend", name: "Lachs mit Ofengemüse", protein: "35", text: "150 g Lachsfilet, Kürbis, Karotten und rote Zwiebel mit Olivenöl und Rosmarin 25 min bei 200 °C. Liefert auch Omega-3." },
    { id: "thunfisch-bohnen-salat", when: "Abend", name: "Thunfisch-Bohnen-Salat", protein: "38", text: "1 Dose Thunfisch im eigenen Saft, 100 g weiße Bohnen, Paprika, rote Zwiebel, Petersilie, Zitrone und 1 TL Olivenöl." },
    { id: "gefuellte-paprika-pute", when: "Abend", name: "Gefüllte Paprika mit Putenfaschiertem", protein: "36", text: "2 Paprika mit 150 g Putenfaschiertem, Zwiebel, Kräutern und 1 EL Reis füllen, in Tomatensauce 35 min bei 180 °C garen." },

    { id: "liptauer-gemuesesticks", when: "Snack", name: "Liptauer light mit Gemüsesticks", protein: "25", text: "200 g Magertopfen mit Paprikapulver, Kümmel, gehacktem Gurkerl und Schnittlauch abmischen. Mit Karotten-, Sellerie- und Paprikasticks dippen." },
    { id: "huettenkaese-gemuese", when: "Snack", name: "Hüttenkäse & Gemüse", protein: "25", text: "200 g Hüttenkäse mit Gurke, Radieschen und Kräutern. Ideal am Nachmittag oder als leichtes Abendessen." },
    { id: "skyr-nuesse", when: "Snack", name: "Skyr mit Nüssen und Apfel", protein: "22", text: "200 g Skyr natur mit einem gewürfelten Apfel, Zimt und 15 g Walnüssen." },

    { id: "schinken-ei-groestl", when: "Nach dem Training", name: "Schinken-Ei-Gröstl light", protein: "34", text: "200 g gekochte Erdäpfel in Scheiben mit Zwiebel in wenig Öl anrösten, 100 g Beinschinken-Würfel dazu und 2 Eier darüber stocken lassen. Kohlenhydrate plus Eiweiß für die Regeneration." },
    { id: "topfen-bananen-shake", when: "Nach dem Training", name: "Topfen-Bananen-Shake", protein: "35", text: "200 g Magertopfen, 1 Banane, 250 ml Milch und 20 g Haferflocken mixen. Schnell gemacht direkt nach dem Studio." },
    { id: "hendl-wrap", when: "Nach dem Training", name: "Hendl-Wrap mit Joghurtsauce", protein: "38", text: "Vollkorn-Wrap mit 130 g gebratener Hendlbrust, Salat, Tomate und Gurke füllen. Sauce aus Joghurt, Knoblauch und Kräutern." }
  ],

  weeklyPick: [["Frühstück", 2], ["Mittag", 2], ["Abend", 2], ["Snack", 1], ["Nach dem Training", 1]],

  /* Übernommen aus der Cowork-Version (Stand 7.11.2026). Wird nur beim allerersten Start geladen. */
  seed: {
    startDate: "2026-10-26",
    history: {
      "abdominal": { "2026-10-28": "35", "2026-10-30": "42,5", "2026-10-31": "47,5", "2026-11-01": "50" },
      "biceps-curl": { "2026-10-30": "25", "2026-10-31": "30", "2026-11-01": "30" },
      "calf-extension": { "2026-10-28": "45", "2026-10-31": "52,5", "2026-11-01": "57,5" },
      "chest-press": { "2026-10-28": "27,5", "2026-10-30": "30", "2026-11-01": "35", "2026-11-04": "37,5" },
      "pectoral-fly": { "2026-10-31": "27,5" },
      "plank": { "2026-11-02": "45" },
      "pulldown": { "2026-10-28": "40", "2026-10-31": "42,5" },
      "row": { "2026-10-30": "45" },
      "seated-leg-press": { "2026-10-28": "40", "2026-10-30": "45", "2026-10-31": "50", "2026-11-01": "57,5" },
      "shoulder-press": { "2026-11-01": "12,5" },
      "torso-rotation": { "2026-10-28": "40", "2026-10-30": "45", "2026-10-31": "52,5", "2026-11-01": "57,5" }
    },
    box: [
      "krautfleckerl-light", "steirischer-kaeferbohnen-salat", "schwammerl-spinat-omelett",
      "hendl-gemuese-pfanne", "huettenkaese-gemuese", "lachs-ofengemuese", "ruehrei-vollkornbrot"
    ]
  }
};
