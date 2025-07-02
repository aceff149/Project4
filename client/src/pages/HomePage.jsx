import React, {useState} from 'react'
import categoryList from '../components/categoryList'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import questionList from '../components/questionList';

export default function HomePage() {
  const [categoryID, setCategoryID] = useState (1)
  return (
    <Container>
      <Row>
        <Col><categoryList categoryID={categoryID} setCategoryID={setCategoryID} /></Col>
        <Col><questionList categoryID={categoryID} setCategoryID={setCategoryID} /></Col>
      </Row>
    </Container>
  )
}