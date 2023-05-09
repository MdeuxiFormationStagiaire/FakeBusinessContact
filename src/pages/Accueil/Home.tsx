import React, { useEffect, useState } from 'react';
import HomePlanning from '../../components/Planning/HomePlanning';
import { Reservation } from '../../models/Reservation/Reservation';
import { Promotion } from '../../models/Reservation/Promotion';
import { Autre } from '../../models/Reservation/Autre';
import { promotionService } from '../../services/Reservation/PromotionService';
import { autreService } from '../../services/Reservation/AutreService';

const Home = () => {

  const [promotions, setPromotions] = useState<Promotion[]>([])

  const [autres, setAutres] = useState<Autre[]>([])

  const [reservations, setReservations] = useState<Reservation>({promotions, autres})

  useEffect(() => {
    getAllReservations()
  }, [])

  const getAllReservations = () => {
    autreService.findAllAutres()
      .then((data) => {
        setAutres(data);
        setReservations((prevState) => ({
          ...prevState,
          autres : data
        }));
      });
    ;
    promotionService.findAllPromotions()
      .then((data) => {
        setPromotions(data)
        setReservations((prevState) => ({
          ...prevState,
          promotions : data
        }));
      });
    ;
  }
  
  return (
    <>
      <HomePlanning
        // reservations={reservations}
      />
    </>
  )
}

export default Home