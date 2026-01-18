const BulletList = ({ items }: { items: string[] }) => {
  return (
    <ul className="space-y-3 text-base text-espresso/80">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-champagne" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default BulletList;
