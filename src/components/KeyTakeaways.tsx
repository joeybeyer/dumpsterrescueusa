type KeyTakeawaysProps = {
  title: string;
  bullets: string[];
};

export default function KeyTakeaways({ title, bullets }: KeyTakeawaysProps) {
  return (
    <section className="rounded-xl border-l-4 border-green-600 bg-gray-50 p-4 shadow-lg">
      <p className="text-xs font-bold uppercase tracking-wide text-green-600">
        Key Takeaways
      </p>
      <h2 className="mt-2 text-xl font-bold text-gray-900">{title}</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </section>
  );
}
