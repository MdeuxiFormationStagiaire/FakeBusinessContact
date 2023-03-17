import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/pages/Reservation.css'

const ReservationsPage = () => {
  
  const navigate = useNavigate();

  const handleResaButtonNav = () => {
    navigate('/reservations/promotions')
  };

  const handleAutreButtonNav = () => {
    navigate('/reservations/autres')
  };

  return (
    <>
      <section className='choiceSection'>
          <button className="reservationButton" onClick={handleResaButtonNav}>
            Promotions
          </button>
          <button className="autreButton"  onClick={handleAutreButtonNav}>
            Autres
          </button>
      </section>
    </>
  )
}

export default ReservationsPage