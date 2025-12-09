import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";

export const metadata: Metadata = {
  title: "Shower Thoughts",
  description: "Share your random shower thoughts with the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans" style={{ backgroundColor: 'var(--color-background)' }}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
