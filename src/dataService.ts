// dataService.ts
// Provides a clean interface for working with students and transcripts.
// Wraps remoteService.ts so index.ts only deals with UI logic.

import * as api from "./remoteService.js";

// Fetch all students
export async function fetchStudents() {
  return api.getStudents();
}

// Add a new student
export async function createStudent(studentID: number, studentName: string) {
  return api.addStudent({ studentID, studentName });
}

// Delete a student
export async function removeStudent(studentID: number) {
  return api.deleteStudent(studentID);
}

// Fetch transcript for a student
export async function fetchTranscript(studentID: number) {
  return api.getTranscript(studentID);
}

// Add a grade to a student's transcript
export async function addCourseGrade(studentID: number, course: string, grade: number) {
  return api.addGrade(studentID, course, grade);
}
