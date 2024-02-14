import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import {
  Grid,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import axios from 'axios'
import { format } from 'date-fns'
import { useFormik } from 'formik'
import Image from 'next/image'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { IDocument, IFormValues } from './interface'
import styles from './LoginPage.module.scss'
import Logo from '../../../public/logo.png'
import countryData from '../../db.json'
import { parseDateFromString } from '../../helpers'
import DatePicker from '../datepicker'
import Loader from '../loader'
import Modal from '../modal'
import Select from '../select'
import DeleteIcon from '../svgImages/DeleteIcon'
import TimePicker from '../timepicker'

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  phone: Yup.string()
    .matches(/^\+1[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}$/, 'Please enter a valid USA phone number (+1XXXXXXXXXX)')
    .required('Phone Number is required'),
  email: Yup.string().email('Invalid email format'),
  terms: Yup.bool().oneOf([true], 'You must accept the terms and conditions'),
  documents: Yup.array().max(5, 'Maximum 5  documents is required.'),
})

const Login = () => {
  const [cityOptions, setCityOptions] = useState<string[]>([''])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [otpValue, setOtpValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<number>(60)
  const [startTimer, setStartTimer] = useState<boolean>(true)
  const [isVerify, setIsVerify] = useState(true)

  const injuryOptions = ['Head', 'Neck', 'Back', 'Shoulder', 'Leg', 'Other']
  const painOption = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  const appointmentOption = ['Morning', 'Afternoon', 'Evening ']

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      dateOfAccident: '',
      injury: '',
      painLevel: '',
      insurance: '',
      zipCode: 0,
      state: '',
      city: '',
      transportation: 'no',
      appointment: '',
      documents: [],
      terms: false,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await handleSubmit(values)
      } catch (error) {
        console.error(error)
      }
    },
  })

  const handleStateChange = (value: string) => {
    const sortedCities = countryData[value as keyof typeof countryData].sort()
    setCityOptions(sortedCities)
    formik.setFieldValue('state', value)
    formik.setFieldValue('city', '')
  }

  const handleCityChange = (value: string) => {
    formik.setFieldValue('city', value)
  }

  const handleSubmit = async (values: IFormValues) => {
    try {
      setLoading(true)
      const response = await axios.post('/api/send-otp', { phone: values?.phone })

      if (response.data.success) {
        toast.success(response.data.message, { autoClose: 3000 })
        setIsModalOpen(true)
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error, { autoClose: 3000 })
      setLoading(false)
    }
    setLoading(false)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    const endTime = Date.now() + 60000
    const timerId = setInterval(() => {
      const currentTime = Date.now()
      const remainingTime = Math.max(0, Math.ceil((endTime - currentTime) / 1000))
      setTimeRemaining(remainingTime)
      setStartTimer(false)
      if (remainingTime === 0) {
        clearInterval(timerId)
      }
    }, 1000)
    return () => {
      clearInterval(timerId)
    }
  }, [startTimer, isModalOpen])

  const handleResendOtp = async () => {
    try {
      const response = await axios.post('/api/send-otp', { phone: formik?.values?.phone })
      if (response.data.success) {
        toast.success(response.data.message, { autoClose: 3000 })
        setIsModalOpen(true)
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error, { autoClose: 3000 })
      setLoading(false)
    }
    setTimeRemaining(60)
    setStartTimer(true)
    setOtpValue('')
  }

  const handleVerify = async () => {
    try {
      const response = await axios.post('/api/verify-otp', { phone: formik?.values?.phone, otp: otpValue })
      if (!response.data.error) {
        setIsModalOpen(false)
        try {
          const payload = { ...formik?.values }
          let formData = new FormData()
          formData.set('firstName', payload?.firstName ?? '')
          formData.set('lastName', payload?.lastName ?? '')
          formData.set('phone', payload?.phone ?? '')
          formData.set('email', payload?.email ?? '')
          formData.set('dateOfAccident', payload?.dateOfAccident ?? '')
          formData.set('state', payload?.state ?? '')
          formData.set('city', payload?.city ?? '')
          formData.set('Injuries', payload?.injury ?? '')
          formData.set('painLevel', payload?.painLevel ?? '')
          formData.set('zipCode', payload?.zipCode.toString() ?? '')
          formData.set('insurance', payload?.insurance ?? '')
          formData.set('appointment', payload?.appointment ?? '')
          formData.set('transportation', payload?.transportation ?? '')
          payload?.documents?.forEach((item: IDocument, index) => {
            const documentFile = item?.file as File
            if (documentFile) {
              formData.append(`documents[${index}]`, item?.file ?? '')
            }
          })
          setLoading(true)
          const emailResponse = await axios.post('/api/send-email', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          if (!emailResponse.data.error && emailResponse.data.success) {
            toast.success(emailResponse.data.message, { autoClose: 3000 })
            formik.resetForm()
            setIsVerify(true)
          } else {
            toast.error(emailResponse?.data?.error || 'Failed to send email', { autoClose: 3000 })
          }
        } catch (error) {
          console.error('Error sending email: ', error)
        }
        setLoading(false)
      } else {
        toast.error(response?.data?.error || 'Failed to verify OTP', { autoClose: 3000 })
      }
    } catch (error) {
      toast.error('Failed to verify OTP', { autoClose: 3000 })
    }
  }

  const handleOTPChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event?.target?.value
    const numericInput = value.replace(/[^0-9]/g, '')
    setOtpValue(numericInput)
  }

  const blockInvalidChar = (event: any) => {
    const pattern = /^[0-9\b]+$/
    if (
      !(pattern.test(event.key) || ((event.ctrlKey || event.metaKey) && event.key === 'v')) &&
      event.key !== 'ArrowRight' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'Backspace' &&
      event.key !== 'Tab' &&
      event.key !== 'Meta'
    ) {
      event.preventDefault()
    }
  }
  const label = { inputProps: { 'aria-label': 'terms' } }

  return isVerify ? (
    <div className={styles.container}>
      {loading && <Loader />}
      <div className={styles.loginWrapper}>
        <div className={styles.topDiv}>
          <div className={styles.incidentReport}>
            <img src="/images/injury_reporting.jpeg" alt="none" />
          </div>
        </div>
        <div className={styles.loginPage}>
          <div className={styles.heading}>FIll OUT THE FORM BELOW AND LET US HANDLE THE REST</div>
          <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  First Name *
                </Typography>
                <TextField
                  placeholder="First Name"
                  variant="outlined"
                  id="firstName"
                  fullWidth
                  required
                  {...formik.getFieldProps('firstName')}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  className={styles.textField}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Last Name *
                </Typography>
                <TextField
                  placeholder="Last Name"
                  variant="outlined"
                  id="lastName"
                  fullWidth
                  required
                  {...formik.getFieldProps('lastName')}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  className={styles.textField}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Phone Number
                </Typography>
                <TextField
                  placeholder="Phone Number"
                  variant="outlined"
                  fullWidth
                  required
                  {...formik.getFieldProps('phone')}
                  value={formik.values.phone.startsWith('+1') ? formik.values.phone : '+1' + formik.values.phone}
                  onChange={(e) => {
                    formik.setFieldValue('phone', e.target.value.replace(/^(\+\d{0,1})/, '+1'))
                  }}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  className={styles.textField}
                />
                <p className={styles.msg}>We will send you an SMS to verify your number </p>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Accident State
                </Typography>
                <Select
                  name="state"
                  value={formik.values.state}
                  onChange={handleStateChange}
                  options={Object.keys(countryData).sort()}
                  placeholder="Select State"
                  fullWidth
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={Boolean(formik.touched.state && formik.errors.state) ? formik.errors.state : ''}
                  className={styles.select}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Accident City
                </Typography>
                <Select
                  value={formik.values.city}
                  onChange={handleCityChange}
                  options={cityOptions}
                  placeholder="Select City"
                  fullWidth
                  name="city"
                  error={!!formik.errors.city && formik.touched.city}
                  helperText={formik.touched.city && formik.errors.city ? formik.errors.city : ''}
                  className={styles.select}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" sx={{ whiteSpace: 'nowrap' }} gutterBottom>
                  Zip Code
                </Typography>
                <TextField
                  placeholder="Zip Code"
                  variant="outlined"
                  name="zipCode"
                  onKeyDown={blockInvalidChar}
                  fullWidth
                  value={formik.values.zipCode || ''}
                  onChange={formik.handleChange}
                  error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                  helperText={formik.touched.zipCode && formik.errors.zipCode}
                  className={styles.textField}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Email
                </Typography>
                <TextField
                  placeholder="Email"
                  variant="outlined"
                  fullWidth
                  {...formik.getFieldProps('email')}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  className={styles.textField}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DatePicker
                  id="dateOfAccident"
                  label={'Date of Accident'}
                  className={styles.datePicker}
                  value={formik.values.dateOfAccident}
                  onAccept={(date) => {
                    formik.setFieldValue('dateOfAccident', date)
                  }}
                  disableFuture={true}
                  name="dateOfAccident"
                  error={formik.touched.dateOfAccident && Boolean(formik.errors.dateOfAccident)}
                  helperText={formik.touched?.dateOfAccident ? formik.errors.dateOfAccident : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Injuries
                </Typography>
                <Select
                  value={formik.values.injury}
                  onChange={(value) => {
                    formik.setFieldValue('injury', value)
                  }}
                  options={injuryOptions}
                  placeholder="Select Injury"
                  fullWidth
                  name="injury"
                  error={!!formik.errors.injury && formik.touched.injury}
                  helperText={formik.touched.injury && formik.errors.injury ? formik.errors.injury : ''}
                  className={styles.select}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Pain Level
                </Typography>
                <Select
                  value={formik.values.painLevel}
                  onChange={(value) => {
                    formik.setFieldValue('painLevel', value)
                  }}
                  options={painOption}
                  placeholder="Select Pain Level"
                  fullWidth
                  name="painLevel"
                  error={!!formik.errors.painLevel && formik.touched.painLevel}
                  helperText={formik.touched.painLevel && formik.errors.painLevel ? formik.errors.painLevel : ''}
                  className={styles.select}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Insurance Carrier
                </Typography>
                <TextField
                  placeholder="Insurance carrier"
                  variant="outlined"
                  id="insurance"
                  fullWidth
                  required
                  {...formik.getFieldProps('insurance')}
                  error={formik.touched.insurance && Boolean(formik.errors.insurance)}
                  helperText={formik.touched.insurance && formik.errors.insurance}
                  className={styles.textField}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Best time for Doctor's appointment
                </Typography>
                <Select
                  value={formik.values.appointment}
                  onChange={(value) => {
                    formik.setFieldValue('appointment', value)
                  }}
                  options={appointmentOption}
                  placeholder="Select Appointment"
                  fullWidth
                  name="appointment"
                  error={!!formik.errors.appointment && formik.touched.appointment}
                  helperText={formik.touched.appointment && formik.errors.appointment ? formik.errors.appointment : ''}
                  className={styles.select}
                />
                {/* TODO */}
                {/* <Grid item xs={12}>
                  <div className={styles.appointment}>
                    <Box>
                      <DatePicker
                        id="appointmentDate"
                        className={styles.datePicker}
                        value={formik.values.appointmentDate}
                        onAccept={(date) => {
                          const formattedDate = format(date, 'dd MMM yyyy')
                          formik.setFieldValue('appointmentDate', formattedDate)
                        }}
                        disableFuture={true}
                        name="appointmentDate"
                        error={formik.touched.appointmentDate && Boolean(formik.errors.appointmentDate)}
                        helperText={formik.touched?.appointmentDate ? formik.errors.appointmentDate : ''}
                      />
                    </Box>
                    <Box>
                      <TimePicker
                        id="appointmentTime"
                        className={styles.datePicker}
                        value={formik.values.appointmentTime}
                        onAccept={(date) => {
                          const formattedTime = format(parseDateFromString(date), 'HH:mm')
                          formik.setFieldValue('appointmentTime', formattedTime)
                        }}
                        name="appointmentTime"
                        error={formik.touched.appointmentTime && Boolean(formik.errors.appointmentTime)}
                        helperText={formik.touched?.appointmentTime ? formik.errors.appointmentTime : ''}
                      />
                    </Box>
                  </div>
                </Grid> */}
              </Grid>
              <Grid item xs={12}>
                <div className={styles.radioButton}>
                  <Typography variant="subtitle1" gutterBottom>
                    Do you need the Doctor to provide free transportation to the first visit ?
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup row aria-label="transportation" {...formik.getFieldProps('transportation')}>
                      <FormControlLabel
                        value="yes"
                        control={<Radio classes={{ checked: styles.checked }} />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio classes={{ checked: styles.checked }} />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={12}>
                <p>Terms of use</p>
                <div className={styles.terms}>
                  <div className={styles.checkTerm}>
                    <Checkbox
                      {...label}
                      name="terms"
                      checked={formik.values.terms}
                      onChange={(event) => {
                        formik.setFieldValue('terms', event.target.checked)
                      }}
                    />
                  </div>
                  <div>
                    {' '}
                    <p>I agree to terms of use</p>
                  </div>
                </div>
                {formik.touched.terms && formik.errors.terms && <p className={styles.error}>{formik.errors.terms}</p>}
              </Grid>
              <Grid item xs={12}>
                <p className={styles.termsContent}>
                  <a href="/terms" className={styles.condition}>
                    Terms of use*
                  </a>{' '}
                  By clicking submit, I consent to receive SMS messages and calls from EZINJURY to assist me in
                  obtaining a doctor's appointment. I am providing my consent to EZINJURY to have my information
                  forwarded to a medical provider and to a law firm. I am requesting for a Doctor to contact me to
                  schedule an appointment and I am requesting an Attorney to contact me for a consultation.
                </p>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" className={styles.button} fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
          <Modal
            open={isModalOpen}
            onClose={handleClose}
            classes={{ paper: styles.paperBox }}
            className={styles.modalRoot}
            id="verify-otp-modal"
          >
            <div className={styles.header}>
              <div className={styles.title}>
                <Image src={Logo} alt="Logo" height={56} width={56} className={styles.modalLogo} /> Verify Mobile Number
              </div>
              <CloseIcon onClick={handleClose} className={styles.closeIcon} id="close-verify-otp-modal" />
            </div>
            <div>
              <Grid container spacing={2}>
                <div className={styles.verifyInputWrapper}>
                  <Grid item xs={12}>
                    <div className={styles.verifyOtpLabel}>Enter the code you received on sms</div>
                    <TextField
                      id="verify-otp"
                      name="verify-otp"
                      variant={'outlined'}
                      placeholder="Enter OTP Here"
                      onKeyDown={blockInvalidChar}
                      onChange={handleOTPChange}
                      inputProps={{ maxLength: 6 }}
                      className={`${styles.textInput} ${styles.textField}`}
                      fullWidth
                    />
                    {timeRemaining !== 0 && (
                      <span className={styles.timer}>
                        {`${(Math.floor((timeRemaining - 1) / 60) % 60).toString().padStart(2, '0')}:${(
                          (timeRemaining - 1) %
                          60
                        )
                          .toString()
                          .padStart(2, '0')}`}
                      </span>
                    )}
                    {timeRemaining <= 0 && (
                      <span className={styles.resentOtp} id="resend-otp" onClick={handleResendOtp}>
                        Resend OTP
                      </span>
                    )}
                  </Grid>
                </div>
                <Grid item xs={12} textAlign={'center'} padding={0}>
                  <Button
                    variant="contained"
                    id="location-modal-save"
                    type="submit"
                    disabled={loading}
                    onClick={handleVerify}
                    className={styles.verifyButton}
                  >
                    {loading ? <CircularProgress size={24} /> : 'SUBMIT - I am requesting a legal consultation'}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.containerBackground}>
      <Image src={Logo} alt="Logo" height={150} width={150} className={styles.modalLogo} />
      <p>
        <span className={styles.highlightText}>Thank you</span> for requesting a legal consultation, a law firm will be
        contacting you shortly.
      </p>
    </div>
  )
}

export default Login
