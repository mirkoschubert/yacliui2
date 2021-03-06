export enum Alignment { Left = 'left', Center = 'center', Right = 'right' }

export const Align = (str: string, al: Alignment = Alignment.Left, width?: number): (string | undefined) => {
  str = str.trim()
  width = width || getWindowWidth()
  const strWidth = str.length

  if (width !== -1 && strWidth < width) {
    if (al === Alignment.Left) {
      return str + new Array(width - strWidth + 1).join(' ')
    } else if (al === Alignment.Right) {
      return new Array(width - strWidth + 1).join(' ') + str
    } else if (al === Alignment.Center) {
      return new Array(Math.floor((width - strWidth) / 2) + 1).join(' ') + str
    }
  } else return str
}

const getWindowWidth = (): number => {
  return (typeof process === 'object' && process.stdout && process.stdout.columns) ? process.stdout.columns : -1
}

export const Tense = (num: number, topic: string[] = []): string => {
  return (num > 1) ? topic[1] : topic[0]
}

export const MergeOptions = (opts: Record<string, unknown>, defaults: Record<string, unknown>): Record<string, unknown> => {
  let merged: Record<string, unknown> = {}
  if (opts === undefined) {
    merged = defaults
  } else {
    for (const key in defaults) {
      merged[key] = (opts[key] !== undefined) ? opts[key] : defaults[key]
    }
  }
  return merged
}