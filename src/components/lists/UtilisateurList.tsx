import React, { useState } from 'react'
import { Utilisateur } from '../../models/Utilisateur'

type UtilisateurListProps = {
    utilisateurs: Utilisateur[],
    currentPage: string
}

const UtilisateurList : React.FC<UtilisateurListProps> = ({utilisateurs, currentPage}) => {
  
  const [filterOrder, setFilterOrder] = useState<string>('ascendant')
  const [search, setSearch] = useState<string>('')
  const [selectedUtilisateur, setSelectedUtilisateur] = useState<Utilisateur | null>(null);
  
  function filterByName() {
      utilisateurs.sort((a, b) => {
          const nameA : any = `${a.last_name} ${a.first_name} ${a.email} ${a.position} ${a.createdAt}`;
          const nameB : any = `${b.last_name} ${b.first_name} ${b.email} ${b.position} ${b.createdAt}`;
          if (filterOrder === 'ascendant' ) {
              return nameA.localeCompare(nameB);
          } else {
              return nameB.localeCompare(nameA);
          }
      });
      setFilterOrder(filterOrder === 'ascendant' ? 'descendant' : 'ascendant');
  }

  const handleUtilisateurSelected = (utilisateur: Utilisateur) => {
      setSelectedUtilisateur(utilisateur);
  };
  
  const renderUtilisateursList = () => {
  
    const filteredUtilisateurs = utilisateurs.filter((utilisateur: Utilisateur) => {
      const name = `${utilisateur.first_name.toLocaleLowerCase()} ${utilisateur.last_name.toLocaleLowerCase()} ${utilisateur.email} ${utilisateur.createdAt.toString().slice(0, 10)}`;
      return search === '' ? utilisateur : name.includes(search);
    });

    return filteredUtilisateurs.map((utilisateur: Utilisateur) => {
      return (
        <UtilisateurListContainer
          key={utilisateur.id} 
          utilisateur={utilisateur} 
          onUtilisateurSelected={handleUtilisateurSelected} />
      );
    });
      
  };
  
  return (
    <>
    <section className={'utilisateursList' + `${currentPage}`}>
      <div className="utilisateursFilterBar">
        <button className="utilisateursFilterAllButton">{utilisateurs.length} Utilisateurs</button>
        <button onClick={filterByName} className="utilisateursFilterNameButton">
          By Name
        </button>
        <input
          className="utilisateursSearchInput"
          type="search"
          placeholder="   Recherche ..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="utilisateursGrid">
        <h3 className="utilisateursGridTitle">Nom</h3>
        <h3 className="utilisateursGridTitle">Prénom</h3>
        <h3 className="utilisateursGridTitle">Email</h3>
        <h3 className="utilisateursGridTitle">DC</h3>
      </div>
      <div className="utilisateursListContainer">{renderUtilisateursList()}</div>
    </section>
  </>
  )
}

export default UtilisateurList