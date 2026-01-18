const ImagePlaceholder = ({
  label,
  className = "",
  imageSrc,
}: {
  label: string;
  className?: string;
  imageSrc?: string;
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={label}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full min-h-[220px] items-center justify-center rounded-2xl border border-espresso/15 bg-rose/40 px-6 py-10 text-center text-sm uppercase tracking-[0.25em] text-espresso/60">
          {label}
        </div>
      )}
    </div>
  );
};

export default ImagePlaceholder;
