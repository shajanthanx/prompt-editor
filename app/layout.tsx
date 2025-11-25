import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prompter - AI Prompt Crafting Studio",
  description: "Design, edit, and refine AI prompts with ease. A powerful editor for crafting better prompts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
