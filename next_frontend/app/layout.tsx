import "./globals.css";

import { Funnel_Sans } from 'next/font/google'
 
const funnelSans = Funnel_Sans({
  subsets: ['latin'],
})
 
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className={funnelSans.className}>
      <body>{children}</body>
    </html>
  )
}