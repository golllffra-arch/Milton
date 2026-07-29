// If your project uses pages/ router, modify pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";
import AnimeBackground from "../components/AnimeBackground";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AnimeBackground />
      <Component {...pageProps} />
    </>
  );
}