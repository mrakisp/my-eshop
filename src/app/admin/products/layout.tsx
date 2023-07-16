import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Generated by create next app",
  robots: "none",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
