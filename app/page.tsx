import TypingTest from '@/components/TypingTest'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-accent mb-2">TypingTest</h1>
          <p className="text-primary">Test your typing speed and accuracy</p>
        </div>
        <TypingTest />
      </div>
    </main>
  )
}