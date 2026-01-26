type FAQ = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQ[];
};

export default function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="rounded-xl border border-gray-200 bg-white px-5 py-4"
        >
          <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-gray-900">
            {item.question}
          </summary>
          <p className="mt-3 text-sm text-gray-900">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
