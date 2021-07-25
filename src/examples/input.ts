import { ask, choose, confirm } from '../lib/input'

(async () => {
  const name = await ask(`What's your name?`, 'Mirko')
  console.log('Name:', name)
  const programmer = await confirm('Are you a programmer?', true)
  console.log('Programmer:', programmer ? 'yes' : 'no')
  const levels = [
    { title: 'Beginner', value: 'beginner' },
    { title: 'Intermediate', value: 'intermediate' },
    { title: 'Advanced', value: 'advanced' },
  ]
  const level = await choose('What is your level?', levels)
  console.log('Level:', level)
})()