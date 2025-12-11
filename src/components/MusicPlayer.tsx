'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Track {
  id: number
  title: string
  artist: string
  genre: string
  duration: string
}

const sampleTracks: Track[] = [
  { id: 1, title: "Guitar Melody", artist: "John Doe", genre: "Acoustic", duration: "3:24" },
  { id: 2, title: "Piano Dreams", artist: "Jane Smith", genre: "Classical", duration: "4:12" },
  { id: 3, title: "Jazz Improvisation", artist: "Chris Davis", genre: "Jazz", duration: "5:33" },
  { id: 4, title: "Electronic Beats", artist: "Luke Harris", genre: "EDM", duration: "3:45" },
  { id: 5, title: "Blues Soul", artist: "Ethan Moore", genre: "Blues", duration: "4:28" }
]

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 0.5))
      }, 100)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % sampleTracks.length)
    setProgress(0)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + sampleTracks.length) % sampleTracks.length)
    setProgress(0)
  }

  return (
    <>
      {/* Floating Player Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.5 13.5H2a1 1 0 01-1-1V7.5a1 1 0 011-1h2.5l3.883-3.316z" clipRule="evenodd" />
            <path d="M12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Music Player Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-700"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Sample Tracks</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Current Track Info */}
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.5 13.5H2a1 1 0 01-1-1V7.5a1 1 0 011-1h2.5l3.883-3.316z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white">{sampleTracks[currentTrack].title}</h4>
                <p className="text-gray-400">{sampleTracks[currentTrack].artist}</p>
                <span className="inline-block bg-purple-600 text-white text-xs px-2 py-1 rounded-full mt-2">
                  {sampleTracks[currentTrack].genre}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{Math.floor(progress * 0.01 * 240 / 60)}:{String(Math.floor(progress * 0.01 * 240 % 60)).padStart(2, '0')}</span>
                  <span>{sampleTracks[currentTrack].duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center space-x-6">
                <button
                  onClick={prevTrack}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                  </svg>
                </button>
                
                <motion.button
                  onClick={togglePlay}
                  className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </motion.button>

                <button
                  onClick={nextTrack}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                  </svg>
                </button>
              </div>

              {/* Track List */}
              <div className="mt-6 max-h-40 overflow-y-auto">
                <h5 className="text-sm font-semibold text-gray-300 mb-2">Playlist</h5>
                {sampleTracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                      index === currentTrack ? 'bg-purple-600/20 text-purple-400' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                    onClick={() => setCurrentTrack(index)}
                    whileHover={{ x: 4 }}
                  >
                    <div>
                      <p className="text-sm font-medium">{track.title}</p>
                      <p className="text-xs opacity-70">{track.artist}</p>
                    </div>
                    <span className="text-xs">{track.duration}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}