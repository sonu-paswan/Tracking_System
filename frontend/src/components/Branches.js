import React from "react";
import { Link } from "react-router-dom";
const branches = [
  { name: "CSE", description: "Computer Science and Engineering" },
  { name: "ECE", description: "Electronics and Communication Engineering" },
  { name: "ME", description: "Mechanical Engineering" },
  { name: "EE", description: "Electrical Engineering" },
  { name: "CE", description: "Civil Engineering" },
];

function Branches() {
  return (
    <div className="branches-container">
      {branches.map((branch, index) => (
        <div key={index} className="branch">
        <Link to={"/"+branch.name}style={{ textDecoration: "none", color: "inherit" }}>
          <h3>{branch.name}</h3>
          <p>{branch.description}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Branches;
