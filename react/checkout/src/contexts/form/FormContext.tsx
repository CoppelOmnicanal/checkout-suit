//@ts-ignore
import { Status, Input } from 'coppelar.components/index'
import React, { createContext } from 'react'

export type FormContextType<T> = {
  values: T
  form: T
  status: Record<keyof T, Status>
  onChange: (name: keyof T, value: string) => void
  onStatus: (name: keyof T, status: Status) => void
  setValues: React.Dispatch<React.SetStateAction<T>>
  setStatus: React.Dispatch<React.SetStateAction<Record<keyof T, Status>>>
}

export const FormContext = createContext<FormContextType<any> | undefined>(undefined)
