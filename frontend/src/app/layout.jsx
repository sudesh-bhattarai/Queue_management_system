
import "./globals.css";

export const metadata = {
  title: "Smart Fuel Queue",
  description: "LPG queue and distribution management dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
