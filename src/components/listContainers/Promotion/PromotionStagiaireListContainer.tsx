import React, { useEffect, useState } from 'react'
import { Stagiaire } from '../../../models/Stagiaire'
import '../../../assets/styles/components/listContainer/PromotionFicheListContainer.css'
import Modal from 'react-modal'
import { ModalStyle } from '../../../assets/styles/components/modals/ModalStyle.css'
import DeleteConfirmation from '../../modals/DeleteConfirmation'
import removeLogo from '../../../assets/img/remove.png'

type PromotionStagiaireListContainerProps = {
    stagiaire: Stagiaire
    editMode: boolean
    onDeleteStagiaire: Function
}

const PromotionStagiaireListContainer : React.FC<PromotionStagiaireListContainerProps> = ({stagiaire, editMode, onDeleteStagiaire}) => {

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

    const handleDelete = () => {
        setShowDeleteConfirmation(true)
    };
    
    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false)
    };
    
    
    return (
        <>
            <Modal
                isOpen={showDeleteConfirmation}
                onRequestClose={handleCancelDelete}
                contentLabel="Confirmation de suppression"
                style={ModalStyle}
            >
                <DeleteConfirmation
                  onConfirm={() => {onDeleteStagiaire(stagiaire.id); setShowDeleteConfirmation(false)}}
                  onCancel={handleCancelDelete} 
            />
            </Modal>
            {editMode ? (
                <div  className='itemsContainerStagiairesPromotion'>
                    <span className="itemsStagiairesPromotion">{stagiaire.last_name}</span>
                    <span className="itemsStagiairesPromotion">{stagiaire.first_name}</span>
                    <span className="items2StagiairesPromotion">{stagiaire.email}</span>
                    <img src={removeLogo} onClick={handleDelete} className="removeLogo"/>
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