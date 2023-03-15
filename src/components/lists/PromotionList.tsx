import React from 'react'
import { Promotion } from '../../models/Reservation/Promotion'

type PromotionListProps = {
    promotions: Promotion[];
}

const PromotionList : React.FC<PromotionListProps> = ({promotions}) => {
  return (
    <div>PromotionList</div>
  )
}

export default PromotionList