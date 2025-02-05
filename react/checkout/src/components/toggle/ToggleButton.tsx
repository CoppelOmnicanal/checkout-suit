import React from 'react'
import styles from './toggle.module.css'

interface ToggleButtonProps {
  onChange: (active: boolean) => void
  checked?: boolean
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({ onChange, checked = false }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.checked)

  return (
    <label className={styles.switch}>
      <input onChange={handleChange} type="checkbox" checked={checked} />
      <span className={styles.slider}></span>
    </label>
  )
}
