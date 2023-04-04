import React, { useEffect, useState } from 'react'
import { Autre } from '../../../models/Reservation/Autre';
import { autreService } from '../../../services/Reservation/AutreService';
import AutreFicheForm from './AutreFicheForm';
import '../../../assets/styles/components/fiches/AutreFiche.css'

type AutreFicheProps = {
    idAutre: number;
    onUpdateAutre: Function
}

const AutreFiche : React.FC<AutreFicheProps> = ({idAutre, onUpdateAutre}) => {
  
    const [autre, setAutre] = useState<Autre>()

    const getAutreById = (id : number) => {
        autreService.getAutreById(id)
          .then((data) => {setAutre(data)})
          .catch((error) => console.log(error));
    }

    useEffect(() => {
        getAutreById(idAutre)
    }, [idAutre]);
  
    return (
        <>
            {autre &&
                <>
                    <AutreFicheForm
                        autre={autre}
                        onUpdateAutre={onUpdateAutre}
                    />
                </>
            }
        </>
    )
}

export default AutreFiche