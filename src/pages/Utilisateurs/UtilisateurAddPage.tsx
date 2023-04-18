import React, { useEffect, useState } from 'react'
import AddUtilisateur from '../../components/add/AddUtilisateur'
import UtilisateurList from '../../components/lists/Utilisateur/UtilisateurList'
import { Utilisateur } from '../../models/Utilisateur'
import { utilisateurService } from '../../services/UtilisateurService'

const UtilisateurAddPage = () => {

  const [utilisateursList, setUtilisateursList] = useState<Utilisateur[]>([])

  const [currentPage, setCurrentPage] = useState('Add')

  useEffect(() => {
    getAllUtilisateurs()
  }, [])

  const getAllUtilisateurs = () => {
    utilisateurService.findAllUtilisateurs().then(data => setUtilisateursList(data))
  }
  
  const addNewUtilisateur = (utilisateur : Utilisateur) => {
    utilisateurService.createUtilisateur(utilisateur).then(() => getAllUtilisateurs())
  }

  const addNewUtilisateursByImport = async (utilisateurs : Utilisateur[]) => {
    const failedUtilisateurs: {nom: string, prenom: string}[] = [];

    for (const utilisateur of utilisateurs) {
      const existingUtilisateur = utilisateursList.find(s => s.email === utilisateur.email);
  
      if (existingUtilisateur) {
        failedUtilisateurs.push({nom: utilisateur.last_name, prenom: utilisateur.first_name});
      } else {
        await utilisateurService.createUtilisateur(utilisateur);
      }
    }
  
    if (failedUtilisateurs.length > 0) {
      const failedUtilisateursMsg = failedUtilisateurs.map(s => `${s.prenom} ${s.nom}`).join(', ');
      alert(`Les utilisateurs suivants n'ont pas pu être créés : ${failedUtilisateursMsg}. Ils existent déjà dans la base de données.`);
    }
  
    getAllUtilisateurs();
  }
  
  return (
    <>
      <AddUtilisateur 
        addNewUtilisateur={addNewUtilisateur}
        addNewUtilisateursByImport={addNewUtilisateursByImport}
      />
      <UtilisateurList utilisateurs={utilisateursList} currentPage={currentPage}/>
    </>
  )
}

export default UtilisateurAddPage