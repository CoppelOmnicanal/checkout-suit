//@ts-ignore
import { Status, Input } from 'coppelar.components/index'
import { useState } from 'react'

interface UseForm<T extends Record<string, string | number | boolean>> {
  form: T
}

export const useForm = <T extends Record<string, any>>({ form }: UseForm<T>) => {
  const [values, setValues] = useState<T>(form)
  const [status, setStatus] = useState<Record<keyof T, Status>>(() =>
    Object.keys(form).reduce(
      (acc, key) => {
        acc[key as keyof T] = Status.NORMAL
        return acc
      },
      {} as Record<keyof T, boolean>,
    ),
  )

  const onChange = (name: keyof T, value: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onStatus = (name: keyof T, status: Status) => {
    setStatus((prev) => ({
      ...prev,
      [name]: status,
    }))
  }

  const errorType = (key: keyof T, name: Input) => {
    const value = values?.[key]
    return typeof value !== 'boolean' && `${value}`.length > 0 ? name : 'Required'
  }

  return { onChange, values, onStatus, errorType, status }
}
