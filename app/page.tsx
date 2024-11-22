import TextToSpeechForm from './components/TextToSpeechForm'
import { DarkModeToggle } from './components/DarkModeToggle'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <main className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border-3 border-gray-300 dark:border-gray-600 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Text to Speech Converter</h1>
          <DarkModeToggle />
        </div>
        <TextToSpeechForm />
      </main>
    </div>
  )
}

