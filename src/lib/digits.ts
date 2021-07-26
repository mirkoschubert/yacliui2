import chalk from 'chalk'
import path from 'path'
import { readFileSync } from 'fs'


const matrix = JSON.parse(readFileSync(path.resolve(__dirname, './digits.json'), 'utf-8'))

export interface DigitOptions {
  on: string,
  off: string,
  offset: string,
  spacer: string,
  space_between: string,
  leading: string,
  max_digits: number,
  max_decimals: number,
  fixed: boolean,
  color: string
}

const defaults: DigitOptions = {
  on: '\u25a0',
  off: '\u2b1a',
  offset: '',
  spacer: ' ',
  space_between: '  ',
  leading: ' ',
  max_digits: 4,
  max_decimals: 2,
  fixed: true,
  color: 'green'
}

const parseNumber = (number: number | string, opts?: Partial<DigitOptions>): string => {
  const options = {...defaults, ...opts}
  let response = ''

  if (typeof number === 'number') {
    const fixedLength = options.max_digits + options.max_decimals + 2
    const negative = number < 0
    const digits = Math.floor(Math.abs(number)).toString()
    let decimals = ''
    if (options.fixed && digits.length > options.max_digits) {
      const offset = options.max_decimals - (digits.length - options.max_digits)
      decimals = (offset >= 0) ? (Math.abs(number) % 1).toFixed(offset).substr(2) : ''
    } else {
      decimals = (Math.abs(number) % 1).toFixed(options.max_decimals).substr(2)
    }

    response = ((negative) ? '-' : '') + digits + ((decimals.length > 0) ? '.' + decimals : '')
    if (options.fixed && response.length < fixedLength) response = options.leading.repeat(fixedLength - response.length) + response
  } else if (typeof number === 'string' && options.fixed) {
    // e.g. 10:42
    response = number
  }
  return response
}


const getDigit = (n: string, line: number, opts?: Partial<DigitOptions>): string => {
  const options = {...defaults, ...opts}
  let output = ''

  // Commata get only one row
  if (n === '.') {
    if (matrix[n][line] === 1) {
      output += options.on
    } else if (matrix[n][line] === 0) {
      output += options.off
    }
  } else {
    for (let i = line * 3; i < (line * 3) + 3; i++) {
      if (matrix[n][i] === 1) {
        output += (i === line * 3) ? options.on : options.spacer + options.on
      } else if (matrix[n][i] === 0) {
        output += (i === line * 3) ? options.off : options.spacer + options.off
      }
    }
  }
  return output
}

const render = (str: string, opts?: Partial<DigitOptions>): string => {
  const options = {...defaults, ...opts}
  let res = ''
  for (let i = 0; i < 5; i++) {
    let line = ''
    for (let ln = 0; ln < str.length; ln++) {
      line += (ln === 0) ? options.offset : options.space_between
      line += getDigit(str[ln], i, opts)
    }
    res += line + '\n'
  }
  return res
}

export const Digits = (number: number | string, opts?: Partial<DigitOptions>): void => {
  const options = {...defaults, ...opts}
  const parsed = parseNumber(number, options)
  const rendered = render(parsed, options)
  if (options.color) {
    console.log(chalk`{${options.color} ${rendered}}`)
  } else {
    console.log(rendered)
  }
}