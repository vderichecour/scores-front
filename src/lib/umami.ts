declare global {
  interface Window {
    umami?: {
      track: (
        event: string,
        data?: Record<string, string | number | boolean>,
      ) => void;
    };
  }
}

export function trackScoreDownload(score: { id: string; title: string }) {
  window.umami?.track("score-download", {
    slug: score.id,
    title: score.title,
  });
}
