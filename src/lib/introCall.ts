export const INTRO_CALL_URL = 'https://cal.com/heydots/30min';

/** Opens the HeyDots intro-call booking page in a new tab. */
export function openIntroCallWindow(): void {
  const popup = window.open(INTRO_CALL_URL, '_blank', 'noopener,noreferrer');
  if (popup) popup.opener = null;
}
