import React, { useEffect, useState } from 'react'
import SalleFiche from '../../components/fiche/SalleFiche'
import SalleList from '../../components/lists/SalleList'
import { Salle } from '../../models/Salle'
import { salleService } from '../../services/SalleService'

const SalleFichePage = () => {

  const [salles, setSalles] = useState<Salle[]>([])

  const [currentPage, setCurrentPage] = useState('Fiche')

  useEffect(() => {
    getAllSalles()
  }, [])

  const getAllSalles = () => {
    salleService.findAllSalles().then(data => setSalles(data))
  }

  const handleUpdateSalle = (salle : Salle) => {
    setSalles(salles.map((s) => (s.id === salle.id ? salle : s)));
  }

  return (
    <>
      {salles &&
        <>
          <SalleFiche salles={salles} onUpdateSalle={handleUpdateSalle}/>
          <SalleList salles={salles} currentPage={currentPage}/>
        </>
      }
    </>
  )
}

export default SalleFichePage