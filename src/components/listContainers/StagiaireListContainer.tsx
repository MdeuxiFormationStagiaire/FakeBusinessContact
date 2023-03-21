import { Link } from 'react-router-dom'
import { Stagiaire } from '../../models/Stagiaire'
import '../../assets/styles/components/listContainer/StagiaireListContainer.css'
import { useEffect, useRef, useState } from 'react';

type StagiaireListContainerProps = {
  stagiaire: Stagiaire;
  onStagiaireSelected: (stagiaire: Stagiaire) => void;
};

const FormateurListContainer: React.FC<StagiaireListContainerProps> = ({ stagiaire, onStagiaireSelected }) => {
  
  const [isSelected, setIsSelected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStagiaireSelected = () => {
    setIsSelected(true);
    onStagiaireSelected(stagiaire);
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
    <Link to={`/stagiaires/${stagiaire.id}`} className="ficheLink">
      <div
        className={`itemsContainerStagiaires ${isSelected ? 'itemsContainerSelectedStagiaires' : ''}`}
        onClick={handleStagiaireSelected}
        ref={containerRef}
      >
        <span className="itemsStagiaires">{stagiaire.last_name}</span>
        <span className="itemsStagiaires">{stagiaire.first_name}</span>
        <span className="itemsStagiaires">{stagiaire.email}</span>
        <span className="items2Stagiaires">{formateDate(stagiaire.createdAt)}</span>
      </div>
    </Link>
  );
};

export default FormateurListContainer;