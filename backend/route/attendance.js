const express = require("express");
const db = require("../config");
const {collection, query, where, addDoc, getDocs } = require('firebase/firestore');
const router = express.Router();


router.get('/register', async (req, res) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
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


router.post('/register', async (req, res) => {
    
    try {
        const docRef = await addDoc(collection(db, "users"), req.body);
        console.log("Document written with ID: ", docRef.id);
        res.status(200).send("User added successfully.");
      } catch (e) {
        console.error("Error adding document: ", e);
        res.status(500).send("Error adding user.");
      }
});


router.get('/student/:Branch', async (req, res) => {
  const branch = req.params.Branch; 
  console.log('Branch:', branch);
  
  try {
      const q = query(collection(db, 'users'), where('Branch', '==', branch));
      const querySnapshot = await getDocs(q);

      console.log('Query result length:', querySnapshot.docs.length);
      const students = [];
      querySnapshot.forEach((doc) => {
          students.push({
              id: doc.id,
              data: doc.data()
          });
      });

      // console.log('Students:', students);
      
      // Send the students array as a response
      res.status(200).json(students);
  } catch (error) {
      console.error('Error getting documents: ', error);
      res.status(500).send('Error getting students.');
  }
});


router.get('/student/:Branch/:Year', async (req, res) => {
  const branch = req.params.Branch;
  const year = parseInt(req.params.Year); // Convert year to integer if necessary

  try {
    // Create a query to fetch documents from "users" collection where branch and year match the requested values
    const q = query(collection(db, 'users'), where('Branch', '==', branch), where('Year', '==', year));
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
});


router.get('/student/:Year', async (req, res) => {
  const year = req.params.Year; 
  console.log('Year:', year);
  
  try {
      const q = query(collection(db, 'users'), where('Year', '==', year));
  
      const querySnapshot = await getDocs(q);

      console.log('Query result length:', querySnapshot.docs.length);
      const students = [];
      querySnapshot.forEach((doc) => {
          students.push({
              id: doc.id,
              data: doc.data()
          });
      });

      // console.log('Students:', students);
      res.status(200).json(students);
  } catch (error) {
      console.error('Error getting documents: ', error);
      res.status(500).send('Error getting students.');
  }
});



module.exports=router;