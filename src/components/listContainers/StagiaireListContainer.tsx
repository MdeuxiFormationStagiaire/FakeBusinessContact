import { Link } from 'react-router-dom'
import { Stagiaire } from '../../models/Stagiaire'
import '../../assets/styles/components/listContainer/FormStagListContainer.css'
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

  return (
    <Link to={`/stagiaires/${stagiaire.id}`} className="ficheLink">
      <div
        className={`itemsContainer ${isSelected ? 'itemsContainerSelected' : ''}`}
        onClick={handleStagiaireSelected}
        ref={containerRef}
      >
        <span className="items">{stagiaire.last_name}</span>
        <span className="items">{stagiaire.first_name}</span>
        <span className="items">{stagiaire.email}</span>
        <span className="items2">
          {stagiaire.createdAt.toLocaleString('fr-FR').slice(8, 10) +
            '/' +
            stagiaire.createdAt.toLocaleString('fr-FR').slice(5, 7) +
            '/' +
            stagiaire.createdAt.toLocaleString('fr-FR').slice(0, 4)}
        </span>
      </div>
    </Link>
  );
};

export default FormateurListContainer;