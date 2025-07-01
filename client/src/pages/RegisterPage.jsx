import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

export default function RegisterUser() {
    const [formData, setFormData] = useState ({
    userName: "",
    password: ""
  })

  function handleChange (event) {
    const {name, value} = event.target
    setFormData ({...formData, [name]: value})
  }

  async function handleSubmit (event) {
    try {
      const response = await axios.post ("http://localhost:4000/users/register/", formData)
      console.log (response)
    }
    catch (error) {
      console.log (error)
    }
  }
  return (
     <>
      <h2>Register User</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control type="text" name="userName" placeholder="Username" 
            onChange={(event) => handleChange(event)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" 
          onChange={(event) => handleChange(event)} />
        </Form.Group>

        <Button type="button" onClick={(event) => handleSubmit(event)}>Submit form</Button>
    </Form>
    </>
  )
}