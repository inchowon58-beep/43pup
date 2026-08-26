import Image from "next/image";

export default function CatteryPhoto({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "(max-width:768px) 100vw, 720px",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      priority={priority}
      className={`object-cover ${className}`}
      sizes={sizes}
    />
  );
}
