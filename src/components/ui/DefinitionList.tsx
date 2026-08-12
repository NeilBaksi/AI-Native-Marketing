interface DefinitionListProps {
  items: { term: string; body: string }[]
}

export function DefinitionList({ items }: DefinitionListProps) {
  return (
    <dl className="flex flex-col gap-4">
      {items.map((item) => (
        <div key={item.term} className="border-b border-rule pb-4 last:border-0">
          <dt className="font-display text-h4 text-ink">{item.term}</dt>
          <dd className="mt-1 max-w-prose text-base leading-relaxed text-ink-soft">{item.body}</dd>
        </div>
      ))}
    </dl>
  )
}
