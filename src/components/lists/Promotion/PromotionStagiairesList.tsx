import React, { useState } from 'react'
import { Stagiaire } from '../../../models/Stagiaire'
import PromotionStagiaireListContainer from '../../listContainers/Promotion/PromotionStagiaireListContainer'
import '../../../assets/styles/components/lists/PromotionFicheList.css'

type PromotionStagiairesListProps = {
  stagiaires: Stagiaire[]
}

const PromotionStagiairesList : React.FC<PromotionStagiairesListProps> = ({stagiaires}) => {
  
  const [search, setSearch] = useState<string>('')

  const renderPromotionStagiairesList = () => {

    const filteredStagiaires = stagiaires.filter((stagiaire: Stagiaire) => {
      const name = `${stagiaire.first_name.toLocaleLowerCase()} ${stagiaire.last_name.toLocaleLowerCase()} ${stagiaire.email} ${stagiaire.createdAt.toString().slice(0, 10)}`;
      return search === '' ? stagiaire : name.includes(search);
    }); 

    return filteredStagiaires.map((stagiaire: Stagiaire) => {
      return (
        <PromotionStagiaireListContainer
          key={stagiaire.id} 
          stagiaire={stagiaire}
        />
      );
    });
    
  };

  return (
    <>
      <section className={'listPromotionFiche'}>
        <div className="filterBarPromotionFiche">
          <div className="allPromotionFiche">Stagiaires</div>
          <input
            className="searchInputPromotionFiche"
            type="search"
            placeholder="   Recherche ..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className='sumPromotionFiche'>{stagiaires.length}</div>
        </div>
        <div className="gridStagiairePromotionFiche">
          <h3 className="gridTitlePromotionFiche">Nom</h3>
          <h3 className="gridTitlePromotionFiche">Prénom</h3>
          <h3 className="gridTitlePromotionFiche">Email</h3>
        </div>
        <div className="listContainerPromotionFiche">{renderPromotionStagiairesList()}</div>
      </section>
    </>
  )
}

export default PromotionStagiairesList