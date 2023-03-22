import React, { useState } from 'react'
import { Stagiaire } from '../../models/Stagiaire'
import PromotionStagiaireListContainer from '../listContainers/PromotionStagiaireListContainer'

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
    <section className={'listStagiairesPromotion'}>
      <div className="filterBarStagiairesPromotion">
        <div className="allStagiairesPromotion">Stagiaires</div>
        <input
          className="searchInputStagiairesPromotion"
          type="search"
          placeholder="   Recherche ..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className='sumStagiairesPromotion'>{stagiaires.length}</div>
      </div>
      <div className="gridStagiairesPromotion">
        <h3 className="gridTitleStagiairesPromotion">Nom</h3>
        <h3 className="gridTitleStagiairesPromotion">Prénom</h3>
        <h3 className="gridTitleStagiairesPromotion">Email</h3>
      </div>
      <div className="listContainerStagiairesPromotion">{renderPromotionStagiairesList()}</div>
    </section>
  </>
)
}

export default PromotionStagiairesList