import React, { useEffect, useState } from 'react'
import { Promotion } from '../../../models/Reservation/Promotion'
import { promotionService } from '../../../services/Reservation/PromotionService'
import { Utilisateur } from '../../../models/Utilisateur'
import { utilisateurService } from '../../../services/UtilisateurService'
import PromotionList from '../../../components/lists/Promotion/PromotionList'
import AddPromotion from '../../../components/add/AddPromotion'
import { Formateur } from '../../../models/Formateur'
import { Stagiaire } from '../../../models/Stagiaire'
import { Session } from '../../../models/Reservation/Session'
import { formateurService } from '../../../services/FormateurService'
import { stagiaireService } from '../../../services/StagiaireService'
import { sessionService } from '../../../services/Reservation/SessionService'
import { salleService } from '../../../services/SalleService'
import { Salle } from '../../../models/Salle'

const ReservationsPromotionAddPage = () => {

  const idUtilisateur : number = 10

  const [utilisateur, setUtilisateur] = useState<Utilisateur>()

  const [promotions, setPromotions] = useState<Promotion[]>([])

  const [salles, setSalles] = useState<Salle[]>([])

  const [formateurs, setFormateurs] = useState<Formateur[]>([])

  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([])

  const [sessions, setSessions] = useState<Session[]>([])

  const [currentPage, setCurrentPage] = useState('Add')

  useEffect(() => {
    getUtilisateurById(idUtilisateur)
    getAllPromotions()
    getAllSalles()
    getAllFormateurs()
    getAllStagiaires()
    getAllSessions()
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

  const getAllFormateurs = () => {
    formateurService.findAllFormateurs().then(data => setFormateurs(data))
  }

  const getAllStagiaires = () => {
    stagiaireService.findAllStagiaires().then(data => setStagiaires(data))
  }

  const getAllSessions = () => {
    sessionService.findAllSessions().then(data => setSessions(data))
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
              promotions={promotions}
              salles={salles}
              formateurs={formateurs}
              stagiaires={stagiaires}
              sessions={sessions}
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