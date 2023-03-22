import React from 'react'
import { Session } from '../../../models/Reservation/Session'

type PromotionSessionListContainerProps = {
    session: Session
}

const PromotionSessionListContainer : React.FC<PromotionSessionListContainerProps>= ({session}) => {

    const formateDate = (date : Date) => {
        const formatedDate : string = 
            date.toLocaleString('fr-FR').slice(8, 10) + '/' +
            date.toLocaleString('fr-FR').slice(5, 7) + '/' +
            date.toLocaleString('fr-FR').slice(0, 4)
        ;
        return formatedDate;
      }

  return (
<div>
    <span className="itemsSessionsPromotion">{session.desc}</span>
    <span className="itemsSessionsPromotion">{formateDate(session.startAt)}</span>
    <span className="itemsSessionsPromotion">{formateDate(session.endAt)}</span>
    <span className="itemsSessionsPromotion">{`${session.formateur.first_name} ${session.formateur.last_name}`}</span>
</div>
  )
}

export default PromotionSessionListContainer