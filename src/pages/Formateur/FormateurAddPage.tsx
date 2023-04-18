import { useEffect, useState } from 'react'
import AddFormateur from '../../components/add/AddFormateur'
import FormateurList from '../../components/lists/Formateur/FormateurList'
import { Formateur } from '../../models/Formateur'
import { formateurService } from '../../services/FormateurService'

const FormateurAddPage = () => {

  const [formateursList, setFormateursList] = useState<Formateur[]>([])

  const [currentPage, setCurrentPage] = useState('Add')

  useEffect(() => {
    getAllFormateur()
  }, [])

  const getAllFormateur = () => {
    formateurService.findAllFormateurs().then(data => setFormateursList(data))
  }
  
  const addNewFormateur = (formateur : Formateur) => {
    formateurService.createFormateur(formateur).then(() => getAllFormateur())
  }

  const addNewFormateursByImport = async (formateurs : Formateur[]) => {
    const failedFormateurs: {nom: string, prenom: string}[] = [];

    for (const formateur of formateurs) {
      const existingFormateur = formateursList.find(s => s.email === formateur.email);
  
      if (existingFormateur) {
        failedFormateurs.push({nom: formateur.last_name, prenom: formateur.first_name});
      } else {
        await formateurService.createFormateur(formateur);
      }
    }
  
    if (failedFormateurs.length > 0) {
      const failedFormateursMsg = failedFormateurs.map(s => `${s.prenom} ${s.nom}`).join(', ');
      alert(`Les stagiaires suivants n'ont pas pu être créés : ${failedFormateursMsg}. Ils existent déjà dans la base de données.`);
    }
  
    getAllFormateur();
  }

  return (
    <>
      <AddFormateur 
        addNewFormateur={addNewFormateur}
        addNewFormateursByImport={addNewFormateursByImport}
      />
      <FormateurList formateurs={formateursList} currentPage={currentPage}/>
    </>
  )
}

export default FormateurAddPage
