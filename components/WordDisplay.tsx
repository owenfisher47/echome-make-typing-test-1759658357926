import type { CharStatus } from '@/types'

interface WordDisplayProps {
  words: string[]
  currentWordIndex: number
  currentCharIndex: number
  charStatuses: CharStatus[][]
}

export default function WordDisplay({
  words,
  currentWordIndex,
  currentCharIndex,
  charStatuses
}: WordDisplayProps) {
  const visibleWords = words.slice(0, Math.min(currentWordIndex + 50, words.length))

  return (
    <div className="text-2xl leading-relaxed p-6 bg-surface rounded-lg border border-primary/20 min-h-[200px] overflow-hidden">
      <div className="flex flex-wrap gap-x-3 gap-y-2">
        {visibleWords.map((word, wordIndex) => (
          <div key={wordIndex} className="word relative">
            {word.split('').map((char, charIndex) => {
              const isCurrentWord = wordIndex === currentWordIndex
              const isCurrentChar = isCurrentWord && charIndex === currentCharIndex
              const status = charStatuses[wordIndex]?.[charIndex] || 'untyped'
              
              let className = 'relative '
              
              if (isCurrentChar) {
                className += 'char-current '
              } else {
                switch (status) {
                  case 'correct':
                    className += 'char-correct '
                    break
                  case 'incorrect':
                    className += 'char-incorrect '
                    break
                  case 'extra':
                    className += 'char-extra '
                    break
                  case 'missing':
                    className += 'char-missing '
                    break
                  default:
                    className += 'text-primary '
                }
              }

              return (
                <span key={charIndex} className={className}>
                  {char}
                </span>
              )
            })}
            
            {/* Show caret after the word if current word and at end */}
            {wordIndex === currentWordIndex && currentCharIndex >= word.length && (
              <span className="char-current ml-1">_</span>
            )}
            
            {/* Extra characters */}
            {charStatuses[wordIndex] && charStatuses[wordIndex].length > word.length && (
              <>
                {charStatuses[wordIndex].slice(word.length).map((status, extraIndex) => (
                  <span key={`extra-${extraIndex}`} className="char-extra">
                    |
                  </span>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}