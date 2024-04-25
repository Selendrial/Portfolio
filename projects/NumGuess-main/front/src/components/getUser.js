import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";


export default function CreateUser() {
 const [form, setform] = useState({
   name: "",
   guess: 0,
   numGuess: 0,
   target: 0,
   uWon: 0,
 });
 



 const navigate = useNavigate();

  // These methods will update the state properties.
 function updateForm(value) {
   return setform((prev) => {
     return { ...prev, ...value }; // unpacking the object and repacks it . val will overite prev if the data already exists
   });
 }

  // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
   const newUser = { ...form }; //unpacts the form object
   const response = await fetch("http://localhost:5000/HS/add", {
     method: "POST",
     body: JSON.stringify(newUser), // This is the body of the post request turned to a string.
     headers: {
       "Content-Type": "application/json",
     },
     
   })
   .catch(error => {
     window.alert(error);
     return;
   });

   const userData = await response.json();
   const userId = userData.id; // assuming your server responds with the user ID

   //set form bank
    setform({ name: "", guess: 0, numGuess: 0, target: 0, uWon: 0 });
  
    

   // Navigate to the new game component with user data
    navigate('/logic/' + userId);
  }

 // This following section will display the form that takes the input from the user.
 return (
  <div class="container" style={{ margin: 20 }}>
     <h3>Enter Player Name</h3>
     <form onSubmit={onSubmit}> 
       <div className="form-group row pt=4">
       <br/>
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control col-6"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
           autoComplete="off"
         />
       </div>
       <br/>
       <div className="form-group">
         <input
           type="submit" value="Begin Game" className="btn btn-primary"/>
       </div>
     </form>
   </div>
 );
}