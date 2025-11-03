
# Weather Data Fetcher (React + Vite)

A compact, premium-styled React front-end that fetches weather data from an API Gateway → Lambda backend. Built with Vite and Tailwind classes; includes quick city shortcuts, recent searches, and a polished UI.

This README explains how to run the app locally, configure the API endpoint securely (in a local `.env`).

## Features

- Search weather by city (manual input)
- Quick city buttons for one-click checks (New York, London, Tokyo, etc.)
- Recent searches persisted to session storage
- Premium UI with gradients, blur, and animated accents
- Environment-driven API URL (hide your Lambda URL in `.env`)

## Prerequisites

- Node.js (16+ recommended)
- npm (or pnpm/yarn if you prefer)

## Setup (local)

1. Install dependencies

```powershell
cd d:\\aws-project\\weather-data-fetcher
npm install
```

2. Configure the weather API URL (required)

- Copy the example env file and edit it:

```powershell
copy .env.example .env
# then open .env and replace the placeholder with your real URL
```

- In `.env` set the Vite variable VITE_WEATHER_API_URL to your API Gateway URL. Example:

```
VITE_WEATHER_API_URL=https://your-api-gateway-id.execute-api.us-east-1.amazonaws.com/weather
```

Notes:
- `.env` is ignored by Git (already added to `.gitignore`) so your URL won't be committed.
- Vite embeds these env values at build time; the value will be visible in the built client code. If you need to fully hide the backend, proxy requests via a server-side component instead.

3. Run the dev server

```powershell
npm run dev
```

Open the URL shown by Vite (usually http://localhost:5173).

## Build for production

```powershell
npm run build
npm run preview
```

## Where the API URL is used

- The front-end reads the API URL from `import.meta.env.VITE_WEATHER_API_URL` (see `src/App.jsx`).
- If the env variable is missing the app shows a runtime error in the console describing the problem.


## Security notes

- Client-side JS necessarily exposes the endpoints it calls. Use backend-side protections on your Lambda/API Gateway as needed:
	- API keys, rate-limiting, CORS restrictions, or signed requests
	- Use a server-side proxy for sensitive operations if you must fully conceal endpoints

## Troubleshooting

- "Requests failing / API url not configured" — ensure `.env` contains `VITE_WEATHER_API_URL` and restart the dev server.
- "Styles not applied" — ensure `src/App.css` is imported in `src/main.jsx` (this project imports it by default).
- If you see build or lint errors, run `npm run lint` and fix reported issues or share the error output here.

## Next improvements (optional)

- Add a small server-side proxy for API requests (Express/Serverless) to limit exposure of the Lambda URL.
- Add unit tests for key components and a couple of UI snapshot tests.
- Provide multiple favicon sizes and metadata for PWA support.

If you'd like, I can also add a small README section that explains how to deploy the built app to a static host (Netlify, Vercel, S3 + CloudFront) and how to secure the API Gateway. Which would you prefer?

