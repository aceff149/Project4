import React from 'react';
import  {useEffect, useState} from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';


const QuestionsPage = () => {

    const {id} = useParams()
  const [listings, setListings] = useState([])


  useEffect(() => {
    async function fetchQuestions () {
        try {
          console.log ( "Fetching questions from db ...")
      const response = await axios.get (`http://localhost:4000/api/questions/${id}`)
      setListings (response.data)  
        } catch (err){
            console.error(err)
        }
    }  
    fetchQuestions();
  }, [id])

  if (!listings){
    return(
        <div>words</div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Questions</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        {listings.map((listing) => (
          <div key={listing.id} style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff'
          }}>
            {/* <img src={listing.image} alt={listing.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} /> */}
            <div style={{ padding: '15px' }}>
              <h3>{listing.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsPage;