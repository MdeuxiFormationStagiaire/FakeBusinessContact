import React, { useState } from 'react'
import { Stagiaire } from '../../../models/Stagiaire'
import StagiaireListContainer from '../../listContainers/Stagiaire/StagiaireListContainer';
import '../../../assets/styles/components/lists/StagiaireList.css'

type StagiaireListProps = {
  stagiaires: Stagiaire[];
  currentPage: string;
}

const StagiaireList : React.FC<StagiaireListProps> = ({stagiaires, currentPage}) => {

  const [filterOrder, setFilterOrder] = useState<string>('ascendant')
  const [search, setSearch] = useState<string>('')
  const [selectedStagiaire, setSelectedStagiaire] = useState<Stagiaire | null>(null);
  
  const filterByName = () => {
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
        <section className={'list' + `${currentPage}` + 'Stagiaires'}>
          <div className="filterBarStagiaires">
            <div className="allStagiaires">{stagiaires.length} Stagiaires</div>
            <button onClick={filterByName} className="filterNameButtonStagiaires">
              By Name
            </button>
            <input
              className="searchInputStagiaires"
              type="search"
              placeholder="   Recherche ..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="gridStagiaires">
            <h3 className="gridTitleStagiaires">Nom</h3>
            <h3 className="gridTitleStagiaires">Prénom</h3>
            <h3 className="gridTitleStagiaires">Email</h3>
            <h3 className="gridTitleStagiaires">DC</h3>
          </div>
          <div className="listContainerStagiaires">{renderStagiairesList()}</div>
        </section>
      </>
  );
}

export default StagiaireList