import React, { useEffect, useState } from 'react'
import AddUtilisateur from '../../components/add/AddUtilisateur'
import UtilisateurList from '../../components/lists/UtilisateurList'
import { Utilisateur } from '../../models/Utilisateur'
import { utilisateurService } from '../../services/UtilisateurService'

const UtilisateurAddPage = () => {

  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([])

  const [currentPage, setCurrentPage] = useState('Add')

  useEffect(() => {
    getAllUtilisateurs()
  }, [])

  const getAllUtilisateurs = () => {
    utilisateurService.findAllUtilisateurs().then(data => setUtilisateurs(data))
  }
  
  const addNewUtilisateur = (utilisateur : Utilisateur) => {
    utilisateurService.createUtilisateur(utilisateur).then(() => getAllUtilisateurs())
  }
  
  return (
    <>
      <AddUtilisateur addNewUtilisateur={addNewUtilisateur}/>
      <UtilisateurList utilisateurs={utilisateurs} currentPage={currentPage}/>
    </>
  )
}

export default UtilisateurAddPage