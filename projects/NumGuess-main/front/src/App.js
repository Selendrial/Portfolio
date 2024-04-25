import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 // We import all the components we need in our app
import Navbar from "./components/navbar";
import CreateUser from "./components/getUser";
import Guess from "./components/logic";
import Results from "./components/results";

 const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
      <Route exact path="/" element={<CreateUser/>} />
      <Route path = "/logic/:id" element={<Guess/>} />
      <Route path = "/results" element={<Results/>} />
     </Routes>
   </div>
 );
};
 export default App;