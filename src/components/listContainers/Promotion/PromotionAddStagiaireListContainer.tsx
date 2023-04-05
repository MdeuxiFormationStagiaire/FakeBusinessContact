import React, { useState } from 'react'
import { Stagiaire } from '../../../models/Stagiaire'
import Modal from 'react-modal'
import { ModalStyle } from '../../../assets/styles/components/modals/ModalStyle.css'
import DeleteConfirmation from '../../modals/DeleteConfirmation'
import removeLogo from '../../../assets/img/remove.png'

type PromotionAddStagiaireListContainerProps = {
    stagiaire: Stagiaire
    onDeleteStagiaire: Function
}

const PromotionAddStagiaireListContainer : React.FC<PromotionAddStagiaireListContainerProps> = ({stagiaire, onDeleteStagiaire}) => {
  
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
            <div  className='itemsContainerStagiairesPromotionUpdate'>
                <span className="itemsStagiairesPromotion">{stagiaire.last_name}</span>
                <span className="itemsStagiairesPromotion">{stagiaire.first_name}</span>
                <span className="items2StagiairesPromotion">{stagiaire.email}</span>
                <img src={removeLogo} onClick={handleDelete} className="removeLogo"/>
            </div>
        </>
  )
}

export default PromotionAddStagiaireListContainer