import { useEffect, useState } from 'react';
import { Formateur } from '../../models/Formateur';
import { formateurService } from '../../services/FormateurService';
import FormateurList from '../../components/lists/Formateur/FormateurList'
import '../../assets/styles/pages/Formateur.css'
import { useNavigate } from 'react-router-dom';

const FormateursPage = () => {

  const navigate = useNavigate();

  const [formateurs, setFormateurs] = useState<Formateur[]>([]);

  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    getAllFormateur()
  }, [])

  const getAllFormateur = () => {
    formateurService.findAllFormateurs().then(data => setFormateurs(data))
  }

  const handleAddButtonNav = () => {
    navigate('/formateurs/add')
  };

  return (
    <>
      <div className='addButtonBox'>
        <button className='addButton' onClick={handleAddButtonNav}>Ajouter</button>
      </div>
      <FormateurList formateurs={formateurs} currentPage={currentPage}/>
    </>
  )
}

export default FormateursPage