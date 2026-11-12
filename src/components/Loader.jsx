const bar = "animate-pulse rounded-lg bg-sage/30 dark:bg-sage/15";

export function ProfileSkeleton() {
  return (
    <div className="card p-6" aria-busy="true" aria-label="Loading profile">
      <div className={`${bar} h-28 w-28 rounded-full`} />
      <div className={`${bar} mt-5 h-6 w-2/3`} />
      <div className={`${bar} mt-2 h-4 w-1/3`} />
      <div className={`${bar} mt-6 h-16 w-full`} />
      <div className={`${bar} mt-6 h-14 w-full`} />
    </div>
  );
}

export function RepoSkeletons({ count = 6 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2" aria-busy="true" aria-label="Loading repositories">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card p-5">
          <div className={`${bar} h-5 w-1/2`} />
          <div className={`${bar} mt-4 h-4 w-full`} />
          <div className={`${bar} mt-2 h-4 w-3/4`} />
          <div className={`${bar} mt-6 h-4 w-1/3`} />
        </div>
      ))}
    </div>
  );
}