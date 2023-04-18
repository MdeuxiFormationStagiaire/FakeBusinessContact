import React, { useEffect, useState } from 'react'
import { Stagiaire } from '../../../models/Stagiaire'
import PromotionStagiaireListContainer from '../../listContainers/Promotion/PromotionStagiaireListContainer'
import { Promotion } from '../../../models/Reservation/Promotion'
import '../../../assets/styles/components/lists/PromotionFicheList.css'

type PromotionStagiairesListProps = {
  promotion: Promotion
  allStagiaires: Stagiaire[]
  onDeleteStagiaire: (idStagiaire : number) => void
  onAddStagiaire: (stagiaire : Stagiaire) => void
  editMode : boolean
}

const PromotionStagiairesList : React.FC<PromotionStagiairesListProps> = ({promotion, allStagiaires, onDeleteStagiaire, onAddStagiaire, editMode}) => {
  
  const [search, setSearch] = useState<string>('')

  const [defaultSelectedValue, setDefaultSelectedValue] = useState('')
  
  const handleDeleteStagiaire = async (idStagiaire : number) => {
    onDeleteStagiaire(idStagiaire)
  }
  
  const handleAddStagiaire = async (event : React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedStagiaire = allStagiaires.find((stagiaire) => stagiaire.id.toString() === selectedValue);
    if (selectedStagiaire) {
      onAddStagiaire(selectedStagiaire)
    }
  }

  const renderPromotionStagiairesList = () => {
    const filteredStagiaires = promotion.stagiaires.filter((stagiaire: Stagiaire) => {
      const name = `
        ${stagiaire.first_name.toLocaleLowerCase()} 
        ${stagiaire.last_name.toLocaleLowerCase()} 
        ${stagiaire.email} 
        ${stagiaire.createdAt.toString().slice(0, 10)}
      `;
      return search === '' ? stagiaire : name.includes(search);
    }); 
    return filteredStagiaires.map((stagiaire: Stagiaire) => {
      return (
        <PromotionStagiaireListContainer
          key={stagiaire.id}
          stagiaire={stagiaire}
          editMode={editMode}
          onDeleteStagiaire={handleDeleteStagiaire}
        />
      );
    });
  };
    
  return (
    <>
      {editMode ? (
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
              <div className='sumPromotionFiche'>{promotion.stagiaires.length}</div>
            </div>
            <div className='addStagiaireMenu'>
              <select
                  name="stagiaire"
                  value={defaultSelectedValue}
                  onChange={(event) => handleAddStagiaire(event)}
                  className='stagiaireInputPromotions'
                >
                  <option value="">-- Sélectionner un stagiaire pour l'ajouter --</option>
                  {allStagiaires.map((stagiaire) => (
                    <option key={stagiaire.id} value={stagiaire.id} className="stagiaireInputContainer">
                      {stagiaire.last_name} {stagiaire.first_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="gridStagiairePromotionFicheUpdate">
              <h3 className="gridTitlePromotionFiche">Nom</h3>
              <h3 className="gridTitlePromotionFiche">Prénom</h3>
              <h3 className="gridTitlePromotionFiche">Email</h3>
            </div>
            <div className="listContainerPromotionFiche">{renderPromotionStagiairesList()}</div>
          </section>
        </>
      ) : (
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
              <div className='sumPromotionFiche'>{promotion.stagiaires.length}</div>
            </div>
            <div className="gridStagiairePromotionFiche">
              <h3 className="gridTitlePromotionFiche">Nom</h3>
              <h3 className="gridTitlePromotionFiche">Prénom</h3>
              <h3 className="gridTitlePromotionFiche">Email</h3>
            </div>
            <div className="listContainerPromotionFiche">{renderPromotionStagiairesList()}</div>
          </section>
        </>
      )}
    </>
  )
}

export default PromotionStagiairesList