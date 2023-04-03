import React, { useState } from 'react'
import { Autre } from '../../../models/Reservation/Autre'
import AutreListContainer from '../../listContainers/Autre/AutreListContainer';
import '../../../assets/styles/components/lists/AutreList.css'

type AutreListProps = {
  autres: Autre[];
  currentPage: string
}

const AutreList : React.FC<AutreListProps> = ({autres, currentPage}) => {

  const [filterOrder, setFilterOrder] = useState<string>('ascendant')
  const [search, setSearch] = useState<string>('')
  const [selectedAutre, setSelectedAutre] = useState<Autre | null>(null);

  const filterBySalle = () => {
    autres.sort((a, b) => {
      const salleA : string = `${a.salle.name}`;
      const salleB : string = `${b.salle.name}`;
      if (filterOrder === 'ascendant') {
        return salleA.localeCompare(salleB);
      } else {
        return salleB.localeCompare(salleA);
      };
    });
    setFilterOrder(filterOrder === 'ascendant' ? 'descendant' : 'ascendant');
  }

  const filterByCollaborateur = () => {
    autres.sort((a, b) => {
      const utilisateurA : string = `${a.utilisateur.first_name} ${a.utilisateur.last_name}`;
      const utilisateurB : string = `${b.utilisateur.first_name} ${b.utilisateur.last_name}`;
      if (filterOrder === 'ascendant') {
        return utilisateurA.localeCompare(utilisateurB);
      } else {
        return utilisateurB.localeCompare(utilisateurA);
      };
    });
    setFilterOrder(filterOrder === 'ascendant' ? 'descendant' : 'ascendant');
  }

  const filterByType = () => {
    autres.sort((a, b) => {
      const typeA : string = `${a.type}`;
      const typeB : string = `${b.type}`;
      if (filterOrder === 'ascendant') {
        return typeA.localeCompare(typeB);
      } else {
        return typeB.localeCompare(typeA);
      };
    });
    setFilterOrder(filterOrder === 'ascendant' ? 'descendant' : 'ascendant');
  }

  const handleAutreSelected = (autre: Autre) => {
    setSelectedAutre(autre);
  };

  const renderAutresList = () => {

    const filteredAutres = autres.filter((autre: Autre) => {
      const name = 
      `
        ${autre.desc.toLocaleLowerCase()} 
        ${autre.salle.name.toLocaleLowerCase()} 
        ${autre.utilisateur.first_name.toLocaleLowerCase()} 
        ${autre.utilisateur.last_name.toLocaleLowerCase()}
      `;
      return search === '' ? autre : name.includes(search);
    });

    return filteredAutres.map((autre: Autre) => {
      return (
        <AutreListContainer
          key={autre.id} 
          autre={autre} 
          onAutreSelected={handleAutreSelected}/>
      );
    });
  }

  return (
    <>
      <section className={'list' + `${currentPage}` + 'Autres'}>
        <div className="filterBarAutres">
          <div className="allAutres">{autres.length} Réservations</div>
          <button onClick={filterByType} className="filterTypeButtonAutres">
            By Type
          </button>
          <button onClick={filterByCollaborateur} className="filterNameButtonAutres">
            By Utilisateur
          </button>
          <button onClick={filterBySalle} className="filterSalleButtonAutres">
            By Salle
          </button>
          <input
            className="searchInputAutres"
            type="search"
            placeholder="   Recherche ..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="gridAutres">
          <h3 className="gridTitleAutres">Types</h3>
          <h3 className="gridTitleAutres">Description</h3>
          <h3 className="gridTitleAutres">DC</h3>
          <h3 className="gridTitleAutres">DD</h3>
          <h3 className="gridTitleAutres">DF</h3>
          <h3 className="gridTitleAutres">Salle</h3>
          <h3 className="gridTitleAutres">Collaborateurs</h3>
        </div>
        <div className="listContainerAutres">{renderAutresList()}</div>
      </section>
    </>
  )
}

export default AutreList