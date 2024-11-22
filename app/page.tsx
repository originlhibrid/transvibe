import TextToSpeechForm from './components/TextToSpeechForm'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <main className="bg-white p-8 rounded-lg shadow-lg border-3 border-gray-300 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Text to Speech Converter</h1>
        <TextToSpeechForm />
      </main>
    </div>
  )
}