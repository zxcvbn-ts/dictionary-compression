import { describe, it } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import compressOrdered from '../src/compress'
import decompressOrdered from '../src/decompress'

const fixturePath = path.join(
  __dirname,
  '__fixtures__',
  'englishWikipedia.json',
)
const rawData = fs.readFileSync(fixturePath, 'utf8')
const data = JSON.parse(rawData) as string[]

describe('integration', () => {
  it('should compress and decompress correctly', () => {
    const result = compressOrdered(data)
    if (Array.isArray(result)) {
      assert.fail('Expected object with compressedData and permutation')
    }

    const decompressed = decompressOrdered(
      result.compressedData,
      result.permutation,
    )
    assert.deepStrictEqual(decompressed, data)
  })

  it('should compress in reasonable time', () => {
    const startTime = performance.now()
    compressOrdered(data)
    const compressionTime = performance.now() - startTime

    assert.ok(compressionTime < 50, 'Compression should complete within 50ms')
  })

  it('should decompress in reasonable time', () => {
    const result = compressOrdered(data)
    if (Array.isArray(result)) {
      assert.fail('Expected object with compressedData and permutation')
    }
    const startTime = performance.now()
    decompressOrdered(result.compressedData, result.permutation)
    const decompressionTime = performance.now() - startTime

    assert.ok(
      decompressionTime < 50,
      'Decompression should complete within 50ms',
    )
  })

  it('should significantly reduce the size of a big fixture file', () => {
    const result = compressOrdered(data)
    if (Array.isArray(result)) {
      assert.fail('Expected object with compressedData and permutation')
    }

    const originalSize = rawData.length
    const compressedSize =
      result.compressedData.length + result.permutation.length
    const reduction = ((originalSize - compressedSize) / originalSize) * 100

    assert.ok(
      compressedSize < originalSize,
      'Compressed size should be smaller than original JSON size',
    )

    assert.ok(
      reduction > 50,
      'Compressed size percentage should be at least 50% smaller than original',
    )
  })
})
