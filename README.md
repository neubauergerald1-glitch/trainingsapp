# Trainingsplan Gerald

Die Trainings-App aus Cowork als eigenständige Web-App (PWA). Läuft offline, kann am iPhone
auf den Home-Bildschirm gelegt werden und braucht keinen Server außer einem einfachen Webhosting.

## Funktionen
- **Heute-Karte**: Trainingswoche, Phase (Einstieg / Aufbau / leichte Woche) und welcher Plan heute dran ist
- **Plan A / Plan B**: Übungen mit Tipps, Satz-Haken (neuer Tag = automatisch zurückgesetzt)
- **Gewichtsverlauf**: Eintrag pro Tag, „Letztes Training“, „Rekord“ und Verlaufskurve
- **Ernährung**: Tagesziele, 8 Rezeptideen pro Woche (wechseln jeden Montag), Rezeptebox, Nahrungsergänzung
- **Datensicherung**: Export/Import als JSON-Datei

Beim ersten Start werden die Gewichte und die Rezeptebox aus der Cowork-Version (Stand 7.11.2026) übernommen.

## Lokal starten
```bash
python3 -m http.server 8000
```
Dann http://localhost:8000 öffnen.

## Aufbau
| Datei | Inhalt |
|---|---|
| `index.html` | Seitenstruktur und feste Texte |
| `js/data.js` | Übungen, Rezeptpool, Startdaten – **hier den Plan anpassen** |
| `js/store.js` | Speicherung im Browser, Export/Import |
| `js/app.js` | Logik und Darstellung |
| `sw.js` | Offline-Cache (bei Änderungen `VERSION` erhöhen) |

## Aufs iPhone
1. Ordner auf ein HTTPS-Hosting legen (z. B. GitHub Pages oder Netlify).
2. Seite in Safari öffnen → Teilen → „Zum Home-Bildschirm“.

Die Daten liegen nur auf dem jeweiligen Gerät. Regelmäßig über „Daten exportieren“ sichern.
