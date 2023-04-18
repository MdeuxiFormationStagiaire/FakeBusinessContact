import React, { useEffect, useState } from 'react'
import { Autre } from '../../../models/Reservation/Autre'
import { autreService } from '../../../services/Reservation/AutreService'
import AutreList from '../../../components/lists/Autre/AutreList'
import AddAutre from '../../../components/add/AddAutre'
import { utilisateurService } from '../../../services/UtilisateurService'
import { Utilisateur } from '../../../models/Utilisateur'
import { salleService } from '../../../services/SalleService'
import { Salle } from '../../../models/Salle'

const ReservationsAutresAddPage = () => {

  const idUtilisateur : number = 11

  const [autres, setAutres] = useState<Autre[]>([])

  const [utilisateur, setUtilisateur] = useState<Utilisateur>()

  const [salles, setSalles] = useState<Salle[]>([])

  const [currentPage, setCurrentPage] = useState('Add')
  
  useEffect(() => {
    getAllAutres()
    getUtilisateurById(idUtilisateur)
    getAllSalles()
  }, [])
  
  const getAllAutres = () => {
    autreService.findAllAutres().then(data => setAutres(data))
  }
  
  const getUtilisateurById = (id : number) => {
    utilisateurService.getUtilisateurById(id).then(data => setUtilisateur(data))
  }
  
  const getAllSalles = () => {
    salleService.findAllSalles().then(data => setSalles(data))
  }

  const addNewAutre = (autre : Autre) => {
    autreService.createAutre(autre).then(() => getAllAutres())
  }
  
  return (
    <>
    {autres &&
      <>
        {utilisateur &&
          <AddAutre
            autres={autres}
            utilisateur={utilisateur}
            salles={salles}
            addNewAutre={addNewAutre}
          />
        }
        <AutreList
          autres={autres} 
          currentPage={currentPage}
        />
      </>
    }
    </>
  )
}

export default ReservationsAutresAddPage