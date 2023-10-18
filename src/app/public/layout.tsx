
import type { Metadata } from "next";




export const metadata: Metadata = {
  title: "Useless Idea - Polska Korporacja",
  description: "Useless Idea - Eve online corporation",
  keywords: "Eve Online, Korporacja, Rekrutuje, Polska, Pochven, Zarabiać, isk, ISK, poradnik, pomoc, początkujacy, "
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
