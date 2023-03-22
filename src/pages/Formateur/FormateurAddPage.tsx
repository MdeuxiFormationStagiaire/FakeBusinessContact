import { useEffect, useState } from 'react'
import AddFormateur from '../../components/add/AddFormateur'
import FormateurList from '../../components/lists/Formateur/FormateurList'
import { Formateur } from '../../models/Formateur'
import { formateurService } from '../../services/FormateurService'

const FormateurAddPage = () => {

  const [formateurs, setFormateurs] = useState<Formateur[]>([])

  const [currentPage, setCurrentPage] = useState('Add')

  useEffect(() => {
    getAllFormateur()
  }, [])

  const getAllFormateur = () => {
    formateurService.findAllFormateurs().then(data => setFormateurs(data))
  }
  
  const addNewFormateur = (formateur : Formateur) => {
    formateurService.createFormateur(formateur).then(() => getAllFormateur())
  }

  return (
    <>
      <AddFormateur addNewFormateur={addNewFormateur}/>
      <FormateurList formateurs={formateurs} currentPage={currentPage}/>
    </>
  )
}

export default FormateurAddPage
