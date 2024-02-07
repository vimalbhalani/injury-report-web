import React, { ReactElement, useState } from 'react'
import { LocalizationProvider, DatePicker as MuiDatePicker, PickersDayProps } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import styles from '../datepicker/DatePicker.module.scss'
import TextField from '../textField'

interface MuiDatePickerProps {
  label?: string
  name?: string
  value: string | number | Date | null
  onAccept: (date: any) => void
  onChange?: (date: any, keyboardInputValue?: string) => void
  className?: string
  minDate?: string | number | Date
  maxDate?: string | number | Date
  error?: boolean
  helperText?: string
  onBlur?: (date: any) => void
  shouldDisableDate?: (date: any) => boolean
  disablePast?: boolean
  disableFuture?: boolean
  placeholder?: string
  onError?: (reason?: string | null) => void
  id?: string
  renderDay?: (
    _day: string | number | Date,
    _selectedDates: (string | number | Date | null)[],
    pickersDayProps: PickersDayProps<string | number | Date>,
  ) => JSX.Element
  inputFormat?: string
  views?: string[] | any
}

const DatePicker: React.FC<MuiDatePickerProps> = ({
  label,
  value,
  name,
  onAccept,
  onChange = () => null,
  className,
  minDate,
  maxDate,
  error = false,
  helperText,
  onBlur,
  shouldDisableDate,
  disablePast = false,
  disableFuture = false,
  placeholder = 'Select Date',
  inputFormat = 'MMM dd, yyyy',
  views = ['year', 'month', 'day'],
  onError = () => null,
  id = '',
  renderDay,
  ...props
}): ReactElement => {
  const [open, setOpen] = useState(false)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        {...props}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={value ? value : null}
        views={views}
        inputFormat={inputFormat}
        renderDay={renderDay}
        onChange={() => null}
        onAccept={(value: any) => onAccept(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            autoComplete="off"
            onClick={() => setOpen(true)}
            onChange={() => null}
            name={name}
            labelText={label}
            className={`${styles.dateField} ${className}`}
            onKeyDown={(e) => e.preventDefault()}
            error={error}
            helperText={helperText}
            onBlur={onBlur}
            id={id}
            fullWidth
            inputProps={{ ...params.inputProps, placeholder: placeholder }}
          />
        )}
        shouldDisableDate={shouldDisableDate}
        disablePast={disablePast}
        disableFuture={disableFuture}
        minDate={minDate}
        maxDate={maxDate}
        onError={onError}
      />
    </LocalizationProvider>
  )
}

export default DatePicker
