import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

export default function Guess() {
  //only used if won
  const [numGuess, setNumGuess] = useState({
    numGuess: 0,
  });
  const [uMessage, setuMessage] = useState("");
  const [inGame, setInGame] = useState(true);
  const [isWinner, setIsWinner] = useState(false);
  const [form, setForm] = useState({
     guess: "", 
    });
  

  //collects user IS from URL
  const params = useParams();
  const id = params.id.toString();

  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) 
  {
    e.preventDefault();

    
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newGuess = { ...form }; //unpacts the form object
    const response = await fetch(`http://localhost:5000/c/${id}`, {
      method: "POST",
      body: JSON.stringify(newGuess), // This is the body of the post request turned to a string.
      headers: 
      {
        "Content-Type": "application/json",
      },
    })
    .catch(error => 
    {
      window.alert(error);
      return;
    });

    //returns the result of the post request that checks if the guess is correct or not.
    const guessResult = await response.json();
    



        //fetch retrieves data from the database through the URL
        const uNumGuess = await fetch(`http://localhost:5000/guess/${id}`);
          if (!uNumGuess.ok) {
          const message = `An error has occurred: ${uNumGuess.statusText}`;
          window.alert(message);
          return;
        }
        const numGuesses = await uNumGuess.json();
        
        if (!uNumGuess) {
          window.alert(`Record with id ${id} not found`);
          navigate("/");
          return;
        }
      
      setNumGuess(numGuesses);


    if (guessResult.bCheck === "Too high!") {

      setuMessage(guessResult.bCheck);
      setInGame(false);
    } 
    else if (guessResult.bCheck === "Too low!") 
    {
      setuMessage(guessResult.bCheck);
      setInGame(false);
    }
    else if (guessResult.bCheck === "Correct!") 
    {
      setuMessage(guessResult.bCheck);
      setInGame(false);
      setIsWinner(true);
    }



    // Navigate to the new game component with user data

    if(guessResult.bCheck === "Too high!" || guessResult.bCheck === "Too low!")
    {    
      //set form bank
      setForm({guess: ""});
      navigate('/logic/' + id);
    }
    
  }


  
  return (
    // This following section will display the form that takes input from the user to update the data.
    <div className="container" style={{ margin: 20 }}>
      { !isWinner ? (
        <>
          <h3>Enter a guess</h3>
          <form onSubmit={onSubmit}>
            <div className="form-game row pt-4">

              <label htmlFor="guess">{uMessage}</label>
              <input
                type="text"
                className="form-control col-6"
                id="guess"
                value={form.guess}
                onChange={(e) => updateForm({ guess: e.target.value })}
                autoComplete="off"
              />
            </div>
            <div className="form-game">
              <br/>
              <input
                type="submit"
                value="Guess"
                className="btn btn-primary"
              />
            </div>
          </form>
        </>
      ) : (
        <>
          <h3>Congratulations you won</h3>
          <p>It took you {numGuess} guesses</p>
          <div className="form-game row pt-4">
            <br/>
          </div>
          <div className="form-game">
            <br/>
            <button className="btn btn-primary" onClick={() => navigate('/results')}>
              Go to High Score
            </button>
          </div>
        </>
      )}
    </div>
  );
}