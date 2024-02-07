export const parseDateFromString = (date: string) => {
  if (/^\d+$/.test(date)) {
    const dateTimeStamp = Number(date)
    return new Date(dateTimeStamp)
  }
  return new Date(date)
}
