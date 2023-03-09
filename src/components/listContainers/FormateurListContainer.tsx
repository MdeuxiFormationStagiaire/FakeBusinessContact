import { Formateur } from '../../models/Formateur';
import { Link } from 'react-router-dom';
import '../../assets/styles/components/listContainer/ListContainer.css';
import { useEffect, useRef, useState } from 'react';

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

  return (
    <Link to={`/formateurs/${formateur.id}`} className="ficheLink">
      <div
        className={`itemsContainer ${isSelected ? 'itemsContainerSelected' : ''}`}
        onClick={handleFormateurSelected}
        ref={containerRef}
      >
        <span className="items">{formateur.last_name}</span>
        <span className="items">{formateur.first_name}</span>
        <span className="items">{formateur.email}</span>
        <span className="items2">
          {formateur.createdAt.toLocaleString('fr-FR').slice(8, 10) +
            '/' +
            formateur.createdAt.toLocaleString('fr-FR').slice(5, 7) +
            '/' +
            formateur.createdAt.toLocaleString('fr-FR').slice(0, 4)}
        </span>
      </div>
    </Link>
  );
};

export default FormateurListContainer;