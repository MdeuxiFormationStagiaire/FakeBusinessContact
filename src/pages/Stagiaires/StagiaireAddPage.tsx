import React, { useEffect, useState } from 'react'
import AddStagiaire from '../../components/add/AddStagiaire'
import StagiaireList from '../../components/lists/Stagiaire/StagiaireList'
import { Stagiaire } from '../../models/Stagiaire'
import { stagiaireService } from '../../services/StagiaireService'

const StagiaireAddPage = () => {
  
  const [stagiairesList, setStagiairesList] = useState<Stagiaire[]>([])

  const [currentPage, setCurrentPage] = useState('Add')

  useEffect(() => {
    getAllStagiaires()
  }, [])

  const getAllStagiaires = () => {
    stagiaireService.findAllStagiaires().then(data => setStagiairesList(data))
  }
  
  const addNewStagiaire = (stagiaire : Stagiaire) => {
    stagiaireService.createStagiaire(stagiaire).then(() => getAllStagiaires())
  }

  const addNewStagiairesByImport = async (stagiaires : Stagiaire[]) => {
    const failedStagiaires: {nom: string, prenom: string}[] = [];

    for (const stagiaire of stagiaires) {
      const existingStagiaire = stagiairesList.find(s => s.email === stagiaire.email);
  
      if (existingStagiaire) {
        failedStagiaires.push({nom: stagiaire.last_name, prenom: stagiaire.first_name});
      } else {
        await stagiaireService.createStagiaire(stagiaire);
      }
    }
  
    if (failedStagiaires.length > 0) {
      const failedStagiairesMsg = failedStagiaires.map(s => `${s.prenom} ${s.nom}`).join(', ');
      alert(`Les stagiaires suivants n'ont pas pu être créés : ${failedStagiairesMsg}. Ils existent déjà dans la base de données.`);
    }
  
    getAllStagiaires();
  }

  return (
    <>
      <AddStagiaire 
        addNewStagiaire={addNewStagiaire}
        addNewStagiairesByImport={addNewStagiairesByImport}
      />
      <StagiaireList stagiaires={stagiairesList} currentPage={currentPage}/>
    </>
  )
}

export default StagiaireAddPage