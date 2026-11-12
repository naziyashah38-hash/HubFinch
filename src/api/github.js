const BASE = "https://api.github.com";
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const REPOS_PER_PAGE = 6;

export class GitHubError extends Error {
  constructor(type, message, details = {}) {
    super(message);
    this.name = "GitHubError";
    this.type = type; // "not_found" | "rate_limit" | "network" | "unknown"
    this.details = details;
  }
}

async function request(path, signal) {
  const headers = { Accept: "application/vnd.github+json" };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  let res;
  try {
    res = await fetch(`${BASE}${path}`, { headers, signal });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new GitHubError("network", "Couldn't reach GitHub. Check your connection and try again.");
  }

  if (res.ok) return res.json();

  if (res.status === 404) {
    throw new GitHubError("not_found", "That user doesn't exist.");
  }

  const remaining = res.headers.get("x-ratelimit-remaining");
  if (res.status === 429 || (res.status === 403 && remaining === "0")) {
    const reset = Number(res.headers.get("x-ratelimit-reset"));
    throw new GitHubError("rate_limit", "GitHub's request limit has been reached.", {
      resetAt: reset ? new Date(reset * 1000) : null,
      authenticated: Boolean(TOKEN),
    });
  }

  throw new GitHubError("unknown", `GitHub returned an unexpected response (${res.status}).`);
}

export function getUser(username, signal) {
  return request(`/users/${encodeURIComponent(username)}`, signal);
}

export function getRepos(username, page = 1, perPage = REPOS_PER_PAGE, signal) {
  return request(
    `/users/${encodeURIComponent(username)}/repos?per_page=${perPage}&page=${page}&sort=updated`,
    signal
  );
}

export function searchRepos(query, page = 1, perPage = REPOS_PER_PAGE, signal) {
  return request(
    `/search/repositories?q=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`,
    signal
  );
}