import React, { ReactElement, useState } from 'react'
import { LocalizationProvider, TimePicker as MuiTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import TextField from '../textField'
import styles from '../timepicker/TimePicker.module.scss'

interface MuiTimePickerProps {
  labelText?: string
  label?: string
  name?: string
  value: string | number | Date | null
  onChange?: any
  onAccept: (val: any) => void
  className?: any
  minTime?: string | number | Date
  maxTime?: string | number | Date
  error?: boolean
  helperText?: string
  placeholder?: string
  id?: string
}

const TimePicker: React.FC<MuiTimePickerProps> = ({
  labelText,
  label,
  name,
  value,
  onChange = () => null,
  onAccept,
  className,
  minTime,
  maxTime,
  error = false,
  helperText,
  placeholder = 'Select Time',
  id = '',
  ...props
}): ReactElement => {
  const [open, setOpen] = useState(false)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns as any}>
      <MuiTimePicker
        {...props}
        ampm={false}
        views={['hours', 'minutes']}
        value={value}
        inputFormat="HH:mm"
        okText={'Save'}
        mask="__:__"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        toolbarTitle={''}
        onAccept={onAccept}
        onChange={onChange}
        InputProps={{ readOnly: true, inputProps: { value: value } }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            autoComplete="off"
            onClick={() => setOpen(true)}
            onChange={() => null}
            name={name}
            placeholder="Select Time"
            labelText={label}
            className={`${styles.dateField} ${className}`}
            onKeyDown={(e) => e.preventDefault()}
            error={error}
            helperText={helperText}
            fullWidth
            inputProps={{ ...params.inputProps, placeholder: placeholder }}
          />
        )}
        minTime={minTime}
        maxTime={maxTime}
      />
    </LocalizationProvider>
  )
}

export default TimePicker
