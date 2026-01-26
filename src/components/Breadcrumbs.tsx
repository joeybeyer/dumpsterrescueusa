import Link from "next/link";

type Breadcrumb = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  items: Breadcrumb[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="text-xs text-gray-600">
      {items.map((item, index) => (
        <span key={item.href}>
          <Link href={item.href}>{item.label}</Link>
          {index < items.length - 1 ? " / " : ""}
        </span>
      ))}
    </nav>
  );
}
