//@ts-ignore
import { Status } from 'coppelar.components/index'
import { useEffect, useState } from 'react'

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
    console.log('🚀 ~ onStatus ~ status:', status)
    console.log('🚀 ~ onStatus ~ name:', name)
    setStatus((prev) => ({
      ...prev,
      [name]: status,
    }))
  }

  useEffect(() => {
    console.log('🚀 ~ useForm ~ status:', status)
  }, [status])

  return { onChange, values, onStatus, status }
}
