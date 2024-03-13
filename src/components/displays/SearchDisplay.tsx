import { useState, useEffect } from "react";
import { Course } from "../model/domain/courses";

interface Props {
  courses: Course[];
}

const SearchDisplay = (props: Props) => {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const newFilteredCourses = props.courses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.longName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.credits.creditHours.value.toString().includes(searchTerm) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.objective?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.nonEnforcedPrerequisites?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.recommended?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.prerequisite_string?.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setFilteredCourses(newFilteredCourses);
  }, [searchTerm, props.courses]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const renderCourses = () => {
    if (!searchTerm) {
      return null;
    }

    return (
      <div>
        <h2>Courses</h2>
        {filteredCourses.map((course, index) => (
          <div key={index}>
            <p>{course.code}, {course.longName}</p>
            {course.requiredCredit && !course.electiveCredit && <p>Required</p>}
            {!course.requiredCredit && course.electiveCredit && <p>For Elective Credit</p>}
            {course.requiredCredit && course.electiveCredit && <p>Counts as Required or Elective Credit</p>}

            {course.courseType && <p>Course Type: {course.courseType}</p>}

            <p>Credit Hours: {course.credits.creditHours.value}</p>
            <p>Available Semesters: {course.courseTypicallyOffered}</p>
            {course.prerequisite_string && <p>Prerequisites: {course.prerequisite_string}</p>}
            {course.recommended && <p>Recommended: {course.recommended}</p>}
            {course.nonEnforcedPrerequisites && <p>Non-Enforced Prerequisites: {course.nonEnforcedPrerequisites}</p>}
            <p>{course.description}</p>
            {course.objective && <p>{course.objective}</p>}
            {course.note && <p>{course.note}</p>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div>
        <h2>Search</h2>
        <input type="text" value={searchTerm} onChange={handleSearchChange} />
      </div>
      <div>{renderCourses()}</div>
    </div>
  );
};

export default SearchDisplay;
