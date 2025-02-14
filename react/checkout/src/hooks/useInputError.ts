//@ts-ignore
import { Input } from 'coppelar.components/index'

export const useErrorInput = <T,>(values: T) => {
  const errorType = (key: keyof T, name: Input): Input | 'Required' => {
    const value = values?.[key]
    return typeof value !== 'boolean' && `${value}`.length > 0 ? name : 'Required'
  }

  return { errorType }
}
