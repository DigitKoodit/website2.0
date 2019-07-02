import { parse } from 'json2csv'
import isObject from 'lodash/isObject'

export const toCsv = (fields, array) =>
  new Promise((resolve, reject) => {
    try {
      const options = { fields }
      const csv = parse(array, options)
      resolve(csv)
    } catch(error) {
      reject(error)
    }
  })

export const toCsvDataUri = data => {
  const string = isObject(data) ? JSON.stringify(data) : data.toString()
  const base = 'data:text/csv;charset=UTF-8,%EF%BB%BF'
  return base + string
}
