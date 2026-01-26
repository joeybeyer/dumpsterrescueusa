import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CallBar from "@/components/CallBar";
import StickyCallButton from "@/components/StickyCallButton";
import FooterConversionBand from "@/components/FooterConversionBand";
import Footer from "@/components/Footer";
import { brand } from "@/data/brand";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.domain),
  title: {
    default: "Dumpster Rescue USA | Junk Removal & Demolition",
    template: "%s | Dumpster Rescue USA"
  },
  description:
    "Fast, professional junk removal, light demolition, and dumpster rental across Chicagoland suburbs.",
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <CallBar />
        <main>{children}</main>
        <StickyCallButton />
        <FooterConversionBand />
        <Footer />
      </body>
    </html>
  );
}
