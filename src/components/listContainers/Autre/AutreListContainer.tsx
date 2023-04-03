import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { Autre } from '../../../models/Reservation/Autre'
import '../../../assets/styles/components/listContainer/AutreListContainer.css'

type AutreListContainerProps = {
    autre : Autre;
    onAutreSelected: (autre: Autre) => void;
}

const AutreListContainer : React.FC<AutreListContainerProps> = ({autre, onAutreSelected}) => {

    const [isSelected, setIsSelected] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleAutreSelected = () => {
        setIsSelected(true);
        onAutreSelected(autre);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsSelected(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const formateDate = (date : Date) => {
        const formatedDate : string = 
            date.toLocaleString('fr-FR').slice(8, 10) + '/' +
            date.toLocaleString('fr-FR').slice(5, 7) + '/' +
            date.toLocaleString('fr-FR').slice(0, 4)
        ;
        return formatedDate;
    }

  return (
    <Link to={`/reservations/autres/${autre.id}`} className="ficheLink">
    <div
      className={`itemsContainerAutres ${isSelected ? 'itemsContainerSelectedAutres' : ''}`}
      onClick={handleAutreSelected}
      ref={containerRef}
    >
      <span className="itemsAutres">{autre.type}</span>
      <span className="itemsAutres">{autre.desc}</span>
      <span className="itemsAutres">{formateDate(autre.createdAt)}</span>
      <span className="itemsAutres">{formateDate(autre.startAt)}</span>
      <span className="itemsAutres">{formateDate(autre.endAt)}</span>
      <span className="itemsAutres">{autre.salle.name}</span>
      <span className="items2Autres">{`${autre.utilisateur.first_name} ${autre.utilisateur.last_name}`}</span>
    </div>
  </Link>
  )
}

export default AutreListContainer