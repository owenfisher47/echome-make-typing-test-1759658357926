'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { RotateCcw, Settings, Clock } from 'lucide-react'
import WordDisplay from './WordDisplay'
import Stats from './Stats'
import Results from './Results'
import { generateWords } from '@/utils/wordGenerator'
import { calculateStats } from '@/utils/statsCalculator'
import type { TestStats, CharStatus } from '@/types'

const TIMER_OPTIONS = [15, 30, 60, 120]

export default function TypingTest() {
  const [words, setWords] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [charStatuses, setCharStatuses] = useState<CharStatus[][]>([])
  const [isStarted, setIsStarted] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [selectedTime, setSelectedTime] = useState(60)
  const [stats, setStats] = useState<TestStats>({
    wpm: 0,
    accuracy: 100,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0
  })
  
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize words and char statuses
  useEffect(() => {
    resetTest()
  }, [])

  // Timer effect
  useEffect(() => {
    if (isStarted && timeLeft > 0 && !isFinished) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isStarted) {
      finishTest()
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [timeLeft, isStarted, isFinished])

  const resetTest = useCallback(() => {
    const newWords = generateWords(200)
    setWords(newWords)
    setCurrentWordIndex(0)
    setCurrentCharIndex(0)
    setUserInput('')
    setCharStatuses(newWords.map(word => Array(word.length).fill('untyped')))
    setIsStarted(false)
    setIsFinished(false)
    setTimeLeft(selectedTime)
    setStats({
      wpm: 0,
      accuracy: 100,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0
    })
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [selectedTime])

  const finishTest = useCallback(() => {
    setIsFinished(true)
    setIsStarted(false)
    
    const finalStats = calculateStats(
      charStatuses,
      words,
      selectedTime - timeLeft,
      currentWordIndex,
      currentCharIndex
    )
    setStats(finalStats)
    
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }, [charStatuses, words, selectedTime, timeLeft, currentWordIndex, currentCharIndex])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    if (!isStarted) {
      setIsStarted(true)
    }

    // Handle backspace at word boundary
    if (value.length < userInput.length && value.endsWith(' ')) {
      return
    }

    setUserInput(value)

    const currentWord = words[currentWordIndex]
    if (!currentWord) return

    // Update character statuses
    const newCharStatuses = [...charStatuses]
    const currentWordStatuses = [...newCharStatuses[currentWordIndex]]

    // Handle space (move to next word)
    if (value.endsWith(' ') && value.trim().length > 0) {
      const typedWord = value.trim()
      
      // Mark remaining characters in current word
      for (let i = typedWord.length; i < currentWord.length; i++) {
        currentWordStatuses[i] = 'missing'
      }
      
      newCharStatuses[currentWordIndex] = currentWordStatuses
      setCharStatuses(newCharStatuses)
      
      // Move to next word
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(prev => prev + 1)
        setCurrentCharIndex(0)
        setUserInput('')
      }
      return
    }

    // Update current word character statuses
    const typedText = value
    for (let i = 0; i < Math.max(typedText.length, currentWord.length); i++) {
      if (i < typedText.length) {
        if (i < currentWord.length) {
          currentWordStatuses[i] = typedText[i] === currentWord[i] ? 'correct' : 'incorrect'
        } else {
          // Extra characters
          if (!currentWordStatuses[i]) currentWordStatuses[i] = 'extra'
        }
      } else if (i < currentWord.length) {
        currentWordStatuses[i] = 'untyped'
      }
    }

    newCharStatuses[currentWordIndex] = currentWordStatuses
    setCharStatuses(newCharStatuses)
    setCurrentCharIndex(typedText.length)

    // Update real-time stats
    if (isStarted && timeLeft < selectedTime) {
      const currentStats = calculateStats(
        newCharStatuses,
        words,
        selectedTime - timeLeft,
        currentWordIndex,
        currentCharIndex
      )
      setStats(currentStats)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent certain key combinations
    if (e.ctrlKey || e.altKey || e.metaKey) {
      e.preventDefault()
      return
    }

    // Handle backspace
    if (e.key === 'Backspace' && currentCharIndex === 0 && currentWordIndex > 0) {
      // Move to previous word
      setCurrentWordIndex(prev => prev - 1)
      const prevWord = words[currentWordIndex - 1]
      setCurrentCharIndex(prevWord.length)
      setUserInput(prevWord)
      
      // Reset the current word's statuses
      const newCharStatuses = [...charStatuses]
      newCharStatuses[currentWordIndex] = Array(words[currentWordIndex].length).fill('untyped')
      setCharStatuses(newCharStatuses)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Settings */}
      <div className="flex items-center justify-between mb-8 p-4 bg-surface rounded-lg">
        <div className="flex items-center gap-4">
          <Settings className="w-5 h-5 text-primary" />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm">Time:</span>
            {TIMER_OPTIONS.map(time => (
              <button
                key={time}
                onClick={() => {
                  setSelectedTime(time)
                  if (!isStarted) setTimeLeft(time)
                }}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  selectedTime === time
                    ? 'bg-accent text-background'
                    : 'text-primary hover:text-accent'
                }`}
              >
                {time}s
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={resetTest}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-background rounded hover:bg-yellow-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Stats */}
      <Stats 
        stats={stats} 
        timeLeft={timeLeft} 
        isStarted={isStarted}
        selectedTime={selectedTime}
      />

      {/* Main typing area */}
      {!isFinished ? (
        <div className="mb-8">
          <WordDisplay
            words={words}
            currentWordIndex={currentWordIndex}
            currentCharIndex={currentCharIndex}
            charStatuses={charStatuses}
          />
          
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full mt-4 p-4 bg-surface border border-primary/20 rounded-lg text-white placeholder-primary focus:outline-none focus:border-accent"
            placeholder="Start typing to begin the test..."
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>
      ) : (
        <Results stats={stats} onRestart={resetTest} />
      )}
    </div>
  )
}