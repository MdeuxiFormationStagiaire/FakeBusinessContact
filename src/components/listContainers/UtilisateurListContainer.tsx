import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { Utilisateur } from '../../models/Utilisateur'
import trueLogo from '../../assets/img/accept.png'
import falseLogo from '../../assets/img/multiply.png'
import '../../assets/styles/components/listContainer/UtilisateurListContainer.css'

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
      className={`itemsContainerUtilisateurs ${isSelected ? 'itemsContainerSelectedUtilisateurs' : ''}`}
      onClick={handleUtilisateurSelected}
      ref={containerRef}
    >
      <span className="itemsUtilisateurs">{utilisateur.last_name}</span>
      <span className="itemsUtilisateurs">{utilisateur.first_name}</span>
      <span className="itemsUtilisateurs">{utilisateur.email}</span>
      <span className="itemsUtilisateurs">{utilisateur.position}</span>
      <span className="itemsUtilisateurs">
        {utilisateur.createdAt.toLocaleString('fr-FR').slice(8, 10) +
          '/' +
          utilisateur.createdAt.toLocaleString('fr-FR').slice(5, 7) +
          '/' +
          utilisateur.createdAt.toLocaleString('fr-FR').slice(0, 4)}
      </span>
      {utilisateur.adminRight ? (
        <span className="items2Utilisateurs">
          <img src={trueLogo} alt="Admin Right" className="logo" />
        </span>
      ) : (
        <span className="items2Utilisateurs">
          <img src={falseLogo} alt="No Admin Right" className="logo" />
        </span>
      )}
    </div>
    </Link>
  )
}

export default UtilisateurListContainer