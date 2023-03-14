import React, { useEffect, useState } from 'react'
import UtilisateurList from '../../components/lists/UtilisateurList';
import { Utilisateur } from '../../models/Utilisateur';
import { utilisateurService } from '../../services/UtilisateurService';

const UtilisateurPage = () => {
  
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);

  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    getAllUtilisateurs()
  }, [])

  const getAllUtilisateurs = () => {
    utilisateurService.findAllUtilisateurs().then(data => setUtilisateurs(data))
  }

  return (
    <>
      <a href="/utilisateurs/add" className='addButtonBox'>
        <button className='addButton'>Ajouter</button>
      </a>
      <UtilisateurList utilisateurs={utilisateurs} currentPage={currentPage}/>
    </>
  )
}

export default UtilisateurPage