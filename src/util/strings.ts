/**
 * Calculates similarity based on word-level grams.
 * @param n - Number of words per gram (2 = bigram, 3 = trigram).
 */
export function wordSimilarity (strA: string, strB: string, n = 2) {
  const setA = getWordNGrams(strA, n)
  const setB = getWordNGrams(strB, n)

  if (setA.size === 0 || setB.size === 0) return 0

  let intersection = 0
  for (const gram of setA) {
    if (setB.has(gram)) intersection++
  }

  const union = setA.size + setB.size - intersection
  return intersection / union
}

/**
 * Generates word-level n-grams.
 * @param str - The input sentence.
 * @param n - Number of words per gram (2 = bigram, 3 = trigram).
 */
function getWordNGrams (str: string, n = 2) {
  const grams = new Set<String>()
  // Split by whitespace and remove punctuation
  const words = str.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 0)

  for (let i = 0; i <= words.length - n; i++) {
    // Join the words back into a single string for comparison
    grams.add(words.slice(i, i + n).join(' '))
  }

  return grams
}
