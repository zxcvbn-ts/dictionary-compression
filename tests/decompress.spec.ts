import { describe, it } from 'node:test'
import assert from 'node:assert'
import decompress from '../src/decompress'

describe('decompress', () => {
  it('should decompress a string with prefix compression', () => {
    const input = 'AtestEerEing'
    const expected = ['test', 'testing', 'tester']
    assert.deepStrictEqual(decompress(input, [0, 2, 1]), expected)
  })

  it('should handle empty string', () => {
    assert.deepStrictEqual(decompress('', []), [])
  })
})
