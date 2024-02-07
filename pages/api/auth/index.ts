import { NextApiRequest } from 'next'
/**
 *
 * @param headers Request headers
 * @returns Boolean
 * @description
 * It will only allow requests
 * - Which are not from Postman
 * - Which are not directly opened from the browser URL bar
 * - Which are from an allowed origin
 */
export const validateRequest = (headers: NextApiRequest['headers']): boolean => {
  const origin = headers['referer'] || headers['origin']
  const hasPostmanToken = headers['postman-token']
  const userAgent = headers['user-agent']
  let allowedOrigins: string[] = (process.env.ACCESS_CONTROL_ALLOW_ORIGINS || '').slice(1, -1).split(',')

  if (allowedOrigins.length > 0) {
    const hasMatchingOrigin = allowedOrigins.some((allowedOrigin) => origin?.includes(allowedOrigin))

    if (hasPostmanToken || !userAgent || userAgent.toLowerCase().includes('postman') || !origin || !hasMatchingOrigin) {
      return false
    }

    return true
  }

  return false
}
