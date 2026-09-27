import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anti-Slop Canonical UI",
  description:
    "High-density enterprise analytics workbench engineered with Anti-Slop UI standards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-primary selection:text-primary-contrast">
        {children}
      </body>
    </html>
  );
}
