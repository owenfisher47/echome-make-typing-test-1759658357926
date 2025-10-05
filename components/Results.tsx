import { RotateCcw, TrendingUp, Target, Clock, Type } from 'lucide-react'
import type { TestStats } from '@/types'

interface ResultsProps {
  stats: TestStats
  onRestart: () => void
}

export default function Results({ stats, onRestart }: ResultsProps) {
  const getWpmColor = (wpm: number) => {
    if (wpm >= 80) return 'text-green-400'
    if (wpm >= 60) return 'text-yellow-400'
    if (wpm >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return 'text-green-400'
    if (accuracy >= 90) return 'text-yellow-400'
    if (accuracy >= 80) return 'text-orange-400'
    return 'text-red-400'
  }

  return (
    <div className="text-center">
      <div className="bg-surface p-8 rounded-lg border border-primary/20 mb-8">
        <h2 className="text-3xl font-bold text-accent mb-8">Test Complete!</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex flex-col items-center p-6 bg-background rounded-lg">
            <TrendingUp className="w-8 h-8 text-accent mb-3" />
            <div className={`text-4xl font-bold mb-2 ${getWpmColor(stats.wpm)}`}>
              {Math.round(stats.wpm)}
            </div>
            <div className="text-primary text-sm">Words per minute</div>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-background rounded-lg">
            <Target className="w-8 h-8 text-accent mb-3" />
            <div className={`text-4xl font-bold mb-2 ${getAccuracyColor(stats.accuracy)}`}>
              {Math.round(stats.accuracy)}%
            </div>
            <div className="text-primary text-sm">Accuracy</div>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-background rounded-lg">
            <Type className="w-8 h-8 text-accent mb-3" />
            <div className="text-4xl font-bold text-green-400 mb-2">
              {stats.correctChars}
            </div>
            <div className="text-primary text-sm">Correct characters</div>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-background rounded-lg">
            <Type className="w-8 h-8 text-accent mb-3" />
            <div className="text-4xl font-bold text-red-400 mb-2">
              {stats.incorrectChars}
            </div>
            <div className="text-primary text-sm">Incorrect characters</div>
          </div>
        </div>

        <div className="text-primary mb-8">
          <p>Total characters typed: <span className="text-accent font-semibold">{stats.totalChars}</span></p>
        </div>

        <button
          onClick={onRestart}
          className="flex items-center gap-3 mx-auto px-8 py-4 bg-accent text-background rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
        >
          <RotateCcw className="w-5 h-5" />
          Take Another Test
        </button>
      </div>
    </div>
  )
}