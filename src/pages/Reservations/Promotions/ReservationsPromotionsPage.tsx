import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PromotionList from '../../../components/lists/PromotionList';
import { Promotion } from '../../../models/Reservation/Promotion';
import { promotionService } from '../../../services/Reservation/PromotionService';

const ReservationsPromotionsPage = () => {

  const navigate = useNavigate();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [currentPage, setCurrentPage] = useState('Fiche');

  useEffect(() => {
    getAllPromotions()
  }, [])
  
  const getAllPromotions = () => {
    promotionService.findAllPromotions().then(data => setPromotions(data))
  };

  const handleAddButtonNav = () => {
    navigate('/promotions/add')
  };

  return (
    <>
      <div className='addButtonBox'>
        <button className='addButton' onClick={handleAddButtonNav}>Ajouter</button>
      </div>
      <PromotionList promotions={promotions} currentPage={currentPage}/>
    </>
  )
}

export default ReservationsPromotionsPage