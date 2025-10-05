import type { TestStats } from '@/types'

interface StatsProps {
  stats: TestStats
  timeLeft: number
  isStarted: boolean
  selectedTime: number
}

export default function Stats({ stats, timeLeft, isStarted, selectedTime }: StatsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-surface p-4 rounded-lg border border-primary/20 text-center">
        <div className="text-2xl font-bold text-accent">{Math.round(stats.wpm)}</div>
        <div className="text-sm text-primary">WPM</div>
      </div>
      
      <div className="bg-surface p-4 rounded-lg border border-primary/20 text-center">
        <div className="text-2xl font-bold text-accent">{Math.round(stats.accuracy)}%</div>
        <div className="text-sm text-primary">Accuracy</div>
      </div>
      
      <div className="bg-surface p-4 rounded-lg border border-primary/20 text-center">
        <div className="text-2xl font-bold text-accent">
          {isStarted ? formatTime(timeLeft) : formatTime(selectedTime)}
        </div>
        <div className="text-sm text-primary">Time</div>
      </div>
      
      <div className="bg-surface p-4 rounded-lg border border-primary/20 text-center">
        <div className="text-2xl font-bold text-accent">{stats.totalChars}</div>
        <div className="text-sm text-primary">Characters</div>
      </div>
    </div>
  )
}