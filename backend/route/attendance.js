const express = require("express");
const db = require("../config"); // Assuming this imports your Firebase configuration correctly
const {
  collection,
  query,
  where,
  addDoc,
  getDocs,
} = require("firebase/firestore");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "TimeTable"));
    const users = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      users.push({
        id: doc.id,
        data: userData,
      });
    });
    let thursday = 
    console.log(users[0].data.timetable.Thursday["11-12"]["1"].subject);
    // Send the users array as a response
    res.status(200).json(users);
  } catch (e) {
    console.error("Error getting documents: ", e);
    res.status(500).send("Error getting users.");
  }
});
module.exports = router;
