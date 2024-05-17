const express = require("express");
const db = require("../config");
const {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  addDoc
} = require("firebase/firestore");
const router = express.Router();

let timeTable = require('../TimeTable.json');

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

router.get("/", async (req, res) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "live_data"), orderBy("name"))
    );
    const users2=[]
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      users2.push({
        id: doc.id,
        data: userData
      });
    });
    

    const users = [];
    let Time, Time2,ending=0, prevMin=0, totalMin=0;
    

    for(let i=0; i<users2.size()-1; i++) {
      const doc = users2[i];
      const doc2 = users2[i+1];
      const userData = doc.data();
      Time = userData.time;
      let dateString = new Date(
        Time.seconds * 1000 + Time.nanoseconds / 1000000
      );
      let date = new Date(dateString);
      date.setHours(date.getHours() + 1);  
      date.setMinutes(date.getMinutes() + 30)
      let hours = date.getHours(); // Get hours (0-23)
      let minutes = date.getMinutes() + date.getSeconds()/60; // Get minutes (0-59)
      

     //second time
      let userData2 = doc2.data();
      Time2 = userData2.time;
      let dateString2 = new Date(
        Time2.seconds * 1000 + Time2.nanoseconds / 1000000
      );
      let date2 = new Date(dateString2);
      date2.setHours(date2.getHours() + 1.5);  
      date2.setMinutes(date2.getMinutes() + 30)
      let hours2 = date2.getHours(); // Get hours (0-23)
      let minutes2 = date2.getMinutes() + date2.getSeconds()/60; // Get minutes (0-59)
      
      while(doc.UID==doc2.UID && hours==hours2){
        ending=minutes2;
        i++;
        doc2 = users2[i];

        userData2 = doc2.data();
        Time2 = userData2.time;
        dateString2 = new Date(
          Time2.seconds * 1000 + Time2.nanoseconds / 1000000
        );
        date2 = new Date(dateString2);
        date2.setHours(date2.getHours() + 1.5);  
        date2.setMinutes(date2.getMinutes() + 30)
        hours2 = date2.getHours(); // Get hours (0-23)
        minutes2 = date2.getMinutes() + date2.getSeconds()/60; // Get minutes (0-59)

      }
  
      console.log(timeTable.timetable[daysOfWeek[date.getDay()]]);
      console.log(`${ending}-${minutes}`);
      let at='A';
      if(ending-minutes>=30) at='P';
      users.push({
        id: doc.id,
        name: userData.name,
        Subject: timeTable.timetable[daysOfWeek[date.getDay()]]["09-10"][userData.node_id],
        node_id: userData.node_id,
        Attendance: at
      });
    }

    try {
      await Promise.all(users.map(async (data) => {
        const docRef = await addDoc(collection(db, "Attendance"), data); // Use your collection name
      }));
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // Send the users array as a response
    res.status(200).json(users);
  } catch (e) {
    console.error("Error getting documents: ", e);
    res.status(500).send("Error getting users.");
  }
});

module.exports = router;




// const express = require("express");
// const db = require("../config");
// const {
//   getFirestore,
//   collection,
//   query,
//   orderBy,
//   getDocs,
//   addDoc
// } = require("firebase/firestore");
// const router = express.Router();

// let timeTable = require('../TimeTable.json');

// const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// router.get("/", async (req, res) => {
//   try {
//     // const firestore = getFirestore(db);
//     const querySnapshot = await getDocs(
//       query(collection(db, "live_data"), orderBy("name"))
//     );
//     const users = [];
//     let Time,ending=0,prevMin=0,totalMin=0;

//     querySnapshot.forEach((doc) => {
//       const userData = doc.data();
//       Time = userData.time;
//       let dateString = new Date(
//         Time.seconds * 1000 + Time.nanoseconds / 1000000
//       );
//       let date = new Date(dateString);
//       date.setHours(date.getHours() + 1.5);  
//       date.setMinutes(date.getMinutes()+30)
//       const hours = date.getHours(); // Get hours (0-23)
//       const minutes = date.getMinutes() + date.getSeconds()/60// Get minutes (0-59)
//       const seconds = date.getSeconds(); // Get seconds (0-59)

//        console.log(`Date: ${date} IST Time: ${hours}:${minutes}:${seconds}`);
//       if(hours<=ending){
//         totalMin=totalMin+(minutes-prevMin);
//         prevMin=minutes;
//       }else{
//         ending=hours+1;
//         prevMin = minutes;
//       }
  
//       console.log(timeTable.timetable[daysOfWeek[date.getDay()]])
//       console.log(`${hours}-${ending}`)
//       let at='A';
//       if(totalMin>=1)at='P';
//       users.push({
//         id: doc.id,
//         name: userData.name,
//         Subject:timeTable.timetable[daysOfWeek[date.getDay()]]["09-10"][userData.node_id],
//         node_id:userData.node_id,
//         Attendance:at
//       });
//     });

    
//       try {
//         await Promise.all(users.map(async (data) => {
//           const docRef = await addDoc(collection(db, "Attendance"),data); // Use your collection name
          
//         }));
//         } catch (e) {
//           console.error("Error adding document: ", e);
//           // res.status(500).send("Error adding user.");
//         }

//     // Send the users array as a response
//     res.status(200).json(users);
//   } catch (e) {
//     console.error("Error getting documents: ", e);
//     res.status(500).send("Error getting users.");
//   }
// });

// module.exports = router;
