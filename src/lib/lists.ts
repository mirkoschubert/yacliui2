import chalk from 'chalk'
import { Align, Alignment } from './utils'


export interface ListOptions {
  ordered: boolean,
  padding: number,
  marker: string
}

export interface DefinitionListEntry {
  term: string,
  definition: string
}

const defaults: ListOptions = {
  ordered: false,
  padding: 2,
  marker: '+'
}


/**
 * Prints an configurable ordered or unordered list
 * 
 * @param entries Array of String
 * @param opts ListOptions
 */
export const List = (entries: Array<string> = [], opts?: Partial<ListOptions>): void => {
  const options = {...defaults, ...opts}
  const numWidth = String(entries.length).length + 1
  const markWidth = options.marker.length

  console.log()
  entries.forEach((entry, i) => {
    if (options.ordered) {
      const _num = Align(String(i + 1) + '.', Alignment.Left, numWidth + options.padding)
      console.log(chalk.yellow(_num) + entry)
    } else {
      const _mark = Align(options.marker, Alignment.Left, markWidth + options.padding)
      console.log(chalk.yellow(_mark) + entry)
    }
  })
}


/**
 * Prints a two column list with term and definition
 * 
 * @param entries DefinitionListEntry
 * @param opts ListOptions
 */
export const DefinitionList = (entries: DefinitionListEntry[], opts?: Partial<ListOptions>): void => {
  const options = {...defaults, ...opts}
  const numWidth = String(entries.length).length
  let width = 0
  entries.forEach(entry => width = entry.term.length > width ? entry.term.length : width)

  console.log()
  entries.forEach((entry, i) => {
    if (options.ordered) {
      const _num = Align(String(i + 1) + '.', Alignment.Left, numWidth + options.padding + 1)
      const _term = Align(entry.term, Alignment.Left, width + options.padding)
      console.log(chalk.yellow(_num) + _term + chalk.dim(entry.definition))
    } else {
      const _term = Align(entry.term, Alignment.Left, width + options.padding)
      console.log(chalk.yellow(_term) + entry.definition)
    }
  })
}
