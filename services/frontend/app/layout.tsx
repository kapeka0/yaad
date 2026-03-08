import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "YAAD ",
  description: "Bug bounty asset database",
  icons: {
    icon: "/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-mono antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Navbar />
          <main className="container mx-auto px-4 py-6 max-w-7xl">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
