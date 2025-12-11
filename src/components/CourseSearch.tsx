'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BackgroundGradient } from './ui/background-gradient'
import Image from 'next/image'

interface Course {
  id: number
  title: string
  slug: string
  description: string
  price: number
  instructor: string
  isFeatured: boolean
  image: string
}// course object structure

interface CourseSearchProps {
  courses: Course[]
}// array of course objects passed as prop

const genres = ['All', 'Guitar', 'Piano', 'Vocal', 'Drums', 'Jazz', 'Production', 'Classical', 'Blues', 'Electronic']
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $100', min: 0, max: 100 },
  { label: '$100 - $150', min: 100, max: 150 },
  { label: 'Over $150', min: 150, max: Infinity }
]

export default function CourseSearch({ courses }: CourseSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [sortBy, setSortBy] = useState('title')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesGenre = selectedGenre === 'All' || 
                          course.title.toLowerCase().includes(selectedGenre.toLowerCase())
      
      const matchesPrice = course.price >= selectedPriceRange.min && 
                          course.price <= selectedPriceRange.max

      return matchesSearch && matchesGenre && matchesPrice
    })

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'title':
          return a.title.localeCompare(b.title)
        case 'featured':
          return b.isFeatured ? 1 : -1
        default:
          return 0
      }
    })

    return filtered
  }, [courses, searchTerm, selectedGenre, selectedPriceRange, sortBy])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Find Your Perfect Course
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover the right music course for your journey with our advanced search and filtering system
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search courses, instructors, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-white rounded-xl px-6 py-4 pl-12 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            <span>Advanced Filters</span>
          </button>
          
          <div className="text-gray-400">
            {filteredAndSortedCourses.length} course{filteredAndSortedCourses.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                {/* Genre Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
                  <select
                    value={selectedPriceRange.label}
                    onChange={(e) => {
                      const range = priceRanges.find(r => r.label === e.target.value)
                      if (range) setSelectedPriceRange(range)
                    }}
                    className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {priceRanges.map(range => (
                      <option key={range.label} value={range.label}>{range.label}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="title">Title (A-Z)</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="featured">Featured First</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence>
          {filteredAndSortedCourses.map((course) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <BackgroundGradient className="rounded-[22px] p-4 sm:p-6 bg-white dark:bg-zinc-900">
                <div className="relative">
                  {course.isFeatured && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full z-10">
                      Featured
                    </div>
                  )}
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-purple-600 dark:text-purple-400">
                      by {course.instructor}
                    </span>
                    <span className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
                      ${course.price}
                    </span>
                  </div>
                  <motion.button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Enroll Now
                  </motion.button>
                </div>
              </BackgroundGradient>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results */}
      {filteredAndSortedCourses.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🎵</div>
          <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
          <p className="text-gray-400 mb-4">Try adjusting your search criteria or filters</p>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedGenre('All')
              setSelectedPriceRange(priceRanges[0])
              setSortBy('title')
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </motion.div>
      )}
    </div>
  )
}