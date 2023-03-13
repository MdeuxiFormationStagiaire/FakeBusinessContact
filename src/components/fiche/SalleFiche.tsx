import React from 'react'
import { Salle } from '../../models/Salle'

type SalleFicheProps = {
    salles : Salle[],
    onUpdateSalle: Function
}

const SalleFiche : React.FC<SalleFicheProps> = ({salles, onUpdateSalle}) => {
  return (
    <div>SalleFiche</div>
  )
}

export default SalleFiche