import React from 'react'
import { Promotion } from '../../models/Reservation/Promotion'

type PromotionFicheProps = {
    promotions: Promotion[];
    onUpdatePromotion: Function
}

const PromotionFiche : React.FC<PromotionFicheProps> = ({promotions, onUpdatePromotion}) => {
  return (
    <div>PromotionFiche</div>
  )
}

export default PromotionFiche