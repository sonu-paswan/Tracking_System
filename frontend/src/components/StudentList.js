import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../StudentList.css"; 

function StudentList() {
  const { branch } = useParams();
 
  const [Branch,setBranch]=useState("");
  
  const [selectedYear, setSelectedYear] = useState("");
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    setBranch(branch);
    if (selectedYear || Branch) {
    //   setLoading(true);
      fetchStudentData(selectedYear, Branch);
    }
  }, [selectedYear, Branch]);

  const fetchStudentData = async (year, branch) => {
    try {
      const response = await fetch(
        `http://localhost:4000/${branch}/${year}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      console.log(error.message);
    } 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchStudentData(selectedYear, Branch);
  };
  return (
    <div className="student-list-container">
      <form onSubmit={handleSubmit} className="search-form">
        <label
          htmlFor="Year"
          className="search-label"
          style={{ color: "white" }}
        >
          Choose Year:
        </label>
        <select
          id="Year"
          name="Year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="search-select"
        >
          <option value="">Select Year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <ul className="student-list">
        {studentData.map((student) => (
          <li key={student.id} className="student-item">
            <strong>ID:</strong> {student.id}
            <br />
            <strong>Role Number:</strong> {student.data.Roll_no}
            <br />
            <strong>Name:</strong> {student.data.Name}
            <br />
            <strong>Branch:</strong> {student.data.Branch}
            <br />
            <strong>Year:</strong> {student.data.Year}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
