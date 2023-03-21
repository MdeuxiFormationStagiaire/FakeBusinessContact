import React, { useEffect, useState } from 'react'
import PromotionFiche from '../../../components/fiche/PromotionFiche'
import PromotionList from '../../../components/lists/PromotionList'
import { Formateur } from '../../../models/Formateur'
import { Promotion } from '../../../models/Reservation/Promotion'
import { Salle } from '../../../models/Salle'
import { formateurService } from '../../../services/FormateurService'
import { promotionService } from '../../../services/Reservation/PromotionService'
import { salleService } from '../../../services/SalleService'

const ReservationsPromotionFichePage = () => {

  const [promotions, setPromotions] = useState<Promotion[]>([])

  const [salles, setSalles] = useState<Salle[]>([])

  const [formateurs, setFormateurs] = useState<Formateur[]>([])

  const [currentPage, setCurrentPage] = useState('Fiche')

  useEffect(() => {
    getAllPromotions()
    getAllSalles()
    getAllFormateurs()
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

  const handleUpdatePromotion = (promotion : Promotion) => {
    setPromotions(promotions.map((p) => (p.id === promotion.id ? promotion : p)));
  }

  return (
    <>
      {promotions &&
        <>
          <PromotionFiche promotions={promotions} salles={salles} formateurs={formateurs} onUpdatePromotion={handleUpdatePromotion}/>
          <PromotionList promotions={promotions} currentPage={currentPage}/>
        </>
      }
    </>
  )
}

export default ReservationsPromotionFichePage