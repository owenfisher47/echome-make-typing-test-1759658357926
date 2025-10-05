export type CharStatus = 'untyped' | 'correct' | 'incorrect' | 'extra' | 'missing'

export interface TestStats {
  wpm: number
  accuracy: number
  correctChars: number
  incorrectChars: number
  totalChars: number
}