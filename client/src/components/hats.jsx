import React from 'react';
import  {useEffect, useState} from 'react';
import axios from 'axios'

// const listings = [
//   {
//     id: 1,
//     title: 'Always Cold',
//     image: "./images/alwayscold.jpg"
//   },
//   {
//     id: 2,
//     title: 'Call Her Caddie',
//     image: "./images/caddie(1).jpg"
//   },
//   {
//     id: 3,
//     title: 'Hot Girl Halloween',
//     images: "./images/haloween.jpg"
//   },
//     {
//     id: 4,
//     title: 'Hey Cowboy',
//     images: "./images/heycowboy.jpg"
//   },
//     {
//     id: 5,
//     title: 'Pumpking Season',
//     images: "./images/pumpkinseason.jpg"
//   },
//     {
//     id: 6,
//     title: 'Sombebodys Problem',
//     images: "./images/somebodysproblem.jpg"
//   },
//     {
//     id: 7,
//     title: 'Vandy',
//     images: "./images/vandy.jpg"
//   },
//     {
//     id: 8,
//     title: 'Vols',
//     images: "./images/vols.jpg"
//   },
//     {
//     id: 9,
//     title: 'Wonderwoman',
//     images: "./images/wonderwoman.jpg"
//   },
//     {
//     id: 10,
//     title: 'What the Fish',
//     images: "./images/wtfish.jpg"
//   },

// ];



const ListingPage = () => {

  const [listings, setListings] = useState([])


  useEffect(() => {
    async function fetchHats () {
      console.log ( "Fetching hats from db ...")
      const response = await axios.get ('http://localhost:4000/hats/')
      setListings (response.data)
    }  
    fetchHats();
  }, [])



  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Hats</h1>
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
            <img src={listing.image} alt={listing.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '15px' }}>
              <h3>{listing.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingPage;

