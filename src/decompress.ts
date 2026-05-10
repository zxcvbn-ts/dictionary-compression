function decompress(encodedString: string) {
  const decompressedArray = encodedString.split(/([A-Z])/g)
  const decompressedData = []
  let last = ''
  let i
  for (i = 1; i < decompressedArray.length; i += 2) {
    last =
      last.slice(0, decompressedArray[i].charCodeAt(0) - 65) +
      decompressedArray[i + 1]
    decompressedData.push(last)
  }

  return decompressedData
}

export default function decompressOrdered(
  encodedString: string,
  permutation: number[],
) {
  const decompressedData = decompress(encodedString)
  if (
    !Array.isArray(decompressedData) ||
    !Array.isArray(permutation) ||
    decompressedData.length !== permutation.length
  ) {
    return decompressedData
  }

  const restoredData = new Array<string>(decompressedData.length)
  for (let i = 0; i < decompressedData.length; i += 1) {
    restoredData[permutation[i]] = decompressedData[i]
  }

  return restoredData
}
