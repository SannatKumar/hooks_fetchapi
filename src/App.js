import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  //useEffect similar to componentdidMount

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=1")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="table">
        <Table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Type</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td> {item.category} </td>
                <td>{item.type}</td>
                <td>{item.difficulty}</td>
              </tr>
            ))}
          </tbody>
          {items.map((item) => (
            <tbody>
              <tr>
                <td colSpan="2">Question</td>
                <td>{item.question}</td>
              </tr>
              <tr>
                <td colSpan="4" align="center">
                  Answers
                </td>
              </tr>
              <tr>
                <td colSpan="2" align="center">
                  {" "}
                  {item.correct_answer}{" "}
                </td>
                <td colSpan="2" align="center">
                  {item.incorrect_answers[0]}
                </td>
              </tr>
              <tr>
                <td colSpan="2" align="center">
                  {item.incorrect_answers[1]}
                </td>
                <td colSpan="2" align="center">
                  {item.incorrect_answers[2]}
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    );
  }
}

export default App;
