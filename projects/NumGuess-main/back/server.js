//used to connect express to DB

const express = require("express");
const app = express();
const cors = require("cors");
//tells where the config files is located
require("dotenv").config({ path: "./config.env" });
//set port can set a port stinng
const port = process.env.PORT || 5000;

//this is the middle ware. express is now using cors
app.use(cors());
//express will use json
app.use(express.json());

app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
        if (err)
        {
            console.error(err);
        } 
   });
  console.log(`Server is running on port: ${port}`);
});