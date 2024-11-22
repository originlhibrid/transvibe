'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function TextToSpeechForm() {
  const [text, setText] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [voice, setVoice] = useState('male')
  const [audioSrc, setAudioSrc] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, apiKey, voice }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate speech');
      }

      const data = await response.json()
      const audioBlob = new Blob([Uint8Array.from(atob(data.audio), c => c.charCodeAt(0))], { type: 'audio/mp3' })
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudioSrc(audioUrl)
    } catch (error) {
      console.error('Error:', error)
      alert(error instanceof Error ? error.message : 'Failed to generate speech. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="text" className="text-gray-700 dark:text-gray-300">Text to convert</Label>
        <Textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to speech..."
          className="w-full h-32 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="apiKey" className="text-gray-700 dark:text-gray-300">OpenAI API Key</Label>
        <Input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API key"
          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-gray-700 dark:text-gray-300">Voice</Label>
        <RadioGroup value={voice} onValueChange={setVoice} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male" className="text-gray-700 dark:text-gray-300">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female" className="text-gray-700 dark:text-gray-300">Female</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-center">
        <Button type="submit" disabled={isLoading} className="w-full max-w-xs">
          {isLoading ? 'Converting...' : 'Convert to Speech'}
        </Button>
      </div>

      {audioSrc && (
        <div className="mt-6">
          <audio controls src={audioSrc} className="w-full">
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </form>
  )
}