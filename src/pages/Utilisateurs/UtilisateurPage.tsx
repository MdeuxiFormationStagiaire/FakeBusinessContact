import React, { useEffect, useState } from 'react'
import UtilisateurList from '../../components/lists/UtilisateurList';
import { Utilisateur } from '../../models/Utilisateur';
import { utilisateurService } from '../../services/UtilisateurService';
import '../../assets/styles/pages/Utilisateur.css'
import { useNavigate } from 'react-router-dom';

const UtilisateurPage = () => {

  const navigate = useNavigate();
  
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);

  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    getAllUtilisateurs()
  }, [])

  const getAllUtilisateurs = () => {
    utilisateurService.findAllUtilisateurs().then(data => setUtilisateurs(data))
  }

  const handleAddButtonNav = () => {
    navigate('/utilisateurs/add')
  };

  return (
    <>
      <div className='addButtonBox' onClick={handleAddButtonNav}>
        <button className='addButton'>Ajouter</button>
      </div>
      <UtilisateurList utilisateurs={utilisateurs} currentPage={currentPage}/>
    </>
  )
}

export default UtilisateurPage