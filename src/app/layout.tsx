import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/platform/theme/themeProvider";
import ThemeDataProvider from "@/components/platform/theme/themedataProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "APIHooX | Connect, Automate, Integrate",
  description: "APIHooX is a low code workflow builder platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeDataProvider>
            <Toaster />
            {children}
          </ThemeDataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
