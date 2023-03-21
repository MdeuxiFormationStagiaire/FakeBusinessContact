import React, { useState } from 'react'
import { Utilisateur } from '../../models/Utilisateur'
import UtilisateurListContainer from '../listContainers/UtilisateurListContainer'
import '../../assets/styles/components/lists/UtilisateurList.css'

type UtilisateurListProps = {
    utilisateurs: Utilisateur[],
    currentPage: string
}

const UtilisateurList : React.FC<UtilisateurListProps> = ({utilisateurs, currentPage}) => {
  
  const [filterOrder, setFilterOrder] = useState<string>('ascendant')
  const [search, setSearch] = useState<string>('')
  const [selectedUtilisateur, setSelectedUtilisateur] = useState<Utilisateur | null>(null);
  
  const filterByName = () => {
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

  const filterByAdminRight = () => {
    utilisateurs.sort((a, b) => {
      const adminA = a.adminRight ? 1 : 0;
      const adminB = b.adminRight ? 1 : 0;
      if (filterOrder === 'ascendant' ) {
        return adminA - adminB;
      } else {
        return adminB - adminA;
      }
    });
    setFilterOrder(filterOrder === 'ascendant' ? 'descendant' : 'ascendant');
  }

  const handleUtilisateurSelected = (utilisateur: Utilisateur) => {
      setSelectedUtilisateur(utilisateur);
  };
  
  const renderUtilisateursList = () => {
  
    const filteredUtilisateurs = utilisateurs.filter((utilisateur: Utilisateur) => {
      const name = 
      `
        ${utilisateur.first_name.toLocaleLowerCase()} 
        ${utilisateur.last_name.toLocaleLowerCase()} 
        ${utilisateur.email.toLocaleLowerCase()}
        ${utilisateur.position.toLocaleLowerCase()}
        ${utilisateur.createdAt.toString().slice(0, 10)}
      `;
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
    <section className={'list' + `${currentPage}` + 'Utilisateurs'}>
      <div className="filterBarUtilisateurs">
        <div className="allUtilisateurs">{utilisateurs.length} Utilisateurs</div>
        <button onClick={filterByName} className="filterNameButtonUtilisateurs">
          By Name
        </button>
        <button onClick={filterByAdminRight} className="filterAdminRightButtonUtilisateurs">
          By Admin
        </button>
        <input
          className="searchInputUtilisateurs"
          type="search"
          placeholder="   Recherche ..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="gridUtilisateurs">
        <h3 className="gridTitleUtilisateurs">Nom</h3>
        <h3 className="gridTitleUtilisateurs">Prénom</h3>
        <h3 className="gridTitleUtilisateurs">Email</h3>
        <h3 className="gridTitleUtilisateurs">Fonction</h3>
        <h3 className="gridTitleUtilisateurs">DC</h3>
        <h3 className="gridTitleUtilisateurs">Admin</h3>
      </div>
      <div className="listContainerUtilisateurs">{renderUtilisateursList()}</div>
    </section>
  </>
  )
}

export default UtilisateurList