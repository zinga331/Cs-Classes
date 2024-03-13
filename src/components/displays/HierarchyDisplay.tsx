import { useState, useEffect } from "react";
import { Course } from "../model/domain/courses";
import "./Display.css";

interface Props {
  courses: Course[];
}

const HierarchyDisplay = (props: Props) => {
  const [selectedEmphasis, setSelectedEmphasis] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (selectedEmphasis) {
      const newFilteredCourses = props.courses.filter(
        (course) => course.emphases.includes(selectedEmphasis)
      );
      newFilteredCourses.sort((a, b) => a.code.localeCompare(b.code)); // Sort the courses alphabetically
      setFilteredCourses(newFilteredCourses);
    }
  }, [selectedEmphasis, props.courses]);

  const handleEmphasisClick = (emphasis: string) => {
    if (emphasis === selectedEmphasis) {
      return;
    }
    setSelectedEmphasis(emphasis);
    setSelectedCourse(null);
    setFilteredCourses([]);
  };

  const handleCourseClick = (courseCode: string) => {
    setSelectedCourse(courseCode);
  };

  const renderCourses = () => {
    if (!selectedEmphasis) {
      return null;
    }

    const courseCodes = filteredCourses.map((course) => course.code);

    // Create a Set to remove duplicates
    const uniqueCourseCodes = Array.from(new Set(courseCodes));

    return (
      <div className="courses-container">
        <h2>Courses</h2>
        <div style={{ maxHeight: 'calc(75vh - 50px)', overflowY: 'auto' }}> {/* TODO move these styles into the css*/}
          {uniqueCourseCodes.map((courseCode, index) => (
            <div key={index}>
              <button onClick={() => handleCourseClick(courseCode)}>
                {courseCode}
              </button>
            </div>
          ))}
        </div>
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
        <h2>Course Details :</h2>
        {courseDetails && (
          <div>
            <p>{courseDetails.code}, {courseDetails.longName}</p>
            {courseDetails.requiredCredit && !courseDetails.electiveCredit && <p>Required</p>}
            {!courseDetails.requiredCredit && courseDetails.electiveCredit && <p>For Elective Credit</p>}
            {courseDetails.requiredCredit && courseDetails.electiveCredit && <p>Counts as Required or Elective Credit</p>}

            {courseDetails.courseType && <p>Course Type: {courseDetails.courseType}</p>}

            <p>Credit Hours: {courseDetails.credits.creditHours.value}</p>
            <p>Available Semesters: {courseDetails.courseTypicallyOffered}</p>
            {courseDetails.prerequisite_string && <p>Prerequisites: {courseDetails.prerequisite_string}</p>}
            {courseDetails.recommended && <p>Recommended: {courseDetails.recommended}</p>}
            {courseDetails.nonEnforcedPrerequisites && <p>Non-Enforced Prerequisites: {courseDetails.nonEnforcedPrerequisites}</p>}
            <p>{courseDetails.description}</p>
            {courseDetails.objective && <p>{courseDetails.objective}</p>}
            {courseDetails.note && <p>{courseDetails.note}</p>}
            {/* Add more details as needed */}
          </div>
        )}
      </div>
    );
  };

  // Get all unique emphasis values
  const emphases = ["No Emphasis", "Bioinformatics", "Animation", "Machine Learning", "Software Engineering"];

  return (
    <div className="hierarchy-display-container">
      <div className="emphases-container">
        <h2>Emphasis |</h2>
        {emphases.map((emphasis, index) => (
          <div key={index}>
            <button onClick={() => handleEmphasisClick(emphasis)}>
              {emphasis}
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
