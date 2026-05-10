const isCompactDoubleQuotedString = (string: string) => {
  // eslint-disable-next-line no-control-regex
  return !/[\x00-\x1f\u2028\u2029\\"]/.exec(string)
}

const compressWithPrefix = (parsed: string[]) => {
  if (!Array.isArray(parsed)) {
    return parsed
  }
  if (
    !parsed.every(
      (entry) =>
        typeof entry === 'string' && isCompactDoubleQuotedString(entry),
    )
  ) {
    // Should be rare enough, so don't bother escape them.
    return parsed
  }

  const deltas: string[] = []
  let last = ''
  parsed.forEach((entry) => {
    let prefixLen = 0
    const maxPrefixLen = Math.min(entry.length, last.length, 25)
    while (
      prefixLen < maxPrefixLen &&
      entry.charAt(prefixLen) === last.charAt(prefixLen)
    ) {
      prefixLen += 1
    }
    deltas.push(String.fromCharCode(65 + prefixLen) + entry.slice(prefixLen))
    last = entry
  })

  return deltas.join('')
}

export default function compressOrdered(data: string[]) {
  if (!Array.isArray(data)) {
    return data
  }
  const indexed = data.map((value, index) => ({ value, index }))
  indexed.sort((a, b) => {
    if (a.value < b.value) return -1
    if (a.value > b.value) return 1
    return 0
  })

  const sortedData = indexed.map((item) => item.value)
  const permutation = indexed.map((item) => item.index)

  const compressedData = compressWithPrefix(sortedData)

  if (typeof compressedData !== 'string') {
    return data
  }

  return {
    compressedData,
    permutation,
  }
}
