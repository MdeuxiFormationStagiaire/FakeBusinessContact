import { useEffect, useState } from 'react'
import { Stagiaire } from '../../models/Stagiaire';
import { stagiaireService } from '../../services/StagiaireService';
import StagiaireList from '../../components/lists/StagiaireList';
import '../../assets/styles/pages/Stagiaire.css'
import { useNavigate } from 'react-router-dom';

const StagiairesPage = () => {

  const navigate = useNavigate();

  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([]);

  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    getAllStagiaire()
  }, [])

  const getAllStagiaire = () => {
    stagiaireService.findAllStagiaires().then(data => setStagiaires(data))
  }

  const handleAddButtonNav = () => {
    navigate('/stagiaires/add')
  };

  return (
    <>
      <div className='addButtonBox'>
        <button className='addButton' onClick={handleAddButtonNav}>Ajouter</button>
      </div>
      <StagiaireList stagiaires={stagiaires} currentPage={currentPage}/>
    </>
  )
}

export default StagiairesPage