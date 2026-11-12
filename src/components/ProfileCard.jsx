import { Building2, Calendar, ExternalLink, Link as LinkIcon, MapPin } from "lucide-react";
import { formatCount, formatDate } from "../utils/format";

export default function ProfileCard({ user }) {
  const blog = user.blog && (user.blog.startsWith("http") ? user.blog : `https://${user.blog}`);

  return (
    <aside className="card overflow-hidden">
      <div className="bg-sage/35 px-6 pb-6 pt-8 dark:bg-sage/15">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          width={112}
          height={112}
          className="h-28 w-28 rounded-full border-4 border-cream object-cover dark:border-ink-soft"
        />
        <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight">
          {user.name || user.login}
        </h1>
        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-flex items-center gap-1 font-medium text-ink/70 hover:text-ember dark:text-cream/70 dark:hover:text-ember"
        >
          @{user.login} <ExternalLink size={14} aria-hidden />
        </a>
        {user.bio && <p className="mt-4 leading-relaxed">{user.bio}</p>}
      </div>

      <dl className="grid grid-cols-3 divide-x divide-ink/10 border-y border-ink/10 text-center dark:divide-cream/10 dark:border-cream/10">
        <Stat label="Repos" value={user.public_repos} />
        <Stat label="Followers" value={user.followers} />
        <Stat label="Following" value={user.following} />
      </dl>

      <ul className="space-y-3 p-6 text-sm">
        {user.company && <Detail icon={Building2}>{user.company}</Detail>}
        {user.location && <Detail icon={MapPin}>{user.location}</Detail>}
        {blog && (
          <Detail icon={LinkIcon}>
            <a href={blog} target="_blank" rel="noreferrer" className="break-all hover:text-ember">
              {user.blog}
            </a>
          </Detail>
        )}
        <Detail icon={Calendar}>Joined {formatDate(user.created_at)}</Detail>
      </ul>
    </aside>
  );
}

function Stat({ label, value }) {
  return (
    <div className="py-4">
      <dd className="font-display text-2xl font-extrabold">{formatCount(value)}</dd>
      <dt className="text-xs text-ink/60 dark:text-cream/60">{label}</dt>
    </div>
  );
}

function Detail({ icon: Icon, children }) {
  return (
    <li className="flex items-start gap-3">
      <Icon size={16} className="mt-0.5 shrink-0 text-sage-dark" aria-hidden />
      <span>{children}</span>
    </li>
  );
}