// remoteService.ts
// Mock backend: stores students and transcripts in memory instead of calling a server.

let students: { studentID: number; studentName: string }[] = [];
let transcripts: Record<number, { course: string; grade: number }[]> = {};

// GET all students
export async function getStudents() {
  return students;
}

// POST a new student
export async function addStudent(student: { studentID: number; studentName: string }) {
  students.push(student);
  transcripts[student.studentID] = [];
  return student;
}

// DELETE a student by ID
export async function deleteStudent(studentID: number) {
  students = students.filter(s => s.studentID !== studentID);
  delete transcripts[studentID];
}

// GET transcript for a specific student
export async function getTranscript(studentID: number) {
  return transcripts[studentID] || [];
}

// POST a grade for a student's transcript
export async function addGrade(studentID: number, course: string, grade: number) {
  if (!transcripts[studentID]) transcripts[studentID] = [];
  const gradeEntry = { course, grade };
  transcripts[studentID].push(gradeEntry);
  return gradeEntry;
}
