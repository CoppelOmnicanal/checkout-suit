import { useState } from 'react'

export const useModal = () => {
  const [closing, setClosing] = useState(false)
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
  const onHide = async () => {
    setClosing(true)
    await sleep(200)
    setClosing(false)
  }

  return { closing, onHide }
}
