import React, { useEffect, useState } from 'react'
import UtilisateurFiche from '../../components/fiche/UtilisateurFiche'
import UtilisateurList from '../../components/lists/Utilisateur/UtilisateurList'
import { Utilisateur } from '../../models/Utilisateur'
import { utilisateurService } from '../../services/UtilisateurService'

const UtilisateurFichePage = () => {

  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([])

  const [currentPage, setCurrentPage] = useState('Fiche')

  useEffect(() => {
    getAllStagiaire()
  }, [])

  const getAllStagiaire = () => {
    utilisateurService.findAllUtilisateurs().then(data => setUtilisateurs(data))
  }

  const handleUpdateUtilisateur = (utilisateur : Utilisateur) => {
    setUtilisateurs(utilisateurs.map((u) => (u.id === utilisateur.id ? utilisateur : u)));
  }

  return (
    <>
      {utilisateurs &&
        <>
          <UtilisateurFiche utilisateurs={utilisateurs} onUpdateUtilisateur={handleUpdateUtilisateur}/>
          <UtilisateurList utilisateurs={utilisateurs} currentPage={currentPage}/>
        </>
      }
    </>
  )
}

export default UtilisateurFichePage