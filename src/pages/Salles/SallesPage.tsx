import React, { useEffect, useState } from 'react'
import SalleList from '../../components/lists/SalleList';
import { Salle } from '../../models/Salle';
import { salleService } from '../../services/SalleService';

const SallesPage = () => {

  const [salles, setSalles] = useState<Salle[]>([]);

  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    getAllSalles()
  }, [])

  const getAllSalles = () => {
    salleService.findAllSalles().then(data => setSalles(data))
  }
  
  return (
    <>
      <a href="/salles/add" className='addButtonBox'>
        <button className='addButton'>Ajouter</button>
      </a>
      <SalleList salles={salles} currentPage={currentPage}/>
    </>
  )
}

export default SallesPage