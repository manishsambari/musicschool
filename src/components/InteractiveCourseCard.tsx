'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { BackgroundGradient } from './ui/background-gradient'

interface Course {
  id: number
  title: string
  slug: string
  description: string
  price: number
  instructor: string
  isFeatured: boolean
  image: string
}

interface InteractiveCourseCardProps {
  course: Course
  index: number
}

export default function InteractiveCourseCard({ course, index }: InteractiveCourseCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className="group perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-full h-96 preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden">
          <BackgroundGradient className="rounded-[22px] p-4 sm:p-6 bg-white dark:bg-zinc-900 h-full">
            <div className="relative h-full flex flex-col">
              {/* Course Image with Overlay */}
              <div className="relative overflow-hidden rounded-lg mb-4 flex-1">
                <motion.img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 text-white">
                    <p className="text-sm font-medium">Click to see details</p>
                  </div>
                </motion.div>

                {/* Featured Badge */}
                {course.isFeatured && (
                  <motion.div
                    className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold"
                    animate={{ 
                      scale: isHovered ? [1, 1.1, 1] : 1,
                      rotate: isHovered ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    ⭐ Featured
                  </motion.div>
                )}

                {/* Price Tag */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                  <span className="text-lg font-bold">${course.price}</span>
                </div>
              </div>

              {/* Course Info */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                  by {course.instructor}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {course.description}
                </p>
              </div>
            </div>
          </BackgroundGradient>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <BackgroundGradient className="rounded-[22px] p-6 bg-white dark:bg-zinc-900 h-full">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                  {course.title}
                </h3>
                
                {/* Course Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">24 Video Lessons</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">6 Hours Content</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Certificate Included</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Community Access</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">(4.9) 234 reviews</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <motion.button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enroll Now - ${course.price}
                </motion.button>
                
                <motion.button
                  className="w-full border border-purple-500 text-purple-500 py-2 px-4 rounded-lg font-medium hover:bg-purple-500 hover:text-white transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Preview Course
                </motion.button>
              </div>
            </div>
          </BackgroundGradient>
        </div>
      </motion.div>
    </motion.div>
  )
}