export interface Course {
  id: string;
  courseGroupId: string;
  curriculumId: string;
  titleCode: string;

  code: string;         // e.g. "C S 356"
  subjectCode: string;  // e.g. "C S"
  courseNumber: string; // e.g. "356"

  name: string; // "Advanced Techniques in HCI"
  longName: string; // "Advanced Techniques in Human Computer Interaction"
  description: string; // "This class combines designing the user experience with..."
  learningOutcomes: {
    name: string; // "Analyze the context of a Design Problem"
    objective: string; // "Students will learn how to..."
    tags: any[]; // ???
    activity?: any;
    assessment?: any;
    justification?: any;
  }[];
  credits: {
    creditHours:  {value: number, min?: number};
    lectureHours: {value: number, min?: number};
    labHours:     {value: number, min?: number};
  };

  emphases: string[]; // e.g. ["Animation"]
  // emphases[] include "No Emphasis" as the case where it's required for students not doing an emphasis
  // emphases[] can be empty, for example with CS 142 (because it's no longer required/offered)

  courseTypicallyOffered: string; // e.g. "Fall and Winter"
  courseType: string; // e.g. "C - Combined Lecture and Activity"
  note?: string; // "This course is a prerequisite for CS 356"
  fee?: string; // number; only on IS567

  courseDependents: any[];
  programDependents: any[];
  requisites: {};

  nonEnforcedPrerequisites?: string;
  recommended?: string;
  "9fzcu"?: string;
  mXQpZ?: string;
  L95zy?: string;
  xq1Dp?: string;

  awavi?: {name: string, path: string}[]; // Lists document attachments for the course (we can't access these)

  // Additional fields that Chris thought would be useful to have
  objective?: string; // Analyze, write about, and discuss issues and ethical problems // This is under learningOutcomes
  prerequisite_string?: string; // "CS 142 or equivalent"
  // 9fzcu is the field that tells us if a course is required, elective, or both, it isn't always present
  requiredCredit: boolean; // true // We get this value from 9fzcu in the json
  electiveCredit: boolean; // false // We get this value from 9fzcu in the json
}
