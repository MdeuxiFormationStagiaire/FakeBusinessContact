import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PromotionFiche from '../../../components/fiche/PromotionFiche'
import PromotionList from '../../../components/lists/Promotion/PromotionList'
import { Promotion } from '../../../models/Reservation/Promotion'
import { promotionService } from '../../../services/Reservation/PromotionService'

const ReservationsPromotionFichePage = () => {

  const [promotions, setPromotions] = useState<Promotion[]>([])

  const [currentPage, setCurrentPage] = useState('Fiche')

  const { id } = useParams<{id : string}>();

  useEffect(() => {
    getAllPromotions()
  }, [])

  const getAllPromotions = () => {
    promotionService.findAllPromotions().then(data => setPromotions(data))
  }

  const handleUpdatePromotion = (promotion : Promotion) => {
    setPromotions(promotions.map((p) => (p.id === promotion.id ? promotion : p)));
  }

  return (
    <>
      {promotions &&
        <>
          {id &&
            <PromotionFiche
              idPromotion={parseInt(id)}
              onUpdatePromotion={handleUpdatePromotion}
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

export default ReservationsPromotionFichePage