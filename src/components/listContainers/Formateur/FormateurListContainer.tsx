import { Formateur } from '../../../models/Formateur';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import '../../../assets/styles/components/listContainer/FormateurListContainer.css';

type FormateurListContainerProps = {
  formateur: Formateur;
  onFormateurSelected: (formateur: Formateur) => void;
};

const FormateurListContainer: React.FC<FormateurListContainerProps> = ({ formateur, onFormateurSelected }) => {
  const [isSelected, setIsSelected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFormateurSelected = () => {
    setIsSelected(true);
    onFormateurSelected(formateur);
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
    <Link to={`/formateurs/${formateur.id}`} className="ficheLink">
      <div
        className={`itemsContainerFormateurs ${isSelected ? 'itemsContainerSelectedFormateurs' : ''}`}
        onClick={handleFormateurSelected}
        ref={containerRef}
      >
        <span className="itemsFormateurs">{formateur.last_name}</span>
        <span className="itemsFormateurs">{formateur.first_name}</span>
        <span className="itemsFormateurs">{formateur.email}</span>
        <span className="items2Formateurs">{formateDate(formateur.createdAt)}</span>
      </div>
    </Link>
  );
};

export default FormateurListContainer;