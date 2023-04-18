import Modal from 'react-modal'
import React, { useEffect, useState } from 'react'
import { Promotion } from '../../../models/Reservation/Promotion'
import { promotionService } from '../../../services/Reservation/PromotionService';
import { Stagiaire } from '../../../models/Stagiaire';
import { Session } from '../../../models/Reservation/Session';
import PromotionStagiairesList from '../../lists/Promotion/PromotionStagiairesList';
import PromotionSessionsList from '../../lists/Promotion/PromotionSessionsList';
import { stagiaireService } from '../../../services/StagiaireService';
import { sessionService } from '../../../services/Reservation/SessionService';
import PromotionFicheForm from './PromotionFicheForm';
import { ModalStyle } from '../../../assets/styles/components/modals/ModalStyle.css'
import DeleteConfirmation from '../../modals/DeleteConfirmation'
import updateLogo from '../../../assets/img/modify.png'
import deleteLogo from '../../../assets/img/remove.png'
import validateLogo from '../../../assets/img/checked.png'
import '../../../assets/styles/components/fiches/PromotionFiche.css'
import { useNavigate } from 'react-router-dom';

type PromotionFicheProps = {
  idPromotion: number
  onUpdatePromotion : Function
}

const PromotionFiche : React.FC<PromotionFicheProps> = ({idPromotion, onUpdatePromotion}) => {

  const navigate = useNavigate();

  const [promotion, setPromotion] = useState<Promotion>()

  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([])

  const [sessions, setSessions] = useState<Session[]>([])

  const [editMode, setEditMode] = useState<boolean>(false)

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)

  const getPromotionById = (id : number) => {
    promotionService.getPromotionById(id)
      .then((data) => {setPromotion(data)})
      .catch((error) => console.log(error));
  }

  const getAllStagiaires = () => {
    stagiaireService.findAllStagiaires()
      .then((data) => setStagiaires(data))
      .catch((error) => console.log(error));
  }

  const getAllSessions = () => {
    sessionService.findAllSessions()
      .then((data) => setSessions(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getPromotionById(idPromotion)
    getAllStagiaires()
    getAllSessions()
  }, [idPromotion]);

  const handleDeleteStagiaireFromPromotion = (idStagiaire : number) => {
    promotionService.deleteStagiaireFromPromotion(idPromotion, idStagiaire)
      .then(() => 
        getPromotionById(idPromotion)
      )
      .catch((error) => console.error(error))
    onUpdatePromotion(promotion)
  }

  const handleAddStagiaireToPromotion = (selectedStagiaire : Stagiaire) => {
    if (selectedStagiaire && promotion) {
      if (promotion.stagiaires.some(stagiaire => stagiaire.id === selectedStagiaire.id)) {
        alert("Ce stagiaire existe déjà dans cette liste.")
        return;
      } else {
        promotionService.addStagiaireToPromotion(promotion.id, selectedStagiaire)
          .then( () => {
            getPromotionById(idPromotion)
          })
          .catch((error) => console.error(error));
        onUpdatePromotion(promotion)
      }
    }
  }

  const handleDeleteSessionFromPromotion = (idSession : number) => {
    promotionService.deleteSessionFromPromotion(idPromotion, idSession)
      .then(() =>
        getPromotionById(idPromotion)
      )
      .catch((error) => console.error(error))
  }

  const handleAddSessionToPromotion = (idSession : number) => {
    promotionService.addSessionToPromotion(idPromotion, idSession)
      .then(() => {
        getPromotionById(idPromotion)
      })
      .catch((error) => console.error(error));
    onUpdatePromotion(promotion)
  }

  const handleEditMode = () => {
    if (editMode == false) {
      setEditMode(true)
    } else {
      setEditMode(false)
    }
  }

  const handleDelete = () => {
    setShowDeleteConfirmation(true)
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false)
  };

  const handleConfirmDelete = () => {
    promotionService
      .deletePromotion(idPromotion)
      .then(() => navigate('/reservations/promotions'))
      .catch((error) => console.error(error))
    setShowDeleteConfirmation(false);
  };

  const handleAddButtonNav = () => {
    navigate('/reservations/promotions/add')
  };

  return (
    <>
      {promotion &&
        <>
          <Modal
            isOpen={showDeleteConfirmation}
            onRequestClose={handleCancelDelete}
            contentLabel="Confirmation de suppression"
            style={ModalStyle}
          >
            <DeleteConfirmation
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete} 
            />
          </Modal>
          <section className='buttonSectionPromotions'>
            {editMode ? 
              (
                <img src={validateLogo} alt="update" className='updateLogoFiche'  onClick={handleEditMode}/>
              ) : (
                <img src={updateLogo} alt="update" className='updateLogoFiche'  onClick={handleEditMode}/>
              )
            }
            <img src={deleteLogo} alt="delete" className='deleteLogoFiche'  onClick={handleDelete}/>
            <button type='button' className='addButtonBoxFichePromotions' onClick={handleAddButtonNav}>Ajouter</button>
          </section>
          <PromotionFicheForm
            promotion={promotion}
            onUpdatePromotion={onUpdatePromotion}
            editMode={editMode}
            handleEditModeFiche={handleEditMode}
          />
          <section className='sectionListsPromotion'>
            <div className="stagiairesSessionsTabs">
              <PromotionStagiairesList 
                promotion={promotion} 
                allStagiaires={stagiaires}
                onDeleteStagiaire={handleDeleteStagiaireFromPromotion}
                onAddStagiaire={handleAddStagiaireToPromotion}
                editMode={editMode}
              />
              <PromotionSessionsList
                promotion={promotion}
                sessions={sessions}
                onDeleteSession={handleDeleteSessionFromPromotion}
                onAddSession={handleAddSessionToPromotion}
                editMode={editMode}
              />
            </div>
          </section>
        </>
      }
    </>
  )
}

export default PromotionFiche