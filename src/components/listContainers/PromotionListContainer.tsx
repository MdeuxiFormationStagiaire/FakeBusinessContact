import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { Promotion } from '../../models/Reservation/Promotion'
import '../../assets/styles/components/listContainer/PromotionListContainer.css'

type PromotionListContainerProsp = {
    promotion: Promotion;
    onPromotionSelected: (promotion: Promotion) => void;
}

const PromotionListContainer : React.FC<PromotionListContainerProsp> = ({promotion, onPromotionSelected}) => {
  
    const [isSelected, setIsSelected] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePromotionSelected = () => {
        setIsSelected(true);
        onPromotionSelected(promotion);
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
        <Link to={`/promotions/${promotion.id}`} className="ficheLink">
        <div
          className={`itemsContainerPromotions ${isSelected ? 'itemsContainerSelectedPromotions' : ''}`}
          onClick={handlePromotionSelected}
          ref={containerRef}
        >
          <span className="itemsPromotions">{promotion.description}</span>
          <span className="itemsPromotions">{formateDate(promotion.createdAt)}</span>
          <span className="itemsPromotions">{formateDate(promotion.startAt)}</span>
          <span className="itemsPromotions">{formateDate(promotion.endAt)}</span>
          <span className="itemsPromotions">{`${promotion.formateur.first_name} ${promotion.formateur.last_name}`}</span>
          <span className="itemsPromotions">{promotion.stagiaires.length}</span>
          <span className="itemsPromotions">{promotion.salle.name}</span>
          <span className="items2Promotions">{`${promotion.utilisateur.first_name} ${promotion.utilisateur.last_name}`}</span>
        </div>
      </Link>
    )
}

export default PromotionListContainer