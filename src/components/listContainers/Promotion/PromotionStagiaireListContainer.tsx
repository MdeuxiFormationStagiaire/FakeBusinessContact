import React, { useEffect, useState } from 'react'
import { Stagiaire } from '../../../models/Stagiaire'
import '../../../assets/styles/components/listContainer/PromotionFicheListContainer.css'
import { promotionService } from '../../../services/Reservation/PromotionService'
import { Promotion } from '../../../models/Reservation/Promotion'

type PromotionStagiaireListContainerProps = {
    promotion: Promotion
    stagiaire: Stagiaire
    editMode: boolean
    addMode: boolean
    validate: boolean
    onDeleteStagiaire: Function
}

const PromotionStagiaireListContainer : React.FC<PromotionStagiaireListContainerProps> = ({promotion, stagiaire, editMode, addMode, validate, onDeleteStagiaire}) => {
    return (
        <>
            {editMode ? (
                <div  className='itemsContainerStagiairesPromotion'>
                    <span className="itemsStagiairesPromotion">{stagiaire.last_name}</span>
                    <span className="itemsStagiairesPromotion">{stagiaire.first_name}</span>
                    <span className="items2StagiairesPromotion">{stagiaire.email}</span>
                    <button onClick={() => onDeleteStagiaire(stagiaire.id)}>X</button>
                </div>
            ) : (
                <div  className='itemsContainerStagiairesPromotion'>
                    <span className="itemsStagiairesPromotion">{stagiaire.last_name}</span>
                    <span className="itemsStagiairesPromotion">{stagiaire.first_name}</span>
                    <span className="items2StagiairesPromotion">{stagiaire.email}</span>
                </div>
            )}
        </>
    )
}

export default PromotionStagiaireListContainer