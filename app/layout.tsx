import type { Metadata } from "next";
import { Geist, Geist_Mono, Google_Sans, Instrument_Sans, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MCAuth",
  description: "what here",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable} ${instrumentSans.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster
            position={"bottom-right"}
            toastOptions={{
              duration: 4000,
              className: "border border-[#2e2e2e]",
              style: {
                background: "#1a1a1a",
                color: "#fff",
                borderRadius: "10px",
                padding: "12px 16px",
              },
              success: {
                duration: 3000,
                iconTheme: { primary: "#22c55e", secondary: "#fff" },
              },
              error: {
                duration: 6000,
                iconTheme: { primary: "#dc2626", secondary: "#fff" },
              },
            }}
        />
      </body>
    </html>
  );
}
