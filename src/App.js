import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  //useEffect similar to componentdidMount

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=1")
    .then(res => res.json())
    .then(
      (result) =>{
        setIsLoaded(true);
        setItems(result.results);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, [])

  if(error) {
    return<div>Error: {error.message}</div>;
  }
  else if(!isLoaded) {
    return<div>Loading...</div>;
  }
  else{
    return (
      <ul>
        {items.map(item =>(
          <li key={item.id}>
            {item.category} {item.type} {item.difficulty} {item.question} {item.correct_answer} {item.incorrect_answers}
          </li>
        ))}
      </ul>
  );
}
}

export default App;
