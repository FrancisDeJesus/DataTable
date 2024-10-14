import React, { useState } from "react";
import "./App.css";

// Sample Data
const students = [
  {
    lastName: "Smith",
    firstName: "John",
    course: "IT",
    birthdate: "1995/07/15",
  },
  { lastName: "Doe", firstName: "Jane", course: "CS", birthdate: "1998/11/20" },
  {
    lastName: "Brown",
    firstName: "Mike",
    course: "IS",
    birthdate: "2000/03/09",
  },
];

// Helper function to calculate age based on birthdate
function calculateAge(birthdate) {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

// Helper function to format date as dd/mm/yyyy
function formatDate(birthdate) {
  const date = new Date(birthdate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const DataTable = () => {
  const [filter, setFilter] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  // Filtering function based on name, course, age, and date range
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const age = calculateAge(student.birthdate);
    const minDateCheck = minDate
      ? new Date(minDate) <= new Date(student.birthdate)
      : true;
    const maxDateCheck = maxDate
      ? new Date(maxDate) >= new Date(student.birthdate)
      : true;

    return (
      (fullName.includes(filter.toLowerCase()) ||
        student.course.toLowerCase().includes(filter.toLowerCase()) ||
        age.toString().includes(filter)) &&
      minDateCheck &&
      maxDateCheck
    );
  });

  return (
    <div className="container">
      <h1>Student Data Table</h1>

      <div>
        <input
          type="text"
          placeholder="Filter by name, course, or age"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <input
          type="date"
          placeholder="Min Date"
          value={minDate}
          onChange={(e) => setMinDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="Max Date"
          value={maxDate}
          onChange={(e) => setMaxDate(e.target.value)}
        />
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Course</th>
            <th>Birthdate</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.lastName}</td>
              <td>{student.firstName}</td>
              <td>{student.course}</td>
              <td>{formatDate(student.birthdate)}</td>
              <td>{calculateAge(student.birthdate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <DataTable />
    </div>
  );
}

export default App;
