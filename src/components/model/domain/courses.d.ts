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

  courseTypicallyOffered: string; // e.g. "Fall and Winter"
  courseType: string; // e.g. "C - Combined Lecture and Activity"
  note?: string;
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

  awavi?: {name: string, path: string}[]; // ???
}