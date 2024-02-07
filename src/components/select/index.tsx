import { useMemo, useState } from 'react'
import { MenuItem, SelectProps, Select as MuiSelect } from '@mui/material'
import styles from '../select/Select.module.scss'
import DownArrowIcon from '../svgImages/DownArrow'

interface ISelectProps extends SelectProps {
  value: any
  options: any[]
  onChange: (args: any) => void
  labelText?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  helperText?: string
}

const Select: React.FC<ISelectProps> = ({
  value,
  options,
  onChange,
  labelText = '',
  label = '',
  placeholder = '',
  disabled = false,
  className,
  error,
  helperText,
  fullWidth,
  ...props
}): React.ReactElement => {
  const [open, setOpen] = useState(false)

  const val = useMemo(() => {
    if (value) {
      return typeof value === 'string' ? (value as string) : (value?.[label] as string)
    }
    return ''
  }, [value])

  return (
    <div className={className}>
      {labelText ? <label className={styles.label}>{labelText}</label> : ''}
      <MuiSelect
        open={open}
        onClick={(e) => {
          e.stopPropagation()
          !disabled ? setOpen(!open) : null
        }}
        value={val}
        defaultValue="none"
        displayEmpty
        fullWidth
        renderValue={() => {
          if (val) {
            return <>{val}</>
          } else {
            return <span className={styles.placeholder}>{placeholder}</span>
          }
        }}
        inputProps={{ 'aria-label': 'Without label' }}
        MenuProps={{ classes: { root: styles.rootMenu, paper: styles.paperMenu }, variant: 'menu' }}
        IconComponent={() =>
          open ? (
            <DownArrowIcon className={styles.downArrow} onClick={() => setOpen(false)} />
          ) : (
            <DownArrowIcon className={styles.downArrow} onClick={() => (disabled ? setOpen(false) : setOpen(true))} />
          )
        }
        disabled={disabled}
        error={error}
        className={styles.container}
        {...props}
      >
        {options?.map((option: any, i) => (
          <MenuItem
            className={styles.menuItem}
            key={i}
            value={option}
            onClick={() => {
              onChange(option)
              setOpen(!open)
            }}
          >
            {typeof option === 'string' ? option : option?.[label]}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText ? <span className={styles.error}>{helperText}</span> : ''}
    </div>
  )
}

export default Select
