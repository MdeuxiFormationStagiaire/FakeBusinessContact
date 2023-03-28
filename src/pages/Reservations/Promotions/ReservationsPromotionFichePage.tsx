import { error } from 'console'
import React, { useEffect, useState } from 'react'
import PromotionFiche from '../../../components/fiche/PromotionFiche'
import PromotionList from '../../../components/lists/Promotion/PromotionList'
import { Formateur } from '../../../models/Formateur'
import { Promotion } from '../../../models/Reservation/Promotion'
import { Session } from '../../../models/Reservation/Session'
import { Salle } from '../../../models/Salle'
import { Stagiaire } from '../../../models/Stagiaire'
import { formateurService } from '../../../services/FormateurService'
import { promotionService } from '../../../services/Reservation/PromotionService'
import { sessionService } from '../../../services/Reservation/SessionService'
import { salleService } from '../../../services/SalleService'
import { stagiaireService } from '../../../services/StagiaireService'

const ReservationsPromotionFichePage = () => {

  const [promotions, setPromotions] = useState<Promotion[]>([])

  const [salles, setSalles] = useState<Salle[]>([])

  const [formateurs, setFormateurs] = useState<Formateur[]>([])

  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([])

  const [sessions, setSessions] = useState<Session[]>([])

  const [currentPage, setCurrentPage] = useState('Fiche')

  useEffect(() => {
    getAllPromotions()
    getAllSalles()
    getAllFormateurs()
    getAllStagiaires()
    getAllSessions()
  }, [])

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

  const handleUpdatePromotion = (promotion : Promotion) => {
    setPromotions(promotions.map((p) => (p.id === promotion.id ? promotion : p)));
  }

  const handleDeleteStagiaireFromPromotion = (idPromotion : number, idStagiaire : number) => {
    promotionService.deleteStagiairePromotion(idPromotion, idStagiaire)
    .then(() => 
      window.location.reload()
    )
    .catch((error) => console.error(error))
  }

  const handleAddStagiaireToPromotion = (selectedStagiaire : Stagiaire, promotion : Promotion) => {
    if (selectedStagiaire) {
      if (promotion.stagiaires.some(stagiaire => stagiaire.id === selectedStagiaire.id)) {
        alert("Ce stagiaire existe déjà dans cette liste.")
        return;
      } else {
        promotionService.addStagiaireToPromotion(promotion.id, selectedStagiaire)
        .then(async () => {
          const newPromotion = await promotionService.getPromotionById(promotion.id);
          return newPromotion;
        })
        .then(() =>
          window.location.reload()
        )
        .catch((error) => console.error(error));
      }
    }
  }

  return (
    <>
      {promotions &&
        <>
          <PromotionFiche 
            promotions={promotions} 
            salles={salles} 
            formateurs={formateurs}
            allStagiairesList={stagiaires}
            sessions={sessions}
            onUpdatePromotion={handleUpdatePromotion}
            onDeleteStagiaire={handleDeleteStagiaireFromPromotion}
            onAddStagiaire={handleAddStagiaireToPromotion}
          />
          <PromotionList 
            promotions={promotions} 
            currentPage={currentPage}
          />
        </>
      }
    </>
  )
}

export default ReservationsPromotionFichePage