import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SalleList from '../../components/lists/Salle/SalleList';
import { Salle } from '../../models/Salle';
import { salleService } from '../../services/SalleService';

const SallesPage = () => {

  const navigate = useNavigate();

  const [salles, setSalles] = useState<Salle[]>([]);

  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    getAllSalles()
  }, [])

  const getAllSalles = () => {
    salleService.findAllSalles().then(data => setSalles(data))
  }

  const handleAddButtonNav = () => {
    navigate('/salles/add')
  };
  
  return (
    <>
      <div className='addButtonBox'>
        <button className='addButton' onClick={handleAddButtonNav}>Ajouter</button>
      </div>
      <SalleList salles={salles} currentPage={currentPage}/>
    </>
  )
}

export default SallesPage