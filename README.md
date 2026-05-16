# Le Thao Lai Xe

Premium bilingual landing page for an independent private chauffeur service in Vietnam, built with React, Vite, Tailwind CSS, Framer Motion, Firebase, and Firestore.

## Highlights

- Premium personal-driver positioning, not a taxi or ride-hailing UI
- Vietnamese and English content
- Light and dark theme toggle
- Mobile-first layout with a sticky mobile CTA bar
- Firestore-powered booking form with validation, loading, and success states
- Interactive pricing calculator with manual kilometer slider and optional SerpApi-powered route lookup
- SEO metadata and structured data
- Lazy-loaded sections and manual Vite chunk splitting for faster initial load

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion
- Firestore
- Lucide React

## Folder structure

```text
.
├─ public/
│  ├─ favicon.svg
│  └─ images/
├─ src/
│  ├─ app/
│  ├─ components/
│  │  ├─ layout/
│  │  ├─ sections/
│  │  ├─ seo/
│  │  └─ ui/
│  ├─ data/
│  ├─ lib/
│  ├─ services/
│  ├─ types/
│  ├─ utils/
│  ├─ main.tsx
│  └─ styles.css
├─ .env.example
├─ firebase.json
├─ firestore.indexes.json
├─ firestore.rules
└─ vite.config.ts
```

## Local development

1. Install dependencies:

```bash
npm install
```

2. Create your local environment file in PowerShell:

```powershell
Copy-Item .env.example .env.local
```

3. Start the dev server:

```bash
npm run dev
```

4. Create a production build:

```bash
npm run build
```

## Environment variables

The frontend reads the Firebase variables through Vite, while SerpApi is now proxied server-side:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
SERPAPI_API_KEY=
```

## Optional address lookup and route distance

The pricing section works in two modes:

- Manual mode: always available, with editable base fare, per-km rate, kilometer input, and slider
- Assisted mode: enabled when `SERPAPI_API_KEY` is available on the server

With that key in place, the pricing calculator can:

- Suggest pickup and destination addresses
- Resolve route distance in kilometers
- Recalculate the estimate using your editable pricing inputs

## SerpApi proxy notes

- Local development uses a Vite middleware proxy at `/api/serpapi/*`
- Firebase Hosting rewrites `/api/serpapi/*` to the `serpApiProxy` Cloud Function
- Before deploying Functions, set the secret with:

```bash
firebase functions:secrets:set SERPAPI_API_KEY
```

## Firestore collection structure

Collection: `bookings`

Each document stores:

```json
{
  "name": "Nguyen Minh Anh",
  "phone": "0909686879",
  "pickup": "Thao Dien, District 2",
  "destination": "Tan Son Nhat Airport",
  "tripDateTime": "2026-05-20T08:00",
  "notes": "2 suitcases, elderly passenger",
  "locale": "vi",
  "status": "new",
  "source": "landing-page",
  "vehicle": "VinFast Limo Green 7-seat",
  "createdAt": "server timestamp"
}
```

## Firestore security rules

- `read` is disabled for the `bookings` collection
- `create` is allowed only for validated booking payloads
- `update` and `delete` are disabled

Rules live in [firestore.rules](/d:/250689_Thang/Car/firestore.rules:1).

## Firebase deploy instructions

1. Install Firebase CLI if needed:

```bash
npm install -g firebase-tools
```

2. Login:

```bash
firebase login
```

3. Build the site:

```bash
npm run build
```

4. Deploy Hosting + Firestore config:

```bash
firebase deploy
```

5. If you want Hosting only:

```bash
firebase deploy --only hosting
```

6. If you want Firestore rules only:

```bash
firebase deploy --only firestore:rules
```

## Content and contact updates

- Main bilingual copy lives in [src/data/siteContent.ts](/d:/250689_Thang/Car/src/data/siteContent.ts:1)
- Contact links and vehicle gallery also live in that file
- If the real phone, Zalo, Facebook, or service area differ, update them there first

## Notes

- The current content assumes Ho Chi Minh City, Tan Son Nhat Airport, and nearby provinces as the main service area
- The current contact details are centralized in config so they can be replaced quickly if needed
