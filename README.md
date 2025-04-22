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
