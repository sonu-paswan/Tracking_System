import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function StudentList(){
    const { roll_no } = useParams();
    const [Roll_no,setRoll]=useState("");
    const [TrackDetail,setTrackDetail]=useState([]);
    useEffect(()=>{},[Roll_no]);
    const studentTrack=async(rollNumber)=>{
        
    }
}

export default StudentList;