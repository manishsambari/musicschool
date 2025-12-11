
import FeaturedCourses from "@/components/FeaturedCourses";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Instructors from "@/components/Instructors";
import MusicSchoolTestimonials from "@/components/TestimonialCards";
import UpcomingWebinars from "@/components/UpcomingWebinars";
import WhyChooseUs from "@/components/WhyChooseUs";
import MusicPlayer from "@/components/MusicPlayer";
import CourseProgress from "@/components/CourseProgress";
import CourseSearch from "@/components/CourseSearch";
import musicCoursesData from "@/data/music_courses.json";



export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <HeroSection />
      <FeaturedCourses />
      <WhyChooseUs />
      <CourseSearch courses={musicCoursesData.courses} />
      <MusicSchoolTestimonials />
      <UpcomingWebinars />
      <Instructors />
      <Footer />
      
      {/* Floating Components */}
      <MusicPlayer />
      <CourseProgress />
    </main>
  );
}
