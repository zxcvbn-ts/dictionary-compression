import { describe, it } from 'node:test'
import assert from 'node:assert'
import compress from '../src/compress'

describe('compress', () => {
  it('should compress an array of strings with prefix compression', () => {
    const input = ['test', 'testing', 'tester']
    const expected = 'AtestEerEing'
    assert.deepStrictEqual(compress(input), {
      compressedData: expected,
      permutation: [0, 2, 1],
    })
  })

  it('should handle empty array', () => {
    assert.deepStrictEqual(compress([]), {
      compressedData: '',
      permutation: [],
    })
  })

  it('should return non-array input as is', () => {
    // @ts-expect-error for the test
    assert.strictEqual(compress(null), null)
  })

  it('should not compress if entries are not strings', () => {
    const input = ['test', 123]
    // @ts-expect-error for the test
    assert.deepStrictEqual(compress(input), input)
  })

  it('should not compress if strings contain forbidden characters', () => {
    const input = ['test', 'test"']
    assert.deepStrictEqual(compress(input), input)
  })
})
