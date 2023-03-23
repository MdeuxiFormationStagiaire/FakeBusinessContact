import React, { useState } from 'react'
import { Stagiaire } from '../../../models/Stagiaire'
import PromotionStagiaireListContainer from '../../listContainers/Promotion/PromotionStagiaireListContainer'
import updateLogo from '../../../assets/img/modify.png'
import '../../../assets/styles/components/lists/PromotionFicheList.css'
import { Promotion } from '../../../models/Reservation/Promotion'

type PromotionStagiairesListProps = {
  promotion: Promotion
  stagiaires: Stagiaire[]
}

const PromotionStagiairesList : React.FC<PromotionStagiairesListProps> = ({promotion, stagiaires}) => {
  
  const [search, setSearch] = useState<string>('')

  const [editMode, setEditMode] = useState<boolean>(false)

  const renderPromotionStagiairesList = () => {

    const filteredStagiaires = stagiaires.filter((stagiaire: Stagiaire) => {
      const name = `${stagiaire.first_name.toLocaleLowerCase()} ${stagiaire.last_name.toLocaleLowerCase()} ${stagiaire.email} ${stagiaire.createdAt.toString().slice(0, 10)}`;
      return search === '' ? stagiaire : name.includes(search);
    }); 

    return filteredStagiaires.map((stagiaire: Stagiaire) => {
      return (
        <PromotionStagiaireListContainer
          key={stagiaire.id} 
          promotion={promotion}
          stagiaire={stagiaire}
          editMode={editMode}
        />
      );
    });
    
  };

  const handleEditMode = () => {
    if (editMode == false) {
      setEditMode(true)
    } else {
      setEditMode(false)
    }
  }

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
          <button className='udpateStagaireListButton' onClick={handleEditMode}>
            <img src={updateLogo} alt="update" className='updatelogo'/>
          </button>
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