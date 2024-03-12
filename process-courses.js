//import courses from "./cs-course-data.json" with {type: "json"};
import {readFile, writeFile} from "node:fs/promises";
const rj = path => readFile(path, "utf8").then(d => JSON.parse(d));

const courses = await Promise.all([
  // https://app.coursedog.com/api/v1/cm/byu/courses/search/%24filters?catalogId=uGrT9sX2clUBV30mw3yl&skip=0&limit=50000&orderBy=undefined&formatDependents=false&effectiveDatesRange=2023-09-05%2C2023-09-05&departments=1323
  rj("courses-all.json").then(d => { d.emphasis = null; return d; }),

  // https://app.coursedog.com/api/v1/cm/byu/courses/search/%24filters?catalogId=uGrT9sX2clUBV30mw3yl&skip=0&limit=50000&orderBy=undefined&formatDependents=false&effectiveDatesRange=2023-09-05%2C2023-09-05
  rj("courses-plain.json").then(d => { d.emphasis = "No Emphasis"; return d; }),

  // https://app.coursedog.com/api/v1/cm/byu/courses/search/%24filters?catalogId=uGrT9sX2clUBV30mw3yl&skip=0&limit=50000&orderBy=undefined&formatDependents=false&effectiveDatesRange=2023-09-05%2C2023-09-05
  rj("courses-bio.json").then(d => { d.emphasis = "Bioinformatics"; return d; }),

  // https://app.coursedog.com/api/v1/cm/byu/courses/search/%24filters?catalogId=uGrT9sX2clUBV30mw3yl&skip=0&limit=50000&orderBy=undefined&formatDependents=false&effectiveDatesRange=2023-09-05%2C2023-09-05
  rj("courses-anim.json").then(d => { d.emphasis = "Animation"; return d; }),

  // https://app.coursedog.com/api/v1/cm/byu/courses/search/%24filters?catalogId=uGrT9sX2clUBV30mw3yl&skip=0&limit=50000&orderBy=undefined&formatDependents=false&effectiveDatesRange=2023-09-05%2C2023-09-05
  rj("courses-ml.json").then(d => { d.emphasis = "Machine Learning"; return d; }),

  // https://app.coursedog.com/api/v1/cm/byu/courses/search/%24filters?catalogId=uGrT9sX2clUBV30mw3yl&skip=0&limit=50000&orderBy=undefined&formatDependents=false&effectiveDatesRange=2023-09-05%2C2023-09-05
  rj("courses-se.json").then(d => { d.emphasis = "Software Engineering"; return d; }),
]);

writeFile("courses-processed.json", JSON.stringify(courses.reduce((a, e) => a.concat(e.data.map(c => {
  const match = a.find(course => course.code === c.code);
  if (match) { if (e.emphasis) match.emphases.push(e.emphasis); return; }
  c.emphases = e.emphasis? [e.emphasis] : [];

  delete c._id;
  delete c.archived;
  delete c.campuses;
  delete c.college;
  delete c.createdAt;
  delete c.createdBy;
  delete c.departments;
  delete c.dependents;
  delete c.effectiveEndDate;
  delete c.effectiveStartDate;
  delete c.endTerm;
  delete c.gradedComponent;
  delete c.instructionalMethods;
  delete c.lastEditedAt;
  delete c.lastEditedBy;
  delete c.primaryComponent;
  delete c.requirementGroup;
  delete c.requirementLevels;
  delete c.startTerm;
  delete c.status;
  delete c.topics;
  delete c.version;
  delete c.campus;
  delete c.career;
  delete c.cipCode;
  delete c.consent;
  delete c.designation;
  delete c.division;
  delete c.dropConsent;
  delete c.dynamicClassDateRule;
  delete c.equivalentCourseGroup;
  delete c.gradeMode;
  delete c.hegisCode;
  delete c.instructionMode;
  delete c.instructorEdit;
  delete c.location;
  delete c.notes;
  delete c.registrationMode;
  delete c.requirementDesignation;
  delete c.rolloverSetting;
  delete c.scheduleDisplayName;
  delete c.tuitionGroup;
  delete c.type;
  delete c.allowIntegration;
  delete c.requestId;
  delete c.requestStatus;

  //c.attributes = c.attributes?.[0]||""
  delete c.attributes;

  for (const [type, hours] of Object.entries(c.credits)) {
    if (hours.min == hours.value) delete hours.min;
    delete hours.operator;
  }

  for (const [k,v] of Object.entries(c.customFields)) {
    if (k == "NhsNd") continue;
    if (k == "zYNKv") continue;
    if (k == "Ht0vh") continue;
    if (k == "IJySx") continue;
    if (k == "cF5xf") continue;
    if (k == "NO4xd") continue;
    if (k == "lastSyncd") continue;
    if (k == "typeofchange") continue;
    if (k == "teachingArea") continue;
    c[k] = v;
  }
  delete c.customFields;
  return c;
}).filter(c => c)), [])));
