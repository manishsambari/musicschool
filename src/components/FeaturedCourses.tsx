'use client'
import Link from "next/link"
import courseData from "../data/music_courses.json"
import InteractiveCourseCard from "./InteractiveCourseCard"
import { motion } from "framer-motion"

interface Course{
    id: number,
    title: string,
    slug: string,
    description: string,
    price: number,
    instructor: string,
    isFeatured: boolean,
    image: string
}

function FeaturedCourses() {
    const featuredCourses = courseData.courses.filter((course:Course) => course.isFeatured)

  return (
    <div className="py-12 bg-gray-900">
        <div>
            <div className="text-center">
                <motion.h2 
                    className="text-base text-teal-600 font-semibold tracking-wide uppercase"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    FEATURED COURSES
                </motion.h2>
                <motion.p 
                    className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Learn With the Best
                </motion.p>
                <motion.p 
                    className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    Discover our most popular courses with interactive 3D cards. Click any card to explore detailed course information!
                </motion.p>
            </div>
        </div>
        <div className="mt-10 mx-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {featuredCourses.map((course:Course, index: number)=> (
                    <InteractiveCourseCard 
                        key={course.id} 
                        course={course} 
                        index={index}
                    />
                ))}
            </div>
        </div>
        <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
        >
            <Link href={"/courses"}
            className="px-8 py-3 rounded-lg border border-neutral-600 text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition duration-200 font-medium shadow-lg hover:shadow-xl"
            >
            🎵 Explore All Courses
            </Link>
        </motion.div>
    </div>
  )
}

export default FeaturedCourses