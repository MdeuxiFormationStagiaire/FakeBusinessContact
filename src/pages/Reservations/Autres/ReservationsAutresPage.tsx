import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AutreList from '../../../components/lists/Autre/AutreList';
import { Autre } from '../../../models/Reservation/Autre';
import { autreService } from '../../../services/Reservation/AutreService';

const ReservationsAutresPage = () => {

  const navigate = useNavigate();
  const [autres, setAutres] = useState<Autre[]>([]);
  const [currentPage, setCurrentPage] = useState('Fiche');

  useEffect(() => {
    getAllAutres()
  }, [])
  
  const getAllAutres = () => {
    autreService.findAllAutres().then(data => setAutres(data))
  };

  const handleAddButtonNav = () => {
    navigate('/reservations/autres/add')
  };
  
  return (
    <>
      <div className='addButtonBox'>
        <button className='addButton' onClick={handleAddButtonNav}>Ajouter</button>
      </div>
      <AutreList autres={autres} currentPage={currentPage}/>
    </>
  )
}

export default ReservationsAutresPage