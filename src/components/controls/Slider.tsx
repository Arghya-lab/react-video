import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  thumbClassName?: string;
  trackClassName?: string;
  rangeClassName?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    { className, thumbClassName, trackClassName, rangeClassName, ...props },
    ref
  ) => (
    <SliderPrimitive.Root ref={ref} className={className} {...props}>
      <SliderPrimitive.Track className={trackClassName}>
        <SliderPrimitive.Range className={rangeClassName} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={thumbClassName} />
    </SliderPrimitive.Root>
  )
);
Slider.displayName = SliderPrimitive.Root.displayName;

export default Slider;
