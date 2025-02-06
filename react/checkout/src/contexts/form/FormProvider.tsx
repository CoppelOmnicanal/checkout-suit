//@ts-ignore
import { Status } from 'coppelar.components/index'
import React, { useContext, useState } from 'react'
import { FormContext, FormContextType } from './FormContext'

// Función para inicializar el estado de status
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

  return (
    <FormContext.Provider
      value={{
        values,
        status,
        onChange: onChange as (name: string | number | symbol, value: string) => void,
        onStatus: onStatus as (name: string | number | symbol, status: Status) => void,
        setValues,
        setStatus,
        form
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
