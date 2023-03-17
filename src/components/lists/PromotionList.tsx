import React from 'react'
import { Promotion } from '../../models/Reservation/Promotion'

type PromotionListProps = {
    promotions: Promotion[];
    currentPage: string
}

const PromotionList : React.FC<PromotionListProps> = ({promotions, currentPage}) => {
  return (
    <div>PromotionList</div>
  )
}

export default PromotionList