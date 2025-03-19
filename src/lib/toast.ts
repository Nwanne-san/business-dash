import { toast as sonnerToast } from "sonner"

type ToastType = "success" | "error" | "info" | "warning"

interface ToastOptions {
  title?: string
  description?: string
  variant?: ToastType
  duration?: number
}

export const toast = {
  success: (options: string | ToastOptions) => {
    if (typeof options === "string") {
      return sonnerToast.success(options)
    }
    return sonnerToast.success(options.title || "", {
      description: options.description,
      duration: options.duration,
    })
  },
  error: (options: string | ToastOptions) => {
    if (typeof options === "string") {
      return sonnerToast.error(options)
    }
    return sonnerToast.error(options.title || "", {
      description: options.description,
      duration: options.duration,
    })
  },
  info: (options: string | ToastOptions) => {
    if (typeof options === "string") {
      return sonnerToast(options)
    }
    return sonnerToast(options.title || "", {
      description: options.description,
      duration: options.duration,
    })
  },
  warning: (options: string | ToastOptions) => {
    if (typeof options === "string") {
      return sonnerToast.warning(options)
    }
    return sonnerToast.warning(options.title || "", {
      description: options.description,
      duration: options.duration,
    })
  },
  custom: (options: ToastOptions) => {
    return sonnerToast(options.title || "", {
      description: options.description,
      duration: options.duration,
    })
  },
}

