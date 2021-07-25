import { confirm } from './input'

describe('confirm', () => {
  test('confirm question with return', async () => {
    const data = await confirm('Do you confirm?', true)
    expect(data).toBe(true)
  })
})