export default function SquareGrid({
  items,
}: {
  items: { key: string | number; item: ReactNode }[];
}) {
  return (
    <div className="grid gap-2 [grid-template-columns:repeat(auto-fit,_minmax(150px,_1fr))] auto-rows-[1fr]">
      {items.map(({ key, item }) => (
        <div key={key} className="aspect-square w-full min-w-32 max-w-48">
          {item}
        </div>
      ))}
    </div>
  );
}
