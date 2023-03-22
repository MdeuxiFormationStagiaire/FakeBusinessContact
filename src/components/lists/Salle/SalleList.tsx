import React, { useState } from 'react'
import { Salle } from '../../../models/Salle';
import SalleListContainer from '../../listContainers/Salle/SalleListContainer';
import '../../../assets/styles/components/lists/SalleList.css'

type SalleListProps = {
  salles: Salle[];
  currentPage: string;
}

const SalleList : React.FC<SalleListProps> = ({salles, currentPage}) => {

  const [filterOrder, setFilterOrder] = useState<string>('ascendant')
  const [search, setSearch] = useState<string>('')
  const [selectedSalle, setSelectedSalle] = useState<Salle | null>(null);

  const filterByName = () => {
      salles.sort((a, b) => {
          const nameA : any = `${a.name} ${a.capacity} ${a.indication} ${a.floor}`;
          const nameB : any = `${b.name} ${b.capacity} ${b.indication} ${b.floor}`;
          if (filterOrder === 'ascendant' ) {
              return nameA.localeCompare(nameB);
          } else {
              return nameB.localeCompare(nameA);
          }
      });
      setFilterOrder(filterOrder === 'ascendant' ? 'descendant' : 'ascendant');
  }

  const handleSalleSelected = (salle: Salle) => {
      setSelectedSalle(salle);
  };

  const renderSallesList = () => {

      const filteredSalles = salles.filter((salle: Salle) => {
        const name = `${salle.name.toLowerCase()} ${salle.indication.toLowerCase()} ${salle.capacity} ${salle.floor} ${salle.createdAt.toString().slice(0, 10)}`;
        return search === '' ? salle : name.includes(search);
      });
  
      return filteredSalles.map((salle: Salle) => {
        return (
          <SalleListContainer
            key={salle.id} 
            salle={salle} 
            onSalleSelected={handleSalleSelected} />
        );
      });    
  };

  return (
    <>
      <section className={'list' + `${currentPage}` + 'Salles'}>
        <div className="filterBarSalles">
          <div className="allSalles">{salles.length} Salles</div>
          <button onClick={filterByName} className="filterNameButtonSalles">
            By Name
          </button>
          <input
            className="searchInputSalles"
            type="search"
            placeholder="   Recherche ..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="gridSalles">
          <h3 className="gridTitleSalles">Nom</h3>
          <h3 className="gridTitleSalles">Capacité</h3>
          <h3 className="gridTitleSalles">Indication</h3>
          <h3 className="gridTitleSalles">Etage</h3>
          <h3 className="gridTitleSalles">DC</h3>
        </div>
        <div className="listContainerSalles">{renderSallesList()}</div>
      </section>
    </>
  );
}

export default SalleList