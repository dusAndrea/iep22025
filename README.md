# PROGETTO GAIA-DATA

## Funzionalità principali

### Ricerca per argomento o parola chiave

L’utente può cercare un tema (es. “energia”, “acqua”, “riciclo”) ed analizzare i dati/indicatori rilevanti.

#### Sezione “Dati dal mondo”

Mostra statistiche globali (es. emissioni CO₂, accesso all’acqua potabile, ecc.) usando fonti come:

- SDG API
- OpenWeatherMap per dati climatici
- Carbon Interface API per calcoli di emissioni

#### Quiz educativo

Piccolo quiz sulla sostenibilità con feedback educativo.
Modalità dark/light e accessibilità

# Requisiti per il progetto

- Single-page application
- Almeno cinque pagine/meccaniche differenti
- Almeno una interazione con l'utente di scrittura su DB
- Almeno un form (per es. uso di v-model)
- In lettura uso di DB o API
- Responsiveness
- Uso dei framework VueJS e Material Design/Bootstrap

## Le cinque meccaniche

- Liste di elementi (card, immagini, contenuti strutturati, ecc.)
- Viste di dettaglio (titolo, descrizione, immagine, ecc.)
- Elementi di interazioni (bottoni, ricerca, tab, menu, ecc.)
- Form di creazione/modifica dati (o contatto)
- Pagine statiche (staff, descrizione, ecc. max una)

## Interazione con il DB

- Almeno una lettura di dati da DB
- Almeno una scrittura di dati su input dell'utente
- Non è obbligatorio avere un login utente (nemmeno per un'eventuale interfaccia amministrativa)
- Usare Google Cloud Firestore
  (per es. commenti, profili, impostazioni, voti)

## Dati

- Dati accessibili tramite API
- Dati immagazzinati su DB (ma in discreta quantità)
- Assolutamente NO dati principali del sito inseriti hardcoded nel codice (né in formato JSON né tantomeno in HTML)

## Responsiveness

- Il sito dovrà essere responsive
- La navigazione e tutte le funzionalità devono essere
  garantite su tutti i dispositivi:
  - Smartphone
  - Tablet
  - PC desktop

## Framework

- Fortemente consigliato l'uso di VueJS
- Fortemente consigliato l'uso di Material Design/Bootstrap
- In casi particolari si può concordare l'uso di framework
  alternativi (Angular, React, jQuery, ecc.)

## Viste

- Login (user, password, recupera password, mail utente)
- Recupera password(emeil, conferma email)
- New User (nome, cognome, email, conferma mail, password, conferma Password)
- Pagina Profilo (riepilogo dati, preferente, salvataggio)
- Dashboard (analisi dei dati)

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
