import React from 'react'
import { Stagiaire } from '../../../models/Stagiaire'
import '../../../assets/styles/components/listContainer/PromotionFicheListContainer.css'

type PromotionStagiaireListContainerProps = {
    stagiaire: Stagiaire
}

const PromotionStagiaireListContainer : React.FC<PromotionStagiaireListContainerProps> = ({stagiaire}) => {
  
return (
<div  className='itemsContainerStagiairesPromotion'>
    <span className="itemsStagiairesPromotion">{stagiaire.last_name}</span>
    <span className="itemsStagiairesPromotion">{stagiaire.first_name}</span>
    <span className="items2StagiairesPromotion">{stagiaire.email}</span>
</div>
)
}

export default PromotionStagiaireListContainer