# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## TheSportsDB live scores

The homepage "Jogos de hoje e próximos eventos" widget reads from the internal Netlify Function at `/api/live-scores`, which redirects to `/.netlify/functions/live-scores`.

To enable real data:

1. Create or access a TheSportsDB account.
2. Get the API key from the user profile page. Premium accounts can use the v2 livescore endpoint.
3. Configure the Netlify environment variable:
   `THESPORTSDB_API_KEY=your_api_key_here`
4. Deploy the site.

The function first tries TheSportsDB v2 soccer livescores (`/api/v2/json/livescore/soccer`) with `X-API-KEY`. If livescores are unavailable for the account, it falls back to the v1 schedule endpoints: `eventsday.php` for today's soccer matches and `eventsnextleague.php` for selected priority leagues when needed.

Responses use `Cache-Control: public, max-age=300, s-maxage=900` to cache browser responses for 5 minutes and CDN responses for 15 minutes. If the API key is missing, the upstream API fails, or no relevant matches are returned, the homepage keeps rendering and shows an empty or fallback state without exposing the API key.

## Monitoramento de tráfego do ChatGPT Search

Para acompanhar visitas vindas do ChatGPT Search:

- Verifique no Google Analytics sessões com `utm_source=chatgpt.com`.
- Revise logs e referrers para entradas de `chatgpt.com`.
- Monitore quais páginas recebem mais visitas com esse referenciador.
- Mantenha o `OAI-SearchBot` liberado no `robots.txt`.

## AI/GEO

- `/llms.txt` fornece um resumo em Markdown das páginas principais do CalculaBet para sistemas de IA.
- `/robots.txt` mantém OAI-SearchBot liberado.
- `/sitemap.xml` lista as URLs indexáveis.
