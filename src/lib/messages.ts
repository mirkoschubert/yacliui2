import chalk from 'chalk'
import moment from 'moment'
import { Align, Alignment, Tense } from './utils'

export enum State {
  Info = 'gray',
  OK = 'green',
  Warning = 'yellow',
  Error = 'red'
}

export const Headline = (content: string, align: Alignment = Alignment.Left): void => {
  console.log('\n' + chalk.green(Align(content.toUpperCase(), align)))
}


export const Message = (content: string, state?: State, showTime = false): void => {
  const stateColor = state ? chalk.keyword(state) : chalk.reset
  const time = showTime ? chalk.dim('[' + moment().format('HH:mm:ss') + '] ') : ''
  console.log(time + stateColor(content))
}

export const Info = (content: string, showTime = false): void => Message(content, State.Info, showTime)
export const Okay = (content: string, showTime = false): void => Message(content, State.OK, showTime)
export const Warning = (content: string, showTime = false): void => Message(content, State.Warning, showTime)
export const Error = (content: string, showTime = false): void => Message(content, State.Error, showTime)

export const Found = (num: number, topic: Array<string> = []): void => {
  let out = '\n'

  if (typeof num === 'number') {
    out += chalk.red(num)
    out += chalk.yellow(' ' + Tense(num, topic) + ' ' + Tense(num, ['has', 'have']) + ' been found.')
  } else if (typeof num === 'string') {
    out += chalk.red(num) + chalk.yellow(' has been found.')
  }
  console.log(out)
}

export const FoundOf = (num1: number, topic1: Array<string> = [], num2: number, topic2: Array<string> = []): void => {
  let out = '\n'

  out += chalk.red(num1)
  out += chalk.yellow(' ' + Tense(num1, topic1) + ' of ')
  out += chalk.red(num2)
  out += chalk.yellow(' ' + Tense(num2, topic2) + ' ' + Tense(num1, ['has', 'have']) + ' been found.')
  console.log(out)
}