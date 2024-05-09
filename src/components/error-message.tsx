import { ErrorMessage as Error } from '@hookform/error-message'
import { FieldErrors } from 'react-hook-form'

import { cn } from '@/lib/utils'
interface ErrorMessageProps {
  errors: FieldErrors
  name: string
  className?: string
}
export function ErrorMessage({ errors, name, className }: ErrorMessageProps) {
  return (
    <Error
      errors={errors}
      name={name}
      render={({ message }: { message: string }) => (
        <p className={cn('text-sm text-destructive', className)}>{message}</p>
      )}
    />
  )
}
