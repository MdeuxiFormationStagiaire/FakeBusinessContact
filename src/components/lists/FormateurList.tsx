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
      const name = `${formateur.first_name.toLocaleLowerCase()} ${formateur.last_name.toLocaleLowerCase()} ${formateur.email} ${formateur.createdAt.toString().slice(0, 10)}`;
      return search === '' ? formateur : name.includes(search);
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
      <section className={'formateursList' + `${currentPage}`}>
        <div className="formateursFilterBar">
          <button className="formateursFilterAllButton">{formateurs.length} Formateurs</button>
          <button onClick={filterByName} className="formateursFilterNameButton">
            By Name
          </button>
          <input
            className="formateursSearchInput"
            type="search"
            placeholder="   Recherche ..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="formateursGrid">
          <h3 className="formateursGridTitle">Nom</h3>
          <h3 className="formateursGridTitle">Prénom</h3>
          <h3 className="formateursGridTitle">Email</h3>
          <h3 className="formateursGridTitle">DC</h3>
        </div>
        <div className="formateursListContainer">{renderFormateursList()}</div>
      </section>
    </>
  );
};

export default FormateurList;