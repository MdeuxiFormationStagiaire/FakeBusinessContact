import React, { useEffect, useState } from 'react'
import AddStagiaire from '../../components/add/AddStagiaire'
import StagiaireList from '../../components/lists/StagiaireList'
import { Stagiaire } from '../../models/Stagiaire'
import { stagiaireService } from '../../services/StagiaireService'

const StagiaireAddPage = () => {
  
  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([])

  const [currentPage, setCurrentPage] = useState('Add')

  useEffect(() => {
    getAllStagiaires()
  }, [])

  const getAllStagiaires = () => {
    stagiaireService.findAllStagiaires().then(data => setStagiaires(data))
  }
  
  const addNewStagiaire = (stagiaire : Stagiaire) => {
    stagiaireService.createStagiaire(stagiaire).then(() => getAllStagiaires())
  }

  return (
    <>
      <AddStagiaire addNewStagiaire={addNewStagiaire}/>
      <StagiaireList stagiaires={stagiaires} currentPage={currentPage}/>
    </>
  )
}

export default StagiaireAddPage