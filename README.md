Hubfinch · GitHub profile finder

React + Vite + TailwindCSS + React Router + the public GitHub API.

Palette: sage 
#9CAF88 · cream 
#F7F5EF · ember 
#E8412C

Build it step by step

Each step is one file (or a few). Build in this order and the app works after every step.

#	Step	Files
1	Scaffold: npm create vite@latest hubfinch -- --template react, then npm i react-router-dom lucide-react and npm i -D tailwindcss@3 postcss autoprefixer	package.json, vite.config.js, postcss.config.js
2	Tailwind + brand colors + dark mode (darkMode: "class")	tailwind.config.js, src/index.css
3	Identity: favicon, fonts, no-flash theme script	public/favicon.svg, index.html
4	API layer with one error type (not_found, rate_limit, network)	src/api/github.js
5	Helpers: number/date formatting, username validation, recent searches	src/utils/*
6	Dark/light logic (useTheme) and its button (ThemeToggle)	src/hooks/useTheme.js, components/ThemeToggle.jsx
7	Logo mark	components/FinchMark.jsx
8	Search: SearchBar validates and navigates to /user/:username	components/SearchBar.jsx
9	Layout: Navbar + App routes + main.jsx (BrowserRouter)	components/Navbar.jsx, App.jsx, main.jsx
10	Home page	pages/Home.jsx
11	Profile: avatar, bio, followers, location, join date	components/ProfileCard.jsx
12	Repos: card, list, pagination	components/RepoCard.jsx, RepoList.jsx, Pagination.jsx
13	Loading + error UI (rate limit shows the reset time)	components/Loader.jsx, ErrorMessage.jsx
14	Wire it together: fetch profile + paged repos, ?page= in the URL	pages/UserPage.jsx, pages/NotFound.jsx
How the main pieces work
Rate limits. request() in api/github.js checks for HTTP 403 with x-ratelimit-remaining: 0 (or 429), reads x-ratelimit-reset, and throws a GitHubError("rate_limit") that carries the reset time. ErrorMessage turns it into "The limit resets at 3:42 PM".
Pagination. /users/:u/repos?per_page=6&page=N. Total pages = ceil(public_repos / 6), taken from the profile. The page number lives in the URL (?page=3), so refresh and back/forward work.
Dark mode. The dark class on <html> switches every dark: style. A tiny script in index.html applies the saved choice before React loads, so there's no white flash.
Cancelled requests. Every fetch gets an AbortController, so quickly switching users never shows stale data.