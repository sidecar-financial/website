export function shouldPauseAnimation(
  playing: boolean,
  inView: boolean,
  tabHidden: boolean,
) {
  return !playing || !inView || tabHidden;
}
