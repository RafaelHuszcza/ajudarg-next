import type { Metadata } from 'next'

import { MainSidebar } from '@/components/main-sidebar'

export const metadata: Metadata = {
  title: 'Configurações do sistema',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex w-full flex-1 ">
      <MainSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
