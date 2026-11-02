export default function manifest() {
  return {
    name: "Starlight Vanta",
    short_name: "Vanta",
    description: "A username generator that runs entirely in your browser.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
