import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import RepoSearchPage from "./pages/RepoSearchPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/repos" element={<RepoSearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="border-t border-ink/10 py-6 text-center text-sm text-ink/60 dark:border-cream/10 dark:text-cream/60">
        Hubfinch uses the public GitHub API and isn't affiliated with GitHub.
      </footer>
    </div>
  );
}
