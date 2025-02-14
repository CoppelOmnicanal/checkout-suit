//@ts-ignore
import { Status } from 'coppelar.components/index'
import React, { useContext, useState } from 'react'
import { FormContext, FormContextType } from './FormContext'

const initializeStatus = <T extends Record<string, any>>(form: T): Record<keyof T, Status> => {
  return Object.keys(form).reduce(
    (acc, key) => {
      acc[key as keyof T] = Status.NORMAL
      return acc
    },
    {} as Record<keyof T, Status>,
  )
}

export const FormProvider = <T extends Record<string, any>>({ children, form }: { children: React.ReactNode; form: T }) => {
  const [values, setValues] = useState<T>(form)
  const [status, setStatus] = useState<Record<keyof T, Status>>(initializeStatus(form))
  const [loadingForm, setLoadingForm] = useState<boolean>(false)

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

  const invalidate = () => {
    const invalid = Object.entries(values).reduce(
      (acc, current) => {
        const key = current[0] as keyof T
        const { INVALID, NORMAL } = Status

        acc[key] = status[key] === NORMAL ? INVALID : status[key]
        return acc
      },
      {} as Record<keyof T, Status>,
    )

    setStatus((prev) => ({
      ...prev,
      ...invalid,
    }))
  }

  const validate = () => {
    const isValid = Object.values(status).every((status) => status === Status.VALID)
    if (!isValid) {
      invalidate()
    }

    return isValid
  }

  return (
    <FormContext.Provider
      value={{
        values,
        status,
        onChange: onChange as (name: string | number | symbol, value: string) => void,
        onStatus: onStatus as (name: string | number | symbol, status: Status) => void,
        setValues,
        setStatus,
        form,
        setLoadingForm,
        loadingForm,
        invalidate,
        validate
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useFormProvider<T>() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context as FormContextType<T>
}
