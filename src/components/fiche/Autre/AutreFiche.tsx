import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Autre } from '../../../models/Reservation/Autre';
import { autreService } from '../../../services/Reservation/AutreService';
import AutreFicheForm from './AutreFicheForm';
import '../../../assets/styles/components/fiches/AutreFiche.css'

type AutreFicheProps = {
    onUpdateAutre: Function
}

const AutreFiche : React.FC<AutreFicheProps> = ({onUpdateAutre}) => {
  
    const { id } = useParams<{id : string}>();
    
    const [autre, setAutre] = useState<Autre>()

    const getAutreById = (id : number) => {
        autreService.getAutreById(id)
          .then((data) => {setAutre(data)})
          .catch((error) => console.log(error))
        ;
    }

    useEffect(() => {
        const autreId = id ? parseInt(id) : 0;
        getAutreById(autreId)
    }, [id]);
  
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