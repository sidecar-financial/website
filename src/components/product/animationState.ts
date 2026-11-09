export function shouldPauseAnimation(
  playing: boolean,
  inView: boolean | null,
  tabHidden: boolean | null,
) {
  return !playing || inView !== true || tabHidden !== false;
}
