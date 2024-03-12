// quoteService.ts
// import fs from 'fs';
// import path from 'path';
import quotes from '../quoteList.json';
import { Quotes, Quote } from '../domain/quotes';
import {Course} from '../domain/courses';
import coursesJson from '../courses.json';

export function getQuotes() {
    // iterate through the quotes from quoteList.json and create a new Quotes object
    const quotesList: Quotes = {
        quotes: quotes.quotes.map((quote: any) => {
            return {
                id: quote.id,
                author: quote.author,
                quote: quote.quote,
                category: quote.category,
                subcategory: quote.subcategory,
            } as Quote;
        }),
        categories: new Set(quotes.quotes.map((quote: any) => quote.category)),
        subcategories: new Set(quotes.quotes.map((quote: any) => quote.subcategory)),
    };
    console.log(quotesList);
    console.log(courses);
    return quotesList;
}
export const courses: Course[] = coursesJson.map((courseJson: any): Course => {
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
      "9fzcu": courseJson["9fzcu"],
      mXQpZ: courseJson.mXQpZ,
      L95zy: courseJson.L95zy,
      xq1Dp: courseJson.xq1Dp,
      awavi: courseJson.awavi,
    };
  });
