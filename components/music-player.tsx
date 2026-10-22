"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import musicConfig from "@/data/music-config.json"

interface MusicPlayerProps {
  isOpen: boolean
  onClose: () => void
}

export default function MusicPlayer({ isOpen, onClose }: MusicPlayerProps) {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(musicConfig.defaultVolume)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const tracks = musicConfig.audioFiles

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    
    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', nextTrack)
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', nextTrack)
    }
  }, [currentTrack])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
    setIsPlaying(false)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
    setIsPlaying(false)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (audio) {
      const newTime = (parseFloat(e.target.value) / 100) * duration
      audio.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="music-player rounded-xl shadow-2xl border border-gray-200/50 p-6 w-96 max-w-[90vw]">
        <audio
          ref={audioRef}
          src={`audio/${tracks[currentTrack].filename}`}
          preload="metadata"
        />
        
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold macos-font">Music Player</h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => {
              if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.currentTime = 0
              }
              setIsPlaying(false)
            }}>
              Stop
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <Music className="w-10 h-10 text-white" />
          </div>
          <h4 className="font-medium text-gray-900 dark:text-white">{tracks[currentTrack].title}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{tracks[currentTrack].description}</p>
        </div>

        <div className="mb-4">
          <input
            type="range"
            min="0"
            max="100"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 mb-4">
          <Button variant="ghost" size="sm" onClick={prevTrack}>
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="lg" onClick={togglePlay}>
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={nextTrack}>
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider flex-1"
          />
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          Track {currentTrack + 1} of {tracks.length}
        </div>
      </div>
    </div>
  )
}