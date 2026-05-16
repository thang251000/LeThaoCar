type SectionSkeletonProps = {
  dense?: boolean
}

export function SectionSkeleton({ dense = false }: SectionSkeletonProps) {
  return (
    <section className={`section-padding ${dense ? 'pt-10' : ''}`}>
      <div className="section-shell">
        <div className="soft-card animate-pulse overflow-hidden p-6 sm:p-8">
          <div className="h-3 w-40 rounded-full bg-[var(--surface-muted)]" />
          <div className="mt-5 h-12 w-full max-w-2xl rounded-[1rem] bg-[var(--surface-muted)]" />
          <div className="mt-4 h-5 w-full max-w-3xl rounded-full bg-[var(--surface-muted)]" />
          <div className="mt-2 h-5 w-4/5 rounded-full bg-[var(--surface-muted)]" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {Array.from({ length: dense ? 2 : 3 }).map((_, index) => (
              <div
                key={index}
                className="h-40 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-muted)]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
