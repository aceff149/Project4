import React, {useState} from 'react'
import ListCategory from '../components/ListCategory'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListQuestions from '../components/ListQuestions';

export default function HomePage() {
  const [categoryID, setCategoryID] = useState (1)
  return (
    <Container>
      <Row>
        <Col><ListCategory categoryID={categoryID} setCategoryID={setCategoryID} /></Col>
        <Col><ListQuestions categoryID={categoryID} setCategoryID={setCategoryID} /></Col>
      </Row>
    </Container>
  )
}