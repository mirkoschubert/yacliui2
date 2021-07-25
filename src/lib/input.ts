//import chalk from 'chalk'
import prompts, { PromptObject } from 'prompts'

export interface Choice {
  title: string,
  description?: string,
  value: unknown,
  disabled?: boolean
}

export const ask = async (question: string, initial: string): Promise<string | undefined> => {
  const options: PromptObject = {
    type: 'text',
    name: 'value',
    initial: () => {
      return (typeof initial === 'string' && initial !== '') ? initial : ''
    },
    message: question
  }
  try {
    const res = await prompts(options)
    return res.value
  } catch (e) {
    console.error(e)
  }
}

export const confirm = async (question: string, initial?: boolean): Promise<boolean | undefined> => {
  const options: PromptObject = {
    type: 'confirm',
    name: 'value',
    initial: initial || false,
    message: question
  }
  try {
    const res = await prompts(options)
    return res.value
  } catch (e) {
    console.error(e)
  }
}

export const choose = async (question: string, choices: Array<Choice>): Promise<unknown> => {
  const options: PromptObject = {
    type: 'select',
    name: 'value',
    message: question,
    choices: choices
  }
  try {
    const res = await prompts(options)
    return res.value
  } catch (e) {
    console.error(e)    
  }
}