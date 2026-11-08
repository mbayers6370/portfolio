// Adapted from Margin Editorial Geometry (CC0); only the icons used here.
import type { ReactNode, SVGProps } from "react";

/** Decorative by default. Supply title or aria-label for a meaningful image. */
export interface IconProps extends Omit<
  SVGProps<SVGSVGElement>,
  "children" | "title" | "dangerouslySetInnerHTML"
> {
  size?: number | string;
  title?: string;
}
export interface AnimatedIconProps extends IconProps {
  /** Defaults to false for event icons; true for OnRepeatAnimated. */
  animate?: boolean;
  /** Resets to the static resting glyph. */
  paused?: boolean;
}
function renderIcon(
  nodes: ReactNode,
  props: IconProps,
  motion?: { animate: boolean; paused: boolean },
) {
  const {
    size = 24,
    title,
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": labelledBy,
    "aria-hidden": hidden,
    role,
    ...rest
  } = props;
  const label = ariaLabel || title;
  const meaningful = Boolean(label || labelledBy);
  const isHidden = hidden ?? !meaningful;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
      className={["margin-icon", className].filter(Boolean).join(" ")}
      role={
        isHidden === true || isHidden === "true" ? undefined : role || "img"
      }
      aria-hidden={isHidden}
      aria-label={label}
      aria-labelledby={labelledBy}
      focusable="false"
      data-animate={motion ? String(motion.animate) : undefined}
      data-paused={motion ? String(motion.paused) : undefined}
    >
      {title ? <title>{title}</title> : null}
      {nodes}
    </svg>
  );
}


export function OnRepeatAnimated({
  animate = true,
  paused = false,
  ...props
}: AnimatedIconProps) {
  return renderIcon(
    <>
      <g className="margin-eq-bar margin-eq-bar-1">
        <path d="M5 9 V15" />
      </g>
      <g className="margin-eq-bar margin-eq-bar-2">
        <path d="M9.7 5 V19" />
      </g>
      <g className="margin-eq-bar margin-eq-bar-3">
        <path d="M14.3 7 V17" />
      </g>
      <g className="margin-eq-bar margin-eq-bar-4">
        <path d="M19 8.5 V15.5" />
      </g>
    </>,
    props,
    { animate, paused },
  );
}

export function HeartAnimated({
  animate = false,
  paused = false,
  ...props
}: AnimatedIconProps) {
  return renderIcon(
    <>
      <g className="margin-pulse">
        <path d="M12 20 C10.8 19.4 4 15.1 3.5 10.1 C3 5.2 9.1 3.4 12 7.3 C14.9 3.4 21 5.2 20.5 10.1 C20 15.1 13.2 19.4 12 20 Z" />
      </g>
    </>,
    props,
    { animate, paused },
  );
}

export function GalleryAnimated({
  animate = false,
  paused = false,
  ...props
}: AnimatedIconProps) {
  return renderIcon(
    <>
      <g className="margin-aperture">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M6.536 5.489 L11.017 7.876 Q12.000 8.400 12.561 8.724 L15.118 10.200" />
        <path d="M14.907 4.013 L15.080 9.086 Q15.118 10.200 15.118 10.848 L15.118 13.800" />
        <path d="M20.371 10.524 L16.063 13.210 Q15.118 13.800 14.557 14.124 L12.000 15.600" />
        <path d="M17.464 18.511 L12.983 16.124 Q12.000 15.600 11.439 15.276 L8.882 13.800" />
        <path d="M9.093 19.987 L8.920 14.914 Q8.882 13.800 8.882 13.152 L8.882 10.200" />
        <path d="M3.629 13.476 L7.937 10.790 Q8.882 10.200 9.443 9.876 L12.000 8.400" />
      </g>
    </>,
    props,
    { animate, paused },
  );
}

function friendsDrawing() {
  return (
    <g fill="currentColor" stroke="none">
      <circle cx="8.05" cy="7.15" r="2.45" />
      <circle cx="16.05" cy="8.1" r="2.35" />
      <path d="M3.2 19.1 V17.3 C3.2 14.5 5.3 12.7 8.05 12.7 C10.2 12.7 11.35 13.75 12.45 14.65 C13.5 13.85 14.65 13.5 16.05 13.5 C18.8 13.5 20.8 15.4 20.8 18.15 V19.5 Q20.8 20.1 20.2 20.1 H3.8 Q3.2 20.1 3.2 19.1 Z" />
    </g>
  );
}

export function Friends(props: IconProps) {
  return renderIcon(friendsDrawing(), props);
}

export function SpacesAnimated({
  animate = false,
  paused = false,
  ...props
}: AnimatedIconProps) {
  return renderIcon(
    <>
      <g className="margin-space-left">
        <rect x="3.5" y="6" width="11" height="14" rx="4.5" />
      </g>
      <g className="margin-space-right">
        <rect x="9.5" y="3.5" width="11" height="14" rx="4.5" />
      </g>
    </>,
    props,
    { animate, paused },
  );
}
