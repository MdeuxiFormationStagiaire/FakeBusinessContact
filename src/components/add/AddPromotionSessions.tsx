import React from 'react'
import { Session } from '../../models/Reservation/Session'
import { Formateur } from '../../models/Formateur'

type AddPromotionSessionsProps = {
    sessions: Session[]
    formateurs: Formateur[]
    onAddSession: (idSession : number) => void
    onDeleteSession: (idSession : number) => void
}

const AddPromotionSessions : React.FC<AddPromotionSessionsProps> = ({sessions, formateurs, onAddSession, onDeleteSession}) => {
  return (
    <div>AddPromotionSessions</div>
  )
}

export default AddPromotionSessions