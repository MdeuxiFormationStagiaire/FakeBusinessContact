import React, { useEffect, useState } from 'react'
import { Stagiaire } from '../../../models/Stagiaire'
import PromotionStagiaireListContainer from '../../listContainers/Promotion/PromotionStagiaireListContainer'
import updateLogo from '../../../assets/img/modify.png'
import validateLogo from '../../../assets/img/checked.png'
import { Promotion } from '../../../models/Reservation/Promotion'
import { promotionService } from '../../../services/Reservation/PromotionService'
import '../../../assets/styles/components/lists/PromotionFicheList.css'

type PromotionStagiairesListProps = {
  promotion: Promotion
  allStagiairesList: Stagiaire[]
  onUpdatePromotion: Function
  onDeleteStagiaire: (idStagiaire : number) => void
  onAddStagiaire: (stagiaire : Stagiaire) => void
}

const PromotionStagiairesList : React.FC<PromotionStagiairesListProps> = ({promotion, allStagiairesList, onUpdatePromotion, onDeleteStagiaire, onAddStagiaire}) => {
  
  const [search, setSearch] = useState<string>('')

  const [editMode, setEditMode] = useState<boolean>(false)

  const [addMode, setAddMode] = useState<boolean>(false)

  const [promotionUpdated, setPromotionUpdated] = useState<Promotion>(promotion)

  const [defaultSelectedValue, setDefaultSelectedValue] = useState('')

  const handleEditMode = () => {
    if (editMode == false) {
      setEditMode(true)
      setAddMode(true)
    } else {
      setEditMode(false)
      setAddMode(false)
    }
  }

  const handleDeleteStagiaire = (idStagiaire : number) => {
    onDeleteStagiaire(idStagiaire)
  };

  const handleAddStagiaire = (event : React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedStagiaire = allStagiairesList.find((stagiaire) => stagiaire.id.toString() === selectedValue);
    if (selectedStagiaire) {
      onAddStagiaire(selectedStagiaire)
    }
  }

  // const handleAddStagiaire = (event : React.ChangeEvent<HTMLSelectElement>) => {
    // const selectedValue = event.target.value;
    // const selectedStagiaire = allStagiairesList.find((stagiaire) => stagiaire.id.toString() === selectedValue);
  //   const stagiairesCurrentPromotion : Stagiaire[] = promotion.stagiaires;
    // if (selectedStagiaire) {
  //     if (stagiairesCurrentPromotion.some(stagiaire => stagiaire.id === selectedStagiaire.id)) {
  //       alert("Ce stagiaire existe déjà dans cette liste.")
  //       return;
  //     } else {
  //       const newStagiaireList : Stagiaire[] = promotion.stagiaires.concat(selectedStagiaire)
  //       setPromotionUpdated((prevState) => ({
  //         ...prevState,
  //         stagiaires: newStagiaireList !== undefined ? newStagiaireList : prevState.stagiaires,
  //       }));
  //       promotionService.addStagiaireToPromotion(promotion.id, selectedStagiaire)
  //       .then(async () => {
  //         const newPromotion = await promotionService.getPromotionById(promotion.id);
  //         onUpdatePromotion(newPromotion)
  //         return newPromotion;
  //       })
  //       .then((res) => {
  //         setPromotionUpdated(res);
  //       })
  //       .catch((error) => console.error(error));
  //     }
  //   }
  // }

  const renderPromotionStagiairesList = () => {

    const filteredStagiaires = promotion.stagiaires.filter((stagiaire: Stagiaire) => {
      const name = `${stagiaire.first_name.toLocaleLowerCase()} ${stagiaire.last_name.toLocaleLowerCase()} ${stagiaire.email} ${stagiaire.createdAt.toString().slice(0, 10)}`;
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
          {addMode ? (
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
                  <img src={validateLogo} alt="update" className='updatelogo' onClick={handleEditMode}/>
                  <div className='sumPromotionFiche'>{promotion.stagiaires.length}</div>
                </div>
                <div className='addStagiaireMenu'>
                  <select
                      name="stagiaire"
                      value={defaultSelectedValue}
                      onChange={(event) => {handleAddStagiaire(event)}}
                      className='stagiaireInputPromotions'
                    >
                      <option value="">-- Sélectionner un stagiaire pour l'ajouter --</option>
                      {allStagiairesList.map((stagiaire) => (
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
                  <img src={validateLogo} alt="update" className='updatelogo' onClick={handleEditMode}/>
                  <div className='sumPromotionFiche'>{promotion.stagiaires.length}</div>
                </div>
                <div className="gridStagiairePromotionFicheUpdate">
                  <h3 className="gridTitlePromotionFiche">Nom</h3>
                  <h3 className="gridTitlePromotionFiche">Prénom</h3>
                  <h3 className="gridTitlePromotionFiche">Email</h3>
                </div>
                <div className="listContainerPromotionFiche">{renderPromotionStagiairesList()}</div>
              </section>
            </>
          )}
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
              <img src={updateLogo} alt="update" className='updatelogo' onClick={handleEditMode}/>
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