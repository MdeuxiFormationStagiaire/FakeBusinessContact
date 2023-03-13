import React, { useEffect, useState } from 'react'
import AddSalle from '../../components/add/AddSalle'
import SalleList from '../../components/lists/SalleList'
import { Salle } from '../../models/Salle'
import { salleService } from '../../services/SalleService'

const SalleAddPage = () => {

  const [salles, setSalles] = useState<Salle[]>([])

  const [currentPage, setCurrentPage] = useState('Add')

  useEffect(() => {
    getAllSalles()
  }, [])

  const getAllSalles = () => {
    salleService.findAllSalles().then(data => setSalles(data))
  }
  
  const addNewSalle = (salle : Salle) => {
    salleService.createSalle(salle).then(() => getAllSalles())
  }

  
  return (
    <>
      <AddSalle addNewSalle={addNewSalle}/>
      <SalleList salles={salles} currentPage={currentPage}/>
    </>
  )
}

export default SalleAddPage