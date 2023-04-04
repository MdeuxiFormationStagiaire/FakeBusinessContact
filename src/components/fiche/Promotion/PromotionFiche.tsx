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
import '../../../assets/styles/components/fiches/PromotionFiche.css'

type PromotionFicheProps = {
  idPromotion: number
  onUpdatePromotion : Function
}

const PromotionFiche : React.FC<PromotionFicheProps> = ({idPromotion, onUpdatePromotion}) => {

  const [promotion, setPromotion] = useState<Promotion>()

  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([])

  const [sessions, setSessions] = useState<Session[]>([])

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

  return (
    <>
      {promotion &&
        <>
          <PromotionFicheForm
            promotion={promotion}
            onUpdatePromotion={onUpdatePromotion}
          />
          <section className='sectionListsPromotion'>
            <div className="stagiairesSessionsTabs">
              <PromotionStagiairesList 
                promotion={promotion} 
                allStagiaires={stagiaires}
                onDeleteStagiaire={handleDeleteStagiaireFromPromotion}
                onAddStagiaire={handleAddStagiaireToPromotion}
              />
              <PromotionSessionsList
                promotion={promotion}
                sessions={sessions}
                onDeleteSession={handleDeleteSessionFromPromotion}
                onAddSession={handleAddSessionToPromotion}
              />
            </div>
          </section>
        </>
      }
    </>
  )
}

export default PromotionFiche