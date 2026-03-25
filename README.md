# Pagina orientamento UniTo Informatica (RMA Aosta)

## Contesto
Questa pagina nasce per un incontro orientativo tra ex studenti del Liceo Regina Maria Adelaide (Aosta) e studenti universitari.

Ogni partecipante presenta l'universita che frequenta tramite un banchetto informativo.
Questo progetto rappresenta il banchetto dedicato a:
- Universita degli Studi di Torino
- Dipartimento di Informatica

L'obiettivo e lasciare una pagina chiara, consultabile anche dopo l'evento, soprattutto da smartphone.

## Obiettivi funzionali
- Esperienza mobile-first (prima ottimizzata per telefono, poi desktop)
- Contenuti sintetici ma concreti su percorso, accesso e sbocchi
- Tono diretto e vicino agli studenti delle superiori
- Navigazione semplice con ancora interne
- Compatibilita moderna su browser mobile e desktop

## Struttura dei file
- code.html: struttura semantica della pagina e contenuti
- styles.css: tema visuale, layout responsive, tipografia, animazioni
- script.js: interazioni (menu mobile, reveal on scroll, link sharing, back-to-top)
- DESIGN.md: note di direzione stilistica e principi design

## Scelte di design
- Stile editoriale-tecnico, non "template standard"
- Palette scura con accenti ciano e caldi per atmosfera serale/orientamento
- Tipografia combinata:
  - Newsreader per testi e titoli principali
  - Chakra Petch per elementi UI e micro-label
- Motion sobria e utile (reveal progressivo, feedback bottone, no effetti invasivi)

## Accessibilita e usabilita
- Link "skip to content" per tastiera
- Contrasto elevato su sfondi scuri
- Riduzione animazioni con prefers-reduced-motion
- Menu mobile con attributi aria-expanded e aria-controls
- Sezioni FAQ in elementi details/summary

## Personalizzazioni consigliate
- Aggiorna i link ufficiali UniTo in base al bando dell'anno corrente
- Aggiungi contatti (mail, Instagram, Telegram) nel footer se necessari
- Inserisci eventuali date del prossimo open day
- Se vuoi una versione per piu universita, duplica la struttura delle sezioni e crea una pagina per ogni ateneo

## Come aprire il progetto
Apri code.html in browser.
Non richiede build tools o dipendenze npm.

## Nota per altre AI
Se usi questo repository come base:
- preserva la separazione HTML/CSS/JS
- mantieni priorita mobile-first
- non ridurre il contenuto a un'unica hero marketing: deve restare informativo
- evita stili generici; mantieni una direzione visiva forte e coerente
