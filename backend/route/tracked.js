const express = require("express");
const db = require("../config");
const {collection, query, where, addDoc, getDocs } = require('firebase/firestore');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
      const querySnapshot = await getDocs(collection(db, "tracked"));
      const users = [];
  
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        users.push({
          id: doc.id,
          data: userData
        });
      });
  
      // Send the users array as a response
      res.status(200).json(users);
    } catch (e) {
      console.error("Error getting documents: ", e);
      res.status(500).send("Error getting users.");
    }
  });

  router.get("/:roll_no",async(req,res)=>{
    const roll_no = req.params.roll_no;
  
    try {
      // Create a query to fetch documents from "users" collection where branch and year match the requested values
      const q = query(collection(db, 'tracked'), where('Roll_no', '==', roll_no));
      const querySnapshot = await getDocs(q);
  
      const students = [];
      querySnapshot.forEach((doc) => {
        students.push({
          id: doc.id,
          data: doc.data()
        });
      });
      // Send the students array as a response
      res.status(200).json(students);
    } catch (error) {
      console.error('Error getting documents: ', error);
      res.status(500).send('Error getting students.');
    }
  })

  router.post('/', async (req, res) => {
    
    try {
        const docRef = await addDoc(collection(db, "tracked"), req.body);
        console.log("Document written with ID: ", docRef.id);
        res.status(200).send("User added successfully.");
      } catch (e) {
        console.error("Error adding document: ", e);
        res.status(500).send("Error adding user.");
      }
});


module.exports=router;