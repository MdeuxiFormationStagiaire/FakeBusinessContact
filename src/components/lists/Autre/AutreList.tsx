import React from 'react'
import { Autre } from '../../../models/Reservation/Autre'

type AutreListProps = {
    autres: Autre[];
}

const AutreList : React.FC<AutreListProps> = ({autres}) => {
  return (
    <div>AutreList</div>
  )
}

export default AutreList