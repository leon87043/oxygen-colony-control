import type { Metadata } from "next";
import { Noto_Sans_TC, Space_Mono } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_TC({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700", "900"] });
const mono = Space_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "缺氧 Oxygen Not Included｜設計生存",
  description: "深入《缺氧》的太空殖民世界，探索氧氣、熱能、電力與食物構成的精密生存系統。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
