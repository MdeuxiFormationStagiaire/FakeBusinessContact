import React, { useState } from 'react';
import { Formateur } from '../../models/Formateur';
import FormateurListContainer from '../listContainers/FormateurListContainer';
import '../../assets/styles/components/lists/FormateurList.css';

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
      const name = `${formateur.first_name} ${formateur.last_name} ${formateur.email} ${formateur.createdAt.toString().slice(0, 10)}`;
      return search === '' ? formateur : name.includes(search);
    });

    if (selectedFormateur) {
      const formateurIndex = filteredFormateurs.findIndex((formateur) => formateur.id === selectedFormateur.id);
      if (formateurIndex !== -1) {
        filteredFormateurs.splice(formateurIndex, 1);
        filteredFormateurs.unshift(selectedFormateur);
      }
    }

    return filteredFormateurs.map((formateur: Formateur) => {
      return (
        <FormateurListContainer key={formateur.id} formateur={formateur} onFormateurSelected={handleFormateurSelected} />
      );
    });
  };

  return (
    <>
      <section className={'formateursList' + `${currentPage}`}>
        <div className="filterBar">
          <button className="filterAllButton">{formateurs.length} Formateurs</button>
          <button onClick={filterByName} className="filterNameButton">
            By Name
          </button>
          <input
            className="searchInput"
            type="search"
            placeholder="   Recherche ..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid">
          <h3 className="gridTitle">Nom</h3>
          <h3 className="gridTitle">Prénom</h3>
          <h3 className="gridTitle">Email</h3>
          <h3 className="gridTitle">DC</h3>
        </div>
        <div className="listContainer">{renderFormateursList()}</div>
      </section>
    </>
  );
};

export default FormateurList;