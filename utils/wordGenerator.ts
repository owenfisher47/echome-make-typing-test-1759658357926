const COMMON_WORDS = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
  'is', 'water', 'long', 'find', 'here', 'thing', 'great', 'man', 'world', 'life',
  'still', 'public', 'human', 'read', 'left', 'put', 'end', 'why', 'called', 'should',
  'never', 'does', 'got', 'made', 'going', 'sleep', 'talk', 'were', 'right', 'must',
  'house', 'without', 'might', 'second', 'try', 'easy', 'said', 'each', 'where', 'too'
]

export function generateWords(count: number): string[] {
  const words: string[] = []
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * COMMON_WORDS.length)
    words.push(COMMON_WORDS[randomIndex])
  }
  
  return words
}