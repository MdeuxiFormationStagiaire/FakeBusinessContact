import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { Utilisateur } from '../../models/Utilisateur'

type UtilisateurListContainerProps = {
    utilisateur: Utilisateur,
    onUtilisateurSelected: (utilisateur : Utilisateur) => void;
}

const UtilisateurListContainer : React.FC<UtilisateurListContainerProps> = ({utilisateur, onUtilisateurSelected}) => {
  
  const [isSelected, setIsSelected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleUtilisateurSelected = () => {
    setIsSelected(true);
    onUtilisateurSelected(utilisateur);
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
    <Link to={`/utilisateurs/${utilisateur.id}`} className="ficheLink">
    <div
      className={`itemsContainer ${isSelected ? 'itemsContainerSelected' : ''}`}
      onClick={handleUtilisateurSelected}
      ref={containerRef}
    >
      <span className="items">{utilisateur.last_name}</span>
      <span className="items">{utilisateur.first_name}</span>
      <span className="items">{utilisateur.email}</span>
      <span className="items">{utilisateur.position}</span>
      <span className="items2">
        {utilisateur.createdAt.toLocaleString('fr-FR').slice(8, 10) +
          '/' +
          utilisateur.createdAt.toLocaleString('fr-FR').slice(5, 7) +
          '/' +
          utilisateur.createdAt.toLocaleString('fr-FR').slice(0, 4)}
      </span>
    </div>
    </Link>
  )
}

export default UtilisateurListContainer