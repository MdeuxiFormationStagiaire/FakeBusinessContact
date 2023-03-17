import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PromotionFiche from '../../components/fiche/PromotionFiche';
import PromotionList from '../../components/lists/PromotionList';
import { Promotion } from '../../models/Reservation/Promotion';
import { promotionService } from '../../services/Reservation/PromotionService';

const ReservationsPromotionsPage = () => {

    const [promotions, setPromotions] = useState<Promotion[]>([]);

    const [currentPage, setCurrentPage] = useState('Fiche')

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
          <PromotionFiche promotions={promotions} onUpdatePromotion={handleUpdatePromotion}/>
          <PromotionList promotions={promotions} currentPage={currentPage}/>
        </>
      }
    </>
  )
}

export default ReservationsPromotionsPage