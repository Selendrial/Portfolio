const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;


//------------------------Working -------------------------------------------------------
// This section will help you create a new record. and create random number
recordRoutes.route("/HS/add").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb();
    const myobj = {
      name: req.body.name,
      guess: 0,
      numGuess: 0,
      target: Math.floor(Math.random() * 100) + 1,
      uWon: 0,
    }
    const result = await db_connect.collection("HighScore").insertOne(myobj);
    
    // Include the insertedId in the response
    const insertedId = result.insertedId;
    
    res.json({id: insertedId, result});
  } catch (err) {
    throw err;
  }
});




// This section chech the value guesed.
recordRoutes.route("/c/:id").post(async function (req, res) {
  try {
    const db_connect = await dbo.getDb();
    const myquery = { _id: new ObjectId(req.params.id) };

    // Fetch the current document from the database
    const currentDocument = await db_connect.collection("HighScore").findOne(myquery);
    
    let uWonValue;
    if (parseInt(req.body.guess, 10) === currentDocument.target) 
    {
      uWonValue = 1;
    } else {
      uWonValue = currentDocument.uWon;
    }


    const newvalues = {
      $set: 
      {
        name: currentDocument.name,
        guess: parseInt(req.body.guess, 10),
        target: currentDocument.target,
        uWon: uWonValue,
      },
      //increment the number of guesses by 1
      $inc: { numGuess: 1 },

    };

    console.log("target: " +currentDocument.target);
    console.log("guess : " +parseInt(req.body.guess, 10));
    console.log("uWon: " + uWonValue);
    await db_connect.collection("HighScore").updateOne(myquery, newvalues);
    console.log("1 document updated");
    
    res.json({bCheck: check(parseInt(req.body.guess, 10), currentDocument.target)});
  } 
  catch (err) {
    throw err;
  }
});



function check(guess, target) {
  if (guess > target) {
    return "Too high!";
  } else if (guess < target) {
    return "Too low!";
  } else {
    return "Correct!";
  }
}


// This section will help you get a single record by id
recordRoutes.route("/guess/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb();
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("HighScore").findOne(myquery);
    res.json(result.numGuess);
  } catch (err) {
    throw err;
  }
});








// This section will help you get a list of all the records.
recordRoutes.route("/HS").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("NG");
    const result = await db_connect.collection("HighScore").find({}).toArray();

      // Filter records where uWon is greater than 0
      const filteredRecords = result.filter(record => record.uWon > 0);

      // Sort records by numGuess in ascending order
      filteredRecords.sort((a, b) => a.numGuess - b.numGuess);
      
      // Get the first ten records
      const firstTenRecords = filteredRecords.slice(0, 10);


    res.json(firstTenRecords);
  } catch (err) {
    throw err;
  }
});

// This section will help you get a single record by id
recordRoutes.route("/HS/:id").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb();
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("HighScore").findOne(myquery);
    res.json(result);
  } catch (err) {
    throw err;
  }
});


 module.exports = recordRoutes;