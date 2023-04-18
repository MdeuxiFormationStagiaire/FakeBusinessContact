import React, { useEffect, useState } from 'react'
import AddSalle from '../../components/add/AddSalle'
import SalleList from '../../components/lists/Salle/SalleList'
import { Salle } from '../../models/Salle'
import { salleService } from '../../services/SalleService'

const SalleAddPage = () => {

  const [sallesList, setSallesList] = useState<Salle[]>([])

  const [currentPage, setCurrentPage] = useState('Add')

  useEffect(() => {
    getAllSalles()
  }, [])

  const getAllSalles = () => {
    salleService.findAllSalles().then(data => setSallesList(data))
  }
  
  const addNewSalle = (salle : Salle) => {
    salleService.createSalle(salle).then(() => getAllSalles())
  }

  const addNewSallesByImport = async (salles : Salle[]) => {
    const failedSalles: {nom: string}[] = [];

    for (const salle of salles) {
      const existingSalle = sallesList.find(s => s.name === salle.name);
  
      if (existingSalle) {
        failedSalles.push({nom: salle.name});
      } else {
        await salleService.createSalle(salle);
      }
    }
  
    if (failedSalles.length > 0) {
      const failedSallesMsg = failedSalles.map(s => `${s.nom}`).join(', ');
      alert(`Les stagiaires suivants n'ont pas pu être créés : ${failedSallesMsg}. Ils existent déjà dans la base de données.`);
    }
  
    getAllSalles();
  }

  return (
    <>
      <AddSalle 
        addNewSalle={addNewSalle}
        addNewSallesByImport={addNewSallesByImport}
      />
      <SalleList salles={sallesList} currentPage={currentPage}/>
    </>
  )
}

export default SalleAddPage