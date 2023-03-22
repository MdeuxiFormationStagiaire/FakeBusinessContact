import React from 'react'
import { Stagiaire } from '../../../models/Stagiaire'

type PromotionStagiaireListContainerProps = {
    stagiaire: Stagiaire
}

const PromotionStagiaireListContainer : React.FC<PromotionStagiaireListContainerProps> = ({stagiaire}) => {
  
return (
<div>
    <span className="itemsStagiairesPromotion">{stagiaire.last_name}</span>
    <span className="itemsStagiairesPromotion">{stagiaire.first_name}</span>
    <span className="itemsStagiairesPromotion">{stagiaire.email}</span>
</div>
)
}

export default PromotionStagiaireListContainer