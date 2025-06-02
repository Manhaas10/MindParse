// components/ui/toast.tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useToast } from "./use-toast"

const Toast = ({
  title,
  description,
  action,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white shadow-lg rounded-lg p-4 w-full max-w-sm border border-zinc-200 dark:border-zinc-800 flex items-start justify-between space-x-4 animate-in slide-in-from-bottom-5 fade-in",
      )}
    >
      <div className="flex-1">
        {title && <p className="text-sm font-medium">{title}</p>}
        {description && <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}
        {action}
      </div>
      <button
        onClick={() => props.onOpenChange(false)}
        className="ml-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) =>
        toast.open ? (
          <Toast
            key={toast.id}
            {...toast}
            onOpenChange={(open) => {
              toast.onOpenChange?.(open)
            }}
          />
        ) : null
      )}
    </div>
  )
}
