'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Lesson {
  id: number
  title: string
  duration: string
  completed: boolean
  type: 'video' | 'practice' | 'quiz'
}

interface CourseModule {
  id: number
  title: string
  lessons: Lesson[]
  completed: boolean
}

const sampleCourse = {
  title: "Guitar Fundamentals",
  instructor: "John Doe",
  totalLessons: 24,
  completedLessons: 8,
  modules: [
    {
      id: 1,
      title: "Getting Started",
      completed: true,
      lessons: [
        { id: 1, title: "Introduction to Guitar", duration: "5:30", completed: true, type: 'video' as const },
        { id: 2, title: "Holding the Guitar", duration: "8:15", completed: true, type: 'video' as const },
        { id: 3, title: "Basic Posture Practice", duration: "10:00", completed: true, type: 'practice' as const },
        { id: 4, title: "Knowledge Check", duration: "3:00", completed: true, type: 'quiz' as const }
      ]
    },
    {
      id: 2,
      title: "Basic Chords",
      completed: false,
      lessons: [
        { id: 5, title: "Open Chords Overview", duration: "12:45", completed: true, type: 'video' as const },
        { id: 6, title: "G Major Chord", duration: "6:20", completed: true, type: 'video' as const },
        { id: 7, title: "C Major Chord", duration: "6:15", completed: true, type: 'video' as const },
        { id: 8, title: "D Major Chord", duration: "6:30", completed: true, type: 'video' as const },
        { id: 9, title: "Chord Transitions", duration: "15:00", completed: false, type: 'practice' as const },
        { id: 10, title: "Chord Quiz", duration: "5:00", completed: false, type: 'quiz' as const }
      ]
    },
    {
      id: 3,
      title: "Strumming Patterns",
      completed: false,
      lessons: [
        { id: 11, title: "Basic Down Strums", duration: "8:45", completed: false, type: 'video' as const },
        { id: 12, title: "Up and Down Strums", duration: "10:30", completed: false, type: 'video' as const },
        { id: 13, title: "Rhythm Practice", duration: "20:00", completed: false, type: 'practice' as const }
      ]
    }
  ] as CourseModule[]
}

export default function CourseProgress() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedModule, setExpandedModule] = useState<number | null>(null)
  const [course] = useState(sampleCourse)

  const progressPercentage = (course.completedLessons / course.totalLessons) * 100

  const getLessonIcon = (type: string, completed: boolean) => {
    const baseClasses = `w-5 h-5 ${completed ? 'text-green-400' : 'text-gray-400'}`
    
    switch (type) {
      case 'video':
        return (
          <svg className={baseClasses} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        )
      case 'practice':
        return (
          <svg className={baseClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        )
      case 'quiz':
        return (
          <svg className={baseClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <>
      {/* Progress Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="3"
              fill="none"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke="white"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - progressPercentage / 100) }}
              transition={{ duration: 1, delay: 3 }}
            />
          </svg>
        </motion.button>
      </motion.div>

      {/* Progress Modal */}
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
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-700"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{course.title}</h3>
                  <p className="text-gray-400">by {course.instructor}</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Overall Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">Overall Progress</span>
                  <span className="text-green-400 font-bold">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>{course.completedLessons} of {course.totalLessons} lessons completed</span>
                  <span>{course.totalLessons - course.completedLessons} remaining</span>
                </div>
              </div>

              {/* Modules */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-4">Course Modules</h4>
                {course.modules.map((module) => {
                  const completedLessons = module.lessons.filter(l => l.completed).length
                  const moduleProgress = (completedLessons / module.lessons.length) * 100
                  
                  return (
                    <div key={module.id} className="border border-gray-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                        className="w-full p-4 text-left hover:bg-gray-800 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            module.completed ? 'bg-green-500' : 'bg-gray-600'
                          }`}>
                            {module.completed ? (
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <span className="text-white text-xs font-bold">{module.id}</span>
                            )}
                          </div>
                          <div>
                            <h5 className="text-white font-medium">{module.title}</h5>
                            <p className="text-sm text-gray-400">
                              {completedLessons}/{module.lessons.length} lessons • {Math.round(moduleProgress)}% complete
                            </p>
                          </div>
                        </div>
                        <svg 
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            expandedModule === module.id ? 'rotate-180' : ''
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {expandedModule === module.id && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 space-y-2">
                              {module.lessons.map((lesson) => (
                                <motion.div
                                  key={lesson.id}
                                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                                    lesson.completed ? 'bg-green-900/20' : 'bg-gray-800/50'
                                  }`}
                                  whileHover={{ x: 4 }}
                                >
                                  {getLessonIcon(lesson.type, lesson.completed)}
                                  <div className="flex-1">
                                    <p className={`font-medium ${lesson.completed ? 'text-green-300' : 'text-white'}`}>
                                      {lesson.title}
                                    </p>
                                    <p className="text-sm text-gray-400">{lesson.duration}</p>
                                  </div>
                                  {lesson.completed && (
                                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>

              {/* Continue Learning Button */}
              <motion.button
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue Learning
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}