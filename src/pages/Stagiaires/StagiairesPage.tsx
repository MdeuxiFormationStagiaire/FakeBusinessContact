import { useEffect, useState } from 'react'
import { Stagiaire } from '../../models/Stagiaire';
import { stagiaireService } from '../../services/StagiaireService';
import StagiaireList from '../../components/lists/StagiaireList';
import '../../assets/styles/pages/Stagiaire.css'

const StagiairesPage = () => {

  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([]);

  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    getAllStagiaire()
  }, [])

  const getAllStagiaire = () => {
    stagiaireService.findAllStagiaires().then(data => setStagiaires(data))
  }

  return (
    <>
      <a href="/stagiaires/add" className='addButtonBox'>
        <button className='addButton'>Ajouter</button>
      </a>
      <StagiaireList stagiaires={stagiaires} currentPage={currentPage}/>
    </>
  )
}

export default StagiairesPage