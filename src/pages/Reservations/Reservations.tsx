import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AutreList from '../../components/lists/AutreList';
import PromotionList from '../../components/lists/PromotionList';
import { Autre } from '../../models/Reservation/Autre';
import { Promotion } from '../../models/Reservation/Promotion';
import { autreService } from '../../services/AutreService';
import { promotionService } from '../../services/PromotionService';

const Reservations = () => {
  
  const navigate = useNavigate();
  
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  const [autres, setAutres] = useState<Autre[]>([]);

  useEffect(() => {
    getAllPromotions();
    getAllAutres();
  }, [])

  const getAllPromotions = () => {
    promotionService.findAllPromotions().then(data => setPromotions(data))
  }

  const getAllAutres = () => {
    autreService.findAllAutres().then(data => setAutres(data))
  }

  const handleAddButtonNav = () => {
    navigate('/reservations/add')
  };

  return (
    <>
      <div className='addButtonBox' onClick={handleAddButtonNav}>
        <button className='addButton'>Ajouter</button>
      </div>
      <PromotionList promotions={promotions}/>
      <AutreList autres={autres}/>
    </>
  )
}

export default Reservations