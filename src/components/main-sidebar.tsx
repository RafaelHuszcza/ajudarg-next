'use client'

import { MenuIcon, Store } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export function MainSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const isActive = (path: string) => {
    return pathname === path
  }
  const links = [
    {
      href: '/configuracoes/locais',
      label: 'Meus Locais',
      icon: <Store />,
    },
  ]

  //   {
  //     key: 'relatorios',
  //     icon: <PieChartOutlined />,
  //     label: 'Relatórios',
  //   },
  //   {
  //     key: 'ferramentas',
  //     icon: <ToolOutlined />,
  //     label: 'Ferramentas',
  //   },
  //   {
  //     key: 'usuarios',
  //     icon: <TeamOutlined />,
  //     label: 'Usuários',
  //   },
  //   {
  //     key: 'salas',
  //     icon: <DesktopOutlined />,
  //     label: 'Salas',
  //   },
  //   {
  //     key: 'banco',
  //     icon: <DatabaseOutlined />,
  //     label: 'Banco de dados',
  //   },
  //   {
  //     key: 'movimentar',
  //     icon: <SwapOutlined />,
  //     label: 'Forçar movimentação',
  //   },
  // ];
  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev)
  }
  return (
    <aside
      className={cn(
        'flex w-64 flex-col border-r border-primary bg-background duration-500',
        collapsed ? 'w-16' : 'w-72',
      )}
    >
      <header
        className={cn(
          'flex items-center justify-end',
          collapsed ? 'justify-center' : 'justify-end',
        )}
      >
        <Button variant="ghost" className="" onClick={toggleCollapsed}>
          <MenuIcon />
        </Button>
      </header>
      <main className="flex flex-grow flex-col p-3">
        <nav className="flex flex-col gap-1">
          {links.map((link, i) => (
            <TooltipProvider key={link.href} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    asChild
                    className={cn([
                      'flex  justify-start gap-4 rounded-md p-2 text-sm font-medium',
                      isActive(link.href) &&
                        'bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground',
                    ])}
                  >
                    <Link href={link.href}>
                      <div>{link.icon}</div>
                      <h2
                        style={{
                          transitionDelay: collapsed ? `${i + 3}00ms` : '0ms',
                        }}
                        className={cn(
                          'whitespace-pre',
                          collapsed
                            ? ' translate-x-28 overflow-hidden opacity-0 duration-500'
                            : '',
                        )}
                      >
                        {link.label}
                      </h2>
                    </Link>
                  </Button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" sideOffset={20}>
                    <p> {link.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </main>
    </aside>
  )
}
