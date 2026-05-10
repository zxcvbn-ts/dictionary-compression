import { describe, it } from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import compress from '../src/compress'
import decompress from '../src/decompress'

const fixturePath = path.join(
  __dirname,
  '__fixtures__',
  'englishWikipedia.json',
)
const rawData = fs.readFileSync(fixturePath, 'utf8')
const data = JSON.parse(rawData) as string[]

describe('integration', () => {
  it('should compress and decompress correctly', () => {
    const compressed = compress(data)
    assert.deepStrictEqual(typeof compressed, 'string')

    const decompressed = decompress(compressed as string)
    assert.deepStrictEqual(decompressed, data)
  })

  it('should compress in reasonable time', () => {
    const startTime = performance.now()
    compress(data)
    const compressionTime = performance.now() - startTime

    assert.ok(compressionTime < 50, 'Compression should complete within 50ms')
  })

  it('should decompress in reasonable time', () => {
    const compressed = compress(data)
    const startTime = performance.now()
    decompress(compressed as string)
    const decompressionTime = performance.now() - startTime

    assert.ok(
      decompressionTime < 500,
      'Decompression should complete within 500ms',
    )
  })

  it('should significantly reduce the size of a big fixture file', () => {
    const compressed = compress(data)

    assert.strictEqual(
      typeof compressed,
      'string',
      'Compressed result should be a string',
    )

    const originalSize = rawData.length
    const compressedSize = compressed.length
    const reduction = ((originalSize - compressedSize) / originalSize) * 100

    assert.ok(
      compressedSize < originalSize,
      'Compressed size should be smaller than original JSON size',
    )

    assert.ok(
      reduction > 18,
      'Compressed size percentage should be at least 18% smaller than original',
    )
  })
})
