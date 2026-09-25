# express-mysql-cloudinary-kit

Libreria di moduli backend condivisi per applicazioni Node.js/Express con database MySQL (Aiven) e storage immagini su Cloudinary.

## Installazione

npm install github:FrancescoMoretti/express-mysql-cloudinary-kit

## Moduli

**Database**
- `createPool(config)` — crea un pool `mysql2/promise` con SSL, a partire da host/porta/utente/password/database/certificato
- `keepAlive(pool)` — ping periodico (ogni 12h) per evitare il timeout della connessione

**Cloudinary**
- `createCloudinary(config)` — configura il client Cloudinary e restituisce `{cloudinary, upload, uploadToCloudinary}`: `upload` è il middleware multer pronto (whitelist MIME, limiti di dimensione/numero file), `uploadToCloudinary` carica un buffer e restituisce `{imageUrl, publicId}`
- `gestioneErroriUpload` — middleware Express per intercettare e tradurre in JSON gli errori di multer

**Autenticazione e sicurezza**
- `hashPassword(password)` — hashing con bcrypt
- `createLoginLimiter(opzioni)` / `createPublicLimiter(opzioni)` — rate limiter pronti per login e per endpoint pubblici

**Validazione**
- `validaStringa`, `validaUrl`, `validaUrlSocial`, `validaPassword`

**Frontend condiviso** (serviti come asset statici da `client/`)
- `escapeHTML` — sanitizzazione HTML, utilizzabile sia lato server (richiesta) sia lato browser (script incluso in pagina)
- `slider.js` — slider immagini riutilizzabile

## Utilizzo

Nel progetto che la installa:

const {createPool, createCloudinary, validaStringa} = require('express-mysql-cloudinary-kit');

const pool = createPool({
    host: process.env.DB_HOST,
    // ...
});

Per gli script frontend (`escapeHTML`, `slider.js`), il progetto ospitante deve servirli come file statici, ad esempio:

app.use('/lib', express.static(
    path.join(path.dirname(require.resolve('express-mysql-cloudinary-kit/package.json')), 'client')
));

## Licenza

Codice pubblicato solo a scopo dimostrativo/portfolio. Tutti i diritti riservati — vedi [LICENSE](./LICENSE).

**Autore:** Francesco Moretti ([@FrancescoMoretti](https://github.com/FrancescoMoretti))