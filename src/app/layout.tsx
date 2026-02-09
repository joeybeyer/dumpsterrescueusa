import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
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

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.domain),
  title: {
    default: "Dumpster Rescue LLC | Junk Removal & Demolition",
    template: "%s | Dumpster Rescue LLC"
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
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
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

