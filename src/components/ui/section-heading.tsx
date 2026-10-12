export function SectionHeading({ number, label, title }: { number: string; label: string; title: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow"><span className="section-number">{number}</span>{label}</p>
      <h2>{title}</h2>
    </div>
  );
}
