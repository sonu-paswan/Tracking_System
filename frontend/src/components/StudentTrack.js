import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const headerStyle={
  color:"white"
}
function StudentTrack() {
  const { roll_no } = useParams();
  const [Roll_no, setRoll] = useState("");
  const [TrackDetail, setTrackDetail] = useState([]);
  useEffect(() => {
    setRoll(roll_no);
    if(Roll_no){
      fetchStudentTrack(Roll_no);
    }
  }, [Roll_no]);
  const fetchStudentTrack = async (rollNumber) => {
    try {
      const response = await fetch(`http://localhost:4000/track/${Roll_no}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setTrackDetail(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="student-list-container">
      <h1 style={headerStyle}>Track Detail for {Roll_no}</h1>
      <ul className="student-list">
        {TrackDetail.map((student) => (
          <li key={student.id} className="student-item">
            <strong>ID:</strong> {student.data.rfid_id}
            <br />
            {/* <strong>Role Number:</strong> {student.data.Roll_no} */}
            {/* <br /> */}
            <strong>Name:</strong> {student.data.name}
            <br />
            {/* <strong>Branch:</strong> {student.data.Branch}
            <br /> */}
            {/* <strong>Year:</strong> {student.data.Year}
            <br /> */}
            <strong>Node Number:</strong> {student.data.node_id}
            <br />
            {/* <strong>Date:</strong> {student.data.Date}
            <br /> */}
            <strong>Time:</strong> {student.data.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentTrack;
