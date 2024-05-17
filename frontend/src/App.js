import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Branches from "./components/Branches";
import StudentList from "./components/StudentList";
import StudentTrack from "./components/StudentTrack";
import AttendancePage from "./components/AttendancePage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="track/branches" element={<Branches isTrack={true} />} />
          <Route path ="attendance/branches" element={<Branches isTrack={false}/>}/>
          <Route path='attendance/branches/:branch/:year' element={<AttendancePage/>}></Route>
          <Route path="/student/:branch" element={<StudentList/>}/> 
          <Route path="/track/:roll_no" element={<StudentTrack/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
