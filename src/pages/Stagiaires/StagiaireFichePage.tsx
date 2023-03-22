import React, { useEffect, useState } from 'react'
import { Stagiaire } from '../../models/Stagiaire'
import { stagiaireService } from '../../services/StagiaireService'
import StagiaireFiche from '../../components/fiche/StagiaireFiche'
import StagiaireList from '../../components/lists/Stagiaire/StagiaireList'

const StagiaireFichePage = () => {

  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([])

  const [currentPage, setCurrentPage] = useState('Fiche')

  useEffect(() => {
    getAllStagiaire()
  }, [])

  const getAllStagiaire = () => {
    stagiaireService.findAllStagiaires().then(data => setStagiaires(data))
  }

  const handleUpdateStagiaire = (stagiaire : Stagiaire) => {
    setStagiaires(stagiaires.map((s) => (s.id === stagiaire.id ? stagiaire : s)));
  }

  return (
    <>
      {stagiaires &&
        <>
          <StagiaireFiche stagiaires={stagiaires} onUpdateStagiaire={handleUpdateStagiaire}/>
          <StagiaireList stagiaires={stagiaires} currentPage={currentPage}/>
        </>
      }
    </>
  )
}

export default StagiaireFichePage