import moment from 'moment'

export const expireAtOptions = {
  oneHour: {
    hour: 1,
    value: '1 hour',
  },
  sixHour: {
    hour: 6,
    value: '6 hour',
  },
  twentyFourHours: {
    hour: 24,
    value: '24 hour',
  },
}

export function generateExpiryDate(expireAt, oneTimeUse) {
  if (oneTimeUse) return moment().add(1, 'y').toDate()
  return moment().add(expireAtOptions[expireAt].hour, 'h').toDate()
}
