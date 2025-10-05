import type { CharStatus, TestStats } from '@/types'

export function calculateStats(
  charStatuses: CharStatus[][],
  words: string[],
  timeElapsed: number,
  currentWordIndex: number,
  currentCharIndex: number
): TestStats {
  let correctChars = 0
  let incorrectChars = 0
  let totalChars = 0

  // Count characters up to current position
  for (let wordIndex = 0; wordIndex <= currentWordIndex && wordIndex < charStatuses.length; wordIndex++) {
    const wordStatuses = charStatuses[wordIndex]
    const word = words[wordIndex]
    
    if (!wordStatuses || !word) continue

    const charsToCount = wordIndex === currentWordIndex 
      ? Math.min(currentCharIndex, wordStatuses.length)
      : wordStatuses.length

    for (let charIndex = 0; charIndex < charsToCount; charIndex++) {
      const status = wordStatuses[charIndex]
      
      if (status === 'correct') {
        correctChars++
        totalChars++
      } else if (status === 'incorrect' || status === 'extra') {
        incorrectChars++
        totalChars++
      }
    }

    // Add space characters between words (except for current incomplete word)
    if (wordIndex < currentWordIndex) {
      totalChars++ // Count the space
    }
  }

  const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 100
  const timeInMinutes = Math.max(timeElapsed / 60, 1/60) // Prevent division by zero
  const wpm = (correctChars / 5) / timeInMinutes // Standard: 5 characters per word

  return {
    wpm: Math.max(0, wpm),
    accuracy,
    correctChars,
    incorrectChars,
    totalChars
  }
}