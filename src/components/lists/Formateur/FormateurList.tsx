import React, { useState } from 'react';
import { Formateur } from '../../../models/Formateur';
import FormateurListContainer from '../../listContainers/Formateur/FormateurListContainer';
import '../../../assets/styles/components/lists/FormateurList.css';

type FormateurListProps = {
  formateurs: Formateur[];
  currentPage: string;
};

const FormateurList: React.FC<FormateurListProps> = ({ formateurs, currentPage }) => {
  const [filterOrder, setFilterOrder] = useState<'ascendant' | 'descendant'>('ascendant');
  const [search, setSearch] = useState<string>('');
  const [selectedFormateur, setSelectedFormateur] = useState<Formateur | null>(null);

  const filterByName = () => {
    formateurs.sort((a, b) => {
      const nameA: any = `${a.last_name} ${a.first_name} ${a.createdAt}`;
      const nameB: any = `${b.last_name} ${b.first_name} ${b.createdAt}`;
      if (filterOrder === 'ascendant') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    setFilterOrder(filterOrder === 'ascendant' ? 'descendant' : 'ascendant');
  };

  const handleFormateurSelected = (formateur: Formateur) => {
    setSelectedFormateur(formateur);
  };

  const renderFormateursList = () => {
    const filteredFormateurs = formateurs.filter((formateur: Formateur) => {
      const firstName = formateur.first_name.toLocaleLowerCase();
      const lastName = formateur.last_name.toLocaleLowerCase();
      const searchLowerCase = search.toLocaleLowerCase();
      return firstName.startsWith(searchLowerCase) || lastName.startsWith(searchLowerCase);
    });
    return filteredFormateurs.map((formateur: Formateur) => {
      return (
        <FormateurListContainer
          key={formateur.id} 
          formateur={formateur} 
          onFormateurSelected={handleFormateurSelected} />
      );
    });
  };

  return (
    <>
      <section className={'list' + `${currentPage}` + 'Formateurs'}>
        <div className="filterBarFormateurs">
          <div className="allFormateurs">{formateurs.length} Formateurs</div>
          <button onClick={filterByName} className="filterNameButtonFormateurs">
            By Name
          </button>
          <input
            className="searchInputFormateurs"
            type="search"
            placeholder="   Recherche ..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="gridFormateurs">
          <h3 className="gridTitleFormateurs">Nom</h3>
          <h3 className="gridTitleFormateurs">Prénom</h3>
          <h3 className="gridTitleFormateurs">Email</h3>
          <h3 className="gridTitleFormateurs">DC</h3>
        </div>
        <div className="listContainerFormateurs">{renderFormateursList()}</div>
      </section>
    </>
  );
};

export default FormateurList;