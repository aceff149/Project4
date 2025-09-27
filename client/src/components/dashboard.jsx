import React from 'react';
import  {useEffect, useState} from 'react';
import axios from 'axios';
import Hats from './Hats';
import Questions from './questions';
import { Route, Routes } from 'react-router-dom';

const DashboardPage = () => {

  const [listings, setListings] = useState([])


  useEffect(() => {
    async function fetchHats () {
      console.log ( "Fetching hats from db ...")
      const response = await axios.get ('http://localhost:4000/api/hats/')
      setListings (response.data)
    }  
    fetchHats();
  }, [])

  return (
    <div style={{ padding: '20px', display:'flex', height:'100vh' }}>
      <h1 style={{ textAlign: 'center' }}>Dashboard</h1>
      <Hats/>
      {/* <Routes>
        <Route path="/hats/*" element={<Questions/>}/>
        <Route path="/hats/:id" element={<Questions/>}/>
      </Routes> */}
    </div>
  );
};

export default DashboardPage;