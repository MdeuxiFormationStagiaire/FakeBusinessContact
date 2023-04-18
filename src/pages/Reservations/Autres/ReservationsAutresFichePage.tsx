import React, { useEffect, useState } from 'react'
import AutreFiche from '../../../components/fiche/Autre/AutreFiche';
import AutreList from '../../../components/lists/Autre/AutreList';
import { Autre } from '../../../models/Reservation/Autre';
import { autreService } from '../../../services/Reservation/AutreService';

const ReservationsAutresFichePage = () => {

  const [autres, setAutres] = useState<Autre[]>([])

  const [currentPage, setCurrentPage] = useState('Fiche')

  useEffect(() => {
    getAllAutres()
  }, [])

  const getAllAutres = () => {
    autreService.findAllAutres().then(data => setAutres(data))
  }

  const handleUpdateAutre = (autre : Autre) => {
    setAutres(autres.map((a) => (a.id === autre.id ? autre : a)));
  }
  
  return (
    <>
      {autres &&
        <>
          <AutreFiche
            onUpdateAutre={handleUpdateAutre}
          />
          <AutreList 
            autres={autres} 
            currentPage={currentPage}
          />
        </>
      }
    </>
  )
}

export default ReservationsAutresFichePage