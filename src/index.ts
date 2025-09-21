// index.ts
// Connects UI elements (forms, buttons, lists) with dataService functions.

import {
  fetchStudents,
  createStudent,
  removeStudent,
  fetchTranscript,
  addCourseGrade
} from "./dataService.js";

const studentList = document.getElementById("studentList") as HTMLDivElement;
const addStudentForm = document.getElementById("addStudentForm") as HTMLFormElement;

// Load and display all students
async function loadStudents() {
  try {
    const students = await fetchStudents();
    studentList.innerHTML = "";

    students.forEach((s: any) => {
      const div = document.createElement("div");
      div.innerHTML = `
        ${s.studentID} - ${s.studentName}
        <button data-id="${s.studentID}" class="view">View Transcript</button>
        <button data-id="${s.studentID}" class="delete">Delete</button>
      `;
      studentList.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    alert("Error loading students");
  }
}

// Add new student
addStudentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = Number((document.getElementById("studentID") as HTMLInputElement).value);
  const name = (document.getElementById("studentName") as HTMLInputElement).value;

  try {
    await createStudent(id, name);
    await loadStudents();
  } catch (err) {
    console.error(err);
    alert("Error adding student");
  }
});

// Handle delete or view transcript actions
studentList.addEventListener("click", async (e) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains("delete")) {
    const id = Number(target.dataset.id);
    try {
      await removeStudent(id);
      await loadStudents();
    } catch (err) {
      console.error(err);
      alert("Error deleting student");
    }
  }

  if (target.classList.contains("view")) {
    const id = Number(target.dataset.id);
    try {
      const transcript = await fetchTranscript(id);
      alert(JSON.stringify(transcript, null, 2));
    } catch (err) {
      console.error(err);
      alert("Error fetching transcript");
    }
  }
});

// Initial load
loadStudents();
