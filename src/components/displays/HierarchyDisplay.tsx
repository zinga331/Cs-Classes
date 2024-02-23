import { useState, useEffect } from "react";
import { Course } from "../model/domain/courses";
import "./Display.css";

interface Props {
  courses: Course[];
}

const HierarchyDisplay = (props: Props) => {
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (selectedSeason) {
      const newFilteredCourses = props.courses.filter(
        (course) => course.courseTypicallyOffered.includes(selectedSeason)
      );
      newFilteredCourses.sort((a, b) => a.code.localeCompare(b.code)); // Sort the courses alphabetically
      setFilteredCourses(newFilteredCourses);
    }
  }, [selectedSeason, props.courses]);

  const handleSeasonClick = (season: string) => {
    if (season === selectedSeason) {
      return;
    }
    setSelectedSeason(season);
    setSelectedCourse(null);
    setFilteredCourses([]);
  };

  const handleCourseClick = (courseCode: string) => {
    setSelectedCourse(courseCode);
    window.scrollTo(0, 0); // Scroll to the top of the component
  };

  const renderCourses = () => {
    if (!selectedSeason) {
      return null;
    }

    const courseCodes = filteredCourses.map((course) => course.code);

    // Create a Set to remove duplicates
    const uniqueCourseCodes = Array.from(new Set(courseCodes));

    return (
      <div className="courses-container">
        <h2>Courses|</h2>
        {uniqueCourseCodes.map((courseCode, index) => (
          <div key={index}>
            <button onClick={() => handleCourseClick(courseCode)}>
              {courseCode}
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderCourseDetails = () => {
    if (!selectedCourse) {
      return null;
    }

    const courseDetails = filteredCourses.find(
      (course) => course.code === selectedCourse
    );

    return (
      <div className="course-details-container">
        <h2>Course Details</h2>
        {courseDetails && (
          <div>
            <p>{courseDetails.longName}</p>
            <p>{courseDetails.description}</p>
            <p>Credit Hours: {courseDetails.credits.creditHours.value}</p>
            {courseDetails.note && <p>Note: {courseDetails.note}</p>}
            {/* Add more details as needed */}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="hierarchy-display-container">
      <div className="seasons-container">
        <h2>Seasons|</h2>
        {["Fall", "Winter", "Spring", "Summer"].map((season, index) => (
          <div key={index}>
            <button onClick={() => handleSeasonClick(season)}>
              {season}
            </button>
          </div>
        ))}
      </div>
      <div>{renderCourses()}</div>
      {selectedCourse && <div>{renderCourseDetails()}</div>}
    </div>
  );
};

export default HierarchyDisplay;