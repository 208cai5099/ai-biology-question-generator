import "./globals.css";

import { Funnel_Sans } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const funnelSans = Funnel_Sans({
  subsets: ['latin'],
})
 
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={funnelSans.className}>
      <body>{children}</body>
    </html>
  )
}