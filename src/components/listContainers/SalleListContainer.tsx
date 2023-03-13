import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { Salle } from '../../models/Salle';
import '../../assets/styles/components/listContainer/SalleListContainer.css'

type SalleListContainerProps = {
    salle: Salle;
    onSalleSelected: (salle: Salle) => void;
  };

const SalleListContainer : React.FC<SalleListContainerProps> = ({salle, onSalleSelected}) => {
  
    const [isSelected, setIsSelected] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleSalleSelected = () => {
        setIsSelected(true);
        onSalleSelected(salle);
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
  
    return (
        <Link to={`/salles/${salle.id}`} className="ficheLink">
            <div
                className={`itemsContainerSalles ${isSelected ? 'itemsContainerSelectedSalles' : ''}`}
                onClick={handleSalleSelected}
                ref={containerRef}
            >
        <span className="itemsSalles">{salle.name}</span>
        <span className="itemsSalles">{salle.capacity}</span>
        <span className="itemsSalles">{salle.indication}</span>
        <span className="itemsSalles">{salle.floor}</span>
        <span className="items2Salles">
          {salle.createdAt.toLocaleString('fr-FR').slice(8, 10) +
            '/' +
            salle.createdAt.toLocaleString('fr-FR').slice(5, 7) +
            '/' +
            salle.createdAt.toLocaleString('fr-FR').slice(0, 4)}
        </span>
      </div>
    </Link>
  )
}

export default SalleListContainer