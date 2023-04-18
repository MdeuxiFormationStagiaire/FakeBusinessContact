import React, { useEffect, useState } from 'react'
import { Promotion } from '../../../models/Reservation/Promotion'
import { promotionService } from '../../../services/Reservation/PromotionService'
import { Utilisateur } from '../../../models/Utilisateur'
import { utilisateurService } from '../../../services/UtilisateurService'
import PromotionList from '../../../components/lists/Promotion/PromotionList'
import AddPromotion from '../../../components/add/AddPromotion'
import { Stagiaire } from '../../../models/Stagiaire'
import { Session } from '../../../models/Reservation/Session'
import { stagiaireService } from '../../../services/StagiaireService'
import { salleService } from '../../../services/SalleService'
import { Salle } from '../../../models/Salle'
import { formateurService } from '../../../services/FormateurService'
import { Formateur } from '../../../models/Formateur'

const ReservationsPromotionAddPage = () => {

  const idUtilisateur : number = 11

  const [utilisateur, setUtilisateur] = useState<Utilisateur>()

  const [promotions, setPromotions] = useState<Promotion[]>([])

  const [salles, setSalles] = useState<Salle[]>([])

  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([])

  const [formateurs, setFormateurs] = useState<Formateur[]>([])

  const [currentPage, setCurrentPage] = useState('Add')

  useEffect(() => {
    getUtilisateurById(idUtilisateur)
    getAllPromotions()
    getAllSalles()
    getAllStagiaires()
    getAllFormateurs()
  }, [])

  const getUtilisateurById = (id : number) => {
    utilisateurService.getUtilisateurById(id).then(data => setUtilisateur(data))
  }

  const getAllPromotions = () => {
    promotionService.findAllPromotions().then(data => setPromotions(data))
  }

  const getAllSalles = () => {
    salleService.findAllSalles().then(data => setSalles(data))
  }

  const getAllStagiaires = () => {
    stagiaireService.findAllStagiaires().then(data => setStagiaires(data))
  }

  const getAllFormateurs = () => {
    formateurService.findAllFormateurs().then(data => setFormateurs(data))
  }

  const addNewPromotion = (promotion : Promotion) => {
    promotionService.createPromotion(promotion).then(() => getAllPromotions())
  }
 
  return (
    <>
      {promotions &&
        <>
          {utilisateur && 
            <AddPromotion
              formateurs={formateurs}
              salles={salles}
              stagiaires={stagiaires}
              utilisateur={utilisateur}
              addNewPromotion={addNewPromotion}
            />
          }
          <PromotionList
            promotions={promotions}
            currentPage={currentPage}
          />
        </>
      }
    </>
  )
}

export default ReservationsPromotionAddPage