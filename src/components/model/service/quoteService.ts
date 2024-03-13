import {Course} from '../domain/courses';
import coursesJson from '../courses.json';

export const courseMap = new Map<string, string>();

// First, populate the courseMap with all course IDs and their corresponding codes
coursesJson.forEach((courseJson: any) => {
  courseMap.set(courseJson.courseGroupId, courseJson.code);
});


export const courses: Course[] = coursesJson.map((courseJson: any): Course => {
    // Parse the prerequisites to a string
  const prerequisitesString = parsePrerequisitesToString(courseJson.requisites);
  let required : boolean = false;
  let elective : boolean = false;
  if (courseJson["9fzcu"] === "Elective") {
    elective = true;
  }
  else if (courseJson["9fzcu"] === "Required") {
    required = true;
  }
  else if (courseJson["9fzcu"] === "Both") {
    required = true;
    elective = true;
  }



    // Map each JSON object to the Course interface
    return {
      id: courseJson.id,
      courseGroupId: courseJson.courseGroupId,
      curriculumId: courseJson.curriculumId,
      titleCode: courseJson.titleCode,
      code: courseJson.code,
      subjectCode: courseJson.subjectCode,
      courseNumber: courseJson.courseNumber,
      name: courseJson.name,
      longName: courseJson.longName,
      description: courseJson.description,
      learningOutcomes: courseJson.learningOutcomes,
      emphases: courseJson.emphases,
      credits: {
        creditHours: courseJson.credits.creditHours,
        lectureHours: courseJson.credits.lectureHours,
        labHours: courseJson.credits.labHours,
      },
      courseTypicallyOffered: courseJson.courseTypicallyOffered,
      courseType: courseJson.courseType,
      note: courseJson.note,
      fee: courseJson.fee,
      courseDependents: courseJson.courseDependents,
      programDependents: courseJson.programDependents,
      requisites: courseJson.requisites,
      nonEnforcedPrerequisites: courseJson.nonEnforcedPrerequisites,
      recommended: courseJson.recommended,
      requiredCredit: required,
      electiveCredit: elective,
      mXQpZ: courseJson.mXQpZ,
      L95zy: courseJson.L95zy,
      xq1Dp: courseJson.xq1Dp,
      awavi: courseJson.awavi,
      // What Chris added
      objective: courseJson.learningOutcomes.objective,
      prerequisite_string: prerequisitesString
      
      
    };
  });
  function parsePrerequisitesToString(requisites: any): string {
    // Assuming that requisitesSimple structure is correct and each "value" array contains course IDs.
    const requisitesSimple = requisites?.requisitesSimple ?? [];
    const prerequisites = requisitesSimple.flatMap((requisite: any) => {
      if (requisite.name === "Prerequisites") {
        return requisite.rules.flatMap((rule: any) => {
          if (rule.condition === 'completedAllOf') {
            return rule.value.values.flatMap((value: any) => 
              value.value.map((courseId: string) => 
                courseMap.get(courseId) || courseId // Get the course code using the map, or default to the course ID
              ).join(value.logic === 'and' ? ' and ' : ' or ')
            );
          }
          return []; // If no 'completedAllOf' condition is found, return an empty array.
        });
      }
      return []; // If the requisite is not 'Prerequisites', return an empty array.
    });
    
    return prerequisites.join(', ');
  }
