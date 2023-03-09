import { useEffect, useState } from 'react';
import { Formateur } from '../../models/Formateur';
import { formateurService } from '../../services/FormateurService';
import FormateurList from '../../components/lists/FormateurList'
import '../../assets/styles/pages/Formateur.css'

const FormateursPage = () => {

  const [formateurs, setFormateurs] = useState<Formateur[]>([]);

  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    getAllFormateur()
  }, [])

  const getAllFormateur = () => {
    formateurService.findAllFormateurs().then(data => setFormateurs(data))
  }

  return (
    <>
      <a href="/formateurs/add" className='addButtonBox'>
        <button className='addButton'>Ajouter</button>
      </a>
      <FormateurList formateurs={formateurs} currentPage={currentPage}/>
    </>
  )
}

export default FormateursPage