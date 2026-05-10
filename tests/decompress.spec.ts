import { describe, it } from 'node:test'
import assert from 'node:assert'
import decompress from '../src/decompress'

describe('decompress', () => {
  it('should decompress a string with prefix compression', () => {
    const input = 'AtestEingEer'
    const expected = ['test', 'testing', 'tester']
    assert.deepStrictEqual(decompress(input), expected)
  })

  it('should handle empty string', () => {
    assert.deepStrictEqual(decompress(''), [])
  })
})
