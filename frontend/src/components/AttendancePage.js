import React, { useState } from "react";
import "../AttendancePage.css";
function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedRollNo, setSelectedRollNo] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  // subject options
  const subject = {
    cse: {
      1: [],
      2: [],
      3: [],
      4: ["NLP", "Crpto", "PRIP", "IWT"],
    },
    ece: {
      1: [],
      2: [],
      3: [],
      4: [],
    },
    ee: {
      1: [],
      2: [],
      3: [],
      4: [],
    },
    me: {
      1: [],
      2: [],
      3: [],
      4: [],
    },
    ce: {},
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleRollNoChange = (event) => {
    setSelectedRollNo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can fetch attendance data based on the selected options
    // For demonstration, let's assume we have a dummy attendance data array
    const dummyAttendanceData = [
      { rollNo: "CSE2008", name: "Sonu Paswan", present:true},
      { rollNo: "CSE2028", name: "Harsh Pathak", present: true },
      { rollNo: "CSE2027", name: "Baburam Yadav", present: false },
      { rollNo: "CSE2006", name: "Rikto Padu", present:false}
      // Add more dummy data here as needed
    ];
    setAttendanceData(dummyAttendanceData);
  };

  return (
    <div className="attendance-page">
      <h1>Attendance Page for CSE</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Select Subject:</label>
          <select id="subject" name="subject">
            {subject["cse"]["4"].map((sub, index) => (
              <option key={index} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rollNo">Roll No:</label>
          <input
            type="text"
            id="rollNo"
            name="rollNo"
            value={selectedRollNo}
            onChange={handleRollNoChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="attendance-list">
        <h2>Attendance List</h2>
        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((student, index) => (
              <tr key={index}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                <td>{student.present ? "Present" : "Absent"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendancePage;
