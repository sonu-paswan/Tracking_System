import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
const branches = [
  { name: "CSE", description: "Computer Science and Engineering" },
  { name: "ECE", description: "Electronics and Communication Engineering" },
  { name: "ME", description: "Mechanical Engineering" },
  { name: "EE", description: "Electrical Engineering" },
  { name: "CE", description: "Civil Engineering" },
];

function Branches(props) {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const navigate= useNavigate();
  const handleBranchMouseOver=(branchName)=>{
    setSelectedBranch(branchName);
  }
  const handleBranchMouseOut=()=>{
    setSelectedBranch(null);
  }
  const handleYearSelection = (branch, year) => {
      console.log(branch,year);
      navigate('/attendance/branches/'+branch+'/'+year);
  };
  return (
    <div>
      {props.isTrack ? (
        <div>
          <h1 style={{ marginLeft: "-3rem", color: "white" }}>
            Select Branch to track
          </h1>
          <div className="branches-container">
            {branches.map((branch, index) => (
              <div key={index} className="branch">
                <Link
                  to={"/student/" + branch.name}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h3>{branch.name}</h3>
                  <p>{branch.description}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 style={{ marginLeft: "-3rem", color: "white" }}>
            Select Branch to see Attendance
          </h1>
          <div className="branches-container">
            {branches.map((branch, index) => (
              <div
                key={index}
                className="branch"
                onMouseOver={()=>handleBranchMouseOver(branch.name)}
                onMouseOut={()=>handleBranchMouseOut()}
              >
                <h3>{branch.name}</h3>
                <p>{branch.description}</p>
                {selectedBranch===branch.name && (
                  <div className="year-selection">
                    <h3>Select Year</h3>
                    <div className="year-buttons">
                      <button className="year-button"
                        onClick={() => handleYearSelection(selectedBranch, 1)}
                      >
                        1st Year
                      </button>
                      <button className="year-button"
                        onClick={() => handleYearSelection(selectedBranch, 2)}
                      >
                        2nd Year
                      </button>
                      <button className="year-button"
                        onClick={() => handleYearSelection(selectedBranch, 3)}
                      >
                        3rd Year
                      </button>
                      <button className="year-button"
                        onClick={() => handleYearSelection(selectedBranch, 4)}
                      >
                        4th Year
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Branches;
