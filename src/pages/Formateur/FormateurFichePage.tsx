import { useEffect, useState } from 'react';
import { Formateur } from '../../models/Formateur';
import { formateurService } from '../../services/FormateurService';
import FormateurFiche from '../../components/fiche/FormateurFiche';
import FormateurList from '../../components/lists/FormateurList';
import '../../assets/styles/pages/Formateur.css'

const FormateurFichePage = () => {

  const [formateurs, setFormateurs] = useState<Formateur[]>();

  const [currentPage, setCurrentPage] = useState('Fiche')

  useEffect(() => {
    getAllFormateur()
  }, [])

  const getAllFormateur = () => {
    formateurService.findAllFormateurs().then(data => setFormateurs(data))
  }

  const handleUpdateFormateur = (formateur : Formateur) => {
    if (formateurs != undefined) {
      setFormateurs(formateurs.map((f) => (f.id === formateur.id ? formateur : f)));
    }
  }

  return (
    <>
      {formateurs && 
        <>
          <FormateurFiche formateurs={formateurs} onUpdateFormateur={handleUpdateFormateur}/>
          <FormateurList formateurs={formateurs} currentPage={currentPage}/>
        </>
      }
    </>
  )
}

export default FormateurFichePage