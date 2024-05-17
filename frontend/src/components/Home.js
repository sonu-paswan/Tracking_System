import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <div className="About-App">
        An Effective Smart Student Attendance Monitoring and Tracking Management System
        Using IoT
      </div>
      <div className="options-container">
        <div className="option student">
          <h2>Tracking</h2>
          <p style={{ color: "black" }}>Track each and every student</p>
          <Link
            to="track/branches"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button>Explore</button>
          </Link>
        </div>
        <div className="option teacher">
          <h2>Attendance</h2>
          <p style={{ color: "black" }}>Attendance details of every student</p>
          <Link
            to="attendance/branches"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button>check</button>
          </Link>        </div>
      </div>
    </div>
  );
}

export default Home;
