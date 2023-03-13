import React, { useState } from 'react'
import { Stagiaire } from '../../models/Stagiaire'
import StagiaireListContainer from '../listContainers/StagiaireListContainer';
import '../../assets/styles/components/lists/StagiaireList.css'

type StagiaireListProps = {
  stagiaires: Stagiaire[];
  currentPage: string;
}

const StagiaireList : React.FC<StagiaireListProps> = ({stagiaires, currentPage}) => {

  const [filterOrder, setFilterOrder] = useState<string>('ascendant')
  const [search, setSearch] = useState<string>('')
  const [selectedStagiaire, setSelectedStagiaire] = useState<Stagiaire | null>(null);
  
  function filterByName() {
      stagiaires.sort((a, b) => {
          const nameA : any = `${a.last_name} ${a.first_name} ${a.createdAt}`;
          const nameB : any = `${b.last_name} ${b.first_name} ${b.createdAt}`;
          if (filterOrder === 'ascendant' ) {
              return nameA.localeCompare(nameB);
          } else {
              return nameB.localeCompare(nameA);
          }
      });
      setFilterOrder(filterOrder === 'ascendant' ? 'descendant' : 'ascendant');
  }

  const handleStagiaireSelected = (stagiaire: Stagiaire) => {
      setSelectedStagiaire(stagiaire);
  };
  
  const renderStagiairesList = () => {
  
    const filteredStagiaires = stagiaires.filter((stagiaire: Stagiaire) => {
      const name = `${stagiaire.first_name.toLocaleLowerCase()} ${stagiaire.last_name.toLocaleLowerCase()} ${stagiaire.email} ${stagiaire.createdAt.toString().slice(0, 10)}`;
      return search === '' ? stagiaire : name.includes(search);
    });

    return filteredStagiaires.map((stagiaire: Stagiaire) => {
      return (
        <StagiaireListContainer
          key={stagiaire.id} 
          stagiaire={stagiaire} 
          onStagiaireSelected={handleStagiaireSelected} />
      );
    });
      
  };
  
  return (
      <>
        <section className={'stagiairesList' + `${currentPage}`}>
          <div className="stagiairesFilterBar">
            <button className="stagiairesFilterAllButton">{stagiaires.length} Stagiaires</button>
            <button onClick={filterByName} className="stagiairesFilterNameButton">
              By Name
            </button>
            <input
              className="stagiairesSearchInput"
              type="search"
              placeholder="   Recherche ..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="stagiairesGrid">
            <h3 className="stagiairesGridTitle">Nom</h3>
            <h3 className="stagiairesGridTitle">Prénom</h3>
            <h3 className="stagiairesGridTitle">Email</h3>
            <h3 className="stagiairesGridTitle">DC</h3>
          </div>
          <div className="stagiairesListContainer">{renderStagiairesList()}</div>
        </section>
      </>
  );
}

export default StagiaireList