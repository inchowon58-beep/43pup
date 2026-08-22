const PLACEHOLDER_COLORS = [
  "#2a201c",
  "#c45c4a",
  "#8a6a58",
  "#4a3832",
  "#d4a090",
  "#3d2c26",
  "#a65d4d",
  "#6b5348",
  "#e8cfc4",
  "#1f1714",
] as const;

export function placeholderColor(index: number): string {
  const n = PLACEHOLDER_COLORS.length;
  const i = ((Math.floor(index) - 1) % n + n) % n;
  return PLACEHOLDER_COLORS[i] ?? PLACEHOLDER_COLORS[0];
}

/** 사진이 준비되기 전, 이미지가 들어갈 자리를 컬러로 채움 */
export default function ImageSlot({
  index = 1,
  className = "",
  fill = false,
  label = "이미지 자리",
}: {
  index?: number;
  className?: string;
  fill?: boolean;
  label?: string;
}) {
  return (
    <div
      className={`${fill ? "absolute inset-0" : "h-full w-full"} ${className}`}
      style={{ backgroundColor: placeholderColor(index) }}
      role="img"
      aria-label={label}
    />
  );
}
