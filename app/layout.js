import "./globals.css";
import { Space_Grotesk } from "next/font/google";

const Grotesk = Space_Grotesk({
  variable: "--font-Space-Grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "No Copy Left",
  description: "File Sharing for the 21st Century",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${Grotesk.variable} antialiased bg-black `}>
        {children}
      </body>
    </html>
  );
}
