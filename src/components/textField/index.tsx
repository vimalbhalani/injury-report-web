import React from 'react'
import { OutlinedTextFieldProps, TextField as InputTextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import styles from '../textField/TextField.module.scss'

interface TextFieldProps extends OutlinedTextFieldProps {
  labelText?: string
  type?: string
  placeholder?: string
  className?: string
  isEndAdornment?: boolean
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}))

const TextField = ({ labelText, type = 'text', placeholder, className, fullWidth, ...props }: TextFieldProps) => {
  const classes = useStyles()

  return (
    <div className={`${className} ${styles.root}`}>
      {labelText ? <label className={styles.label}>{labelText}</label> : ''}
      <InputTextField
        {...props}
        fullWidth
        className={styles.inputTextField}
        classes={{ root: classes.root }}
        placeholder={placeholder}
        type={'text'}
      />
    </div>
  )
}

export default TextField
