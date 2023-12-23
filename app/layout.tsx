import { ClerkProvider } from '@clerk/nextjs'


import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { ThemeProvider } from '@/components/themeprovider'
import toast, { Toaster } from 'react-hot-toast';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dropbox Clone',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>

    <html lang="en">

      <body className={inter.className}>
        <ThemeProvider attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange>

    <Header/>

        {children}
        <Toaster/>

        </ThemeProvider>

        </body>
    </html>
    </ClerkProvider>

  )
}
