import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { Header } from '@/components/header'
import { cn } from '@/lib/utils'
import { Providers } from '@/providers'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Ajuda Rio Grande ',
  description:
    'Sistemas de assistência social do município de Rio Grande com foco em calamidades (enchentes).',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers>
          <div className="flex h-screen w-full flex-col">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
