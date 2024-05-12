'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

export const Alert = () => {
  const [showAlert, setShowAlert] = useState(true)
  function closeAlert() {
    setShowAlert(false)
  }
  if (!showAlert) {
    return null
  }
  return (
    <div
      className={`absolute  left-20 top-4 z-[999] max-w-60 flex-col items-center gap-2 rounded-md bg-primary  p-4 text-justify text-background dark:text-foreground`}
    >
      <button className="absolute right-2 top-2" onClick={() => closeAlert()}>
        <X />
      </button>
      <h2 className="text-center text-lg font-semibold">Atenção</h2>
      <span>
        Apesar de não sermos a fonte oficial da prefeitura de Rio grande, iremos
        continuar mantendo atualizadas as informações. Para o canal oficial acesse {' '}
        <a
          target="_blank"
          className="w-full text-center !text-background underline hover:text-accent dark:text-foreground dark:hover:text-accent"
          href="https://abrigars.com.br"
        >
          abrigars.com.br
        </a>
      </span>
    </div>
  )
}
