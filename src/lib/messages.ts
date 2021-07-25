import chalk from 'chalk'
import moment from 'moment'
import { Align, Alignment } from './utils'

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

