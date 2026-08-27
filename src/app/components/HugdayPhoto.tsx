import Image from "next/image";

export default function HugdayPhoto({
  src,
  alt,
  priority = false,
  sizes = "100vw",
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`hug-photo ${className}`.trim()}
    />
  );
}
