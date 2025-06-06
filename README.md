# Chat4Men 2025

Dit project bevat de volledige Chat4Men 2025-applicatie: een P2P videochat voor mannen, met:

- Betalingssysteem via Stripe (abonnement)
- Anoniem profiel in localStorage
- Juridische verklaring, Gebruiksvoorwaarden (TOS) en Privacybeleid
- Peer-to-peer videochat via WebRTC (Simple-Peer + Socket.io)

## Inhoud

- `.env.example` : Voorbeeld omgevingsvariabelen.
- `package.json` : Dependencies en scripts.
- `server.js` : Node.js-server met Stripe, endpoints en Socket.io.
- `README.md` : Deze uitleg.
- `public/`
  - `index.html` : Landingspagina met betaalknop.
  - `chat.html` : Chatomgeving (verifieert betaling en P2P-videochat).
  - `statement.html` : Juridische Verklaring.
  - `tos.html` : Terms of Service.
  - `privacy.html` : Privacybeleid.
  - `styles.css` : Styles voor alle pagina's.
  - `script.js` : Frontend logica voor betaling, verificatie, anoniem profiel en WebRTC.

## Installatie

1. Download of clone de repo.
2. Kopieer `.env.example` naar `.env` en vul je eigen Stripe-sleutels in:
   ```
   STRIPE_SECRET_KEY=sk_test_<jouw_secret_key>
   STRIPE_PUBLISHABLE_KEY=pk_test_<jouw_publishable_key>
   PORT=3000
   ```
3. Open terminal/PowerShell in de hoofdmap en installeer dependencies:
   ```
   npm install
   ```
4. Start de server:
   ```
   npm start
   ```
5. Ga naar `http://localhost:3000` in je browser.

## Gebruik

1. **Landingspagina**: Klik op “Betaal nu (€5,00/maand)”.
2. **Stripe Checkout**: Rond de betaling af (gebruik testmodus, bijvoorbeeld kaart 4242 4242 4242 4242).
3. **Chatomgeving**: Wordt automatisch doorgestuurd met `session_id`. 
   - De chatpagina controleert betaling via `/check-session`.
   - Klik op “Genereer Anoniem Profiel” om een willekeurig profiel-ID te maken.
   - Klik op “Start Gesprek” in twee tabbladen/apparaten voor directe P2P-videochat.

## Deployment

- **Heroku**: 
  - Voeg `Procfile` toe: `web: node server.js` (optioneel).
  - Push repo naar Heroku, stel omgevingsvariabelen in via Heroku Dashboard.
- **VPS / VPS**: Installeer Node.js, clone repo, `npm install`, `npm start`. Gebruik Nginx als reverse proxy voor HTTPS.
- **GitHub Pages**: Alleen de statische frontend (public-inhoud) kan via Pages gehost worden; de volledige chat vereist een Node.js-runtime.
