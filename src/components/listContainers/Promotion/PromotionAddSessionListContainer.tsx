import React, { useState } from 'react'
import { Session } from '../../../models/Reservation/Session'
import Modal from 'react-modal'
import { ModalStyle } from '../../../assets/styles/components/modals/ModalStyle.css'
import DeleteConfirmation from '../../modals/DeleteConfirmation'
import removeLogo from '../../../assets/img/remove.png'


type PromotionAddSessionListContainerProps = {
    session : Session
    onDeleteSession : (session : Session) => void
}

const PromotionAddSessionListContainer : React.FC<PromotionAddSessionListContainerProps> = ({session, onDeleteSession}) => {
    
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  
    const handleDelete = () => {
        setShowDeleteConfirmation(true)
    };
    
    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false)
    };

    const formateDate = (date : Date) => {
        const formatedDate : string = 
            date.toLocaleString('fr-FR').slice(8, 10) + '/' +
            date.toLocaleString('fr-FR').slice(5, 7) + '/' +
            date.toLocaleString('fr-FR').slice(0, 4)
        ;
        return formatedDate;
    }
  
    return (
        <>
            <Modal
                isOpen={showDeleteConfirmation}
                onRequestClose={handleCancelDelete}
                contentLabel="Confirmation de suppression"
                style={ModalStyle}
            >
            <DeleteConfirmation
            onConfirm={() => {onDeleteSession(session); setShowDeleteConfirmation(false)}}
            onCancel={handleCancelDelete} 
            />
            </Modal>
            <div className='itemsContainerSessionsPromotionUpdate'>
                <span className="itemsSessionsPromotion">{session.desc}</span>
                <span className="itemsSessionsPromotion">{formateDate(session.startAt)}</span>
                <span className="itemsSessionsPromotion">{formateDate(session.endAt)}</span>
                <span className="items2SessionsPromotion">{`${session.formateur.first_name} ${session.formateur.last_name}`}</span>
                <img src={removeLogo} onClick={handleDelete} className="removeLogo"/>
            </div>
        </>
        
  )
}

export default PromotionAddSessionListContainer