import React, {useState, useEffect} from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios'

export default function ListQuestions({categoryID, setCategoryID}) {
  const [questions, setQuestions] = useState([])

    useEffect(() => {
      async function fetchQuestions (categoryID) {
        console.log ( `Fetching questoins from db ${categoryID} ...`)
        const response = await axios.get (`http://localhost:4000/questions/${categoryID}`)
        setQuestions (response.data)
      }
      fetchQuestions(categoryID);
    }, [categoryID])

  return (
    <>
    {
      questions.map((question,index)=> (
        <p key={index}>{question.title}</p>
      ))
    }
    </>
  )
}