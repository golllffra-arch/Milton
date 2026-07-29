// If your project uses the app/ router, import the component in app/layout.tsx
import "./globals.css";
import AnimeBackground from "../components/AnimeBackground";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Put the animated background once at top-level */}
        <AnimeBackground />
        <div id="content">
          {children}
        </div>
      </body>
    </html>
  );
}