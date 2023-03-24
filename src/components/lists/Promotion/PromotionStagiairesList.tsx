import React, { useState } from 'react'
import { Stagiaire } from '../../../models/Stagiaire'
import PromotionStagiaireListContainer from '../../listContainers/Promotion/PromotionStagiaireListContainer'
import updateLogo from '../../../assets/img/modify.png'
import validateLogo from '../../../assets/img/checked.png'
import addUserLogo from '../../../assets/img/ajouter-un-utilisateur.png'
import '../../../assets/styles/components/lists/PromotionFicheList.css'
import { Promotion } from '../../../models/Reservation/Promotion'
import { promotionService } from '../../../services/Reservation/PromotionService'

type PromotionStagiairesListProps = {
  promotion: Promotion
}

const PromotionStagiairesList : React.FC<PromotionStagiairesListProps> = ({promotion}) => {
  
  const [search, setSearch] = useState<string>('')

  const [editMode, setEditMode] = useState<boolean>(false)

  const [addMode, setAddMode] = useState<boolean>(false)

  const [validate, setValidate] = useState<boolean>(false)

  const [promotionUpdated, setPromotionUpdated] = useState<Promotion>(promotion)

  const handleEditMode = () => {
    if (editMode == false) {
      setEditMode(true)
    } else {
      setEditMode(false)
    }
  }

  const handleValidate = () => {
    setValidate(true)
  }
  
  const handleAddUser = () => {
    if (addMode == false) {
      setAddMode(true)
    } else {
      setAddMode(false)
    }
  }

  const handleDeleteStagiaire = (idStagiaire : number) => {
    promotionService
      .deleteStagiairePromotion(promotion.id, idStagiaire)
      .then(async () => {
        const promoTest = await promotionService.getPromotionById(promotion.id);
        console.log(promoTest);
        return promoTest;
      })
      .then((res) => {
        setPromotionUpdated(res);
      })
      .catch((error) => console.error(error));
  };

  const renderPromotionStagiairesList = () => {

    const filteredStagiaires = promotionUpdated.stagiaires.filter((stagiaire: Stagiaire) => {
      const name = `${stagiaire.first_name.toLocaleLowerCase()} ${stagiaire.last_name.toLocaleLowerCase()} ${stagiaire.email} ${stagiaire.createdAt.toString().slice(0, 10)}`;
      return search === '' ? stagiaire : name.includes(search);
    }); 

    return filteredStagiaires.map((stagiaire: Stagiaire) => {
      return (
        <PromotionStagiaireListContainer
          key={stagiaire.id} 
          promotion={promotionUpdated}
          stagiaire={stagiaire}
          editMode={editMode}
          addMode={addMode}
          validate={validate}
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
              <img src={validateLogo} alt="validate" className='validateLogo' onClick={handleValidate}/>
              <img src={updateLogo} alt="update" className='updatelogo' onClick={handleEditMode}/>
              <div className='sumPromotionFiche'>{promotion.stagiaires.length}</div>
            </div>
            <div className="gridStagiairePromotionFicheUpdate">
              <h3 className="gridTitlePromotionFiche">Nom</h3>
              <h3 className="gridTitlePromotionFiche">Prénom</h3>
              <h3 className="gridTitlePromotionFiche">Email</h3>
              <img src={addUserLogo} alt="addStagiaire" className='addLogo' onClick={handleAddUser}/>
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