import Image from "next/image";
import { ProductAnimation } from "./ProductAnimation";
import {
  isAnimationVisual,
  type ProductVisual as ProductVisualRecord,
} from "./productVisuals";

type ProductVisualProps = {
  visual: ProductVisualRecord;
  className?: string;
  sizes?: string;
  controlPlacement?: "inside" | "below";
};

export function ProductVisual({
  visual,
  className,
  sizes = "100vw",
  controlPlacement,
}: ProductVisualProps) {
  if (isAnimationVisual(visual)) {
    return (
      <ProductAnimation
        visual={visual}
        className={className}
        controlPlacement={controlPlacement}
      />
    );
  }

  return (
    <Image
      src={visual.src}
      width={visual.width}
      height={visual.height}
      alt={visual.alt}
      sizes={sizes}
      unoptimized
      className={`h-auto w-full object-contain ${className ?? ""}`}
    />
  );
}
