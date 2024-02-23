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
        course.code.toLowerCase().includes(searchTerm.toLowerCase())
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
            <p>{course.longName}</p>
            <p>{course.description}</p>
            <p>Credit Hours: {course.credits.creditHours.value}</p>
            {course.note && <p>Note: {course.note}</p>}
            {/* Add more details as needed */}
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
