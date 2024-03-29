import React, { useState } from 'react'
import { Promotion } from '../../../models/Reservation/Promotion'
import PromotionListContainer from '../../listContainers/Promotion/PromotionListContainer';
import '../../../assets/styles/components/lists/PromotionList.css'
import { format } from 'date-fns';

type PromotionListProps = {
  promotions: Promotion[];
  currentPage: string
}

const PromotionList : React.FC<PromotionListProps> = ({promotions, currentPage}) => {
  
  const [filterOrder, setFilterOrder] = useState<string>('ascendant')
  const [search, setSearch] = useState<string>('')
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);

  const filterBySalle = () => {
    promotions.sort((a, b) => {
      const salleA : string = `${a.salle.name}`;
      const salleB : string = `${b.salle.name}`;
      if (filterOrder === 'ascendant') {
        return salleA.localeCompare(salleB);
      } else {
        return salleB.localeCompare(salleA);
      };
    });
    setFilterOrder(filterOrder === 'ascendant' ? 'descendant' : 'ascendant');
  }

  const filterByFormateur = () => {
    promotions.sort((a, b) => {
      const formateurA : string = `${a.formateur.first_name} ${a.formateur.last_name}`;
      const formateurB : string = `${b.formateur.first_name} ${b.formateur.last_name}`;
      if (filterOrder === 'ascendant') {
        return formateurA.localeCompare(formateurB);
      } else {
        return formateurB.localeCompare(formateurA);
      };
    });
    setFilterOrder(filterOrder === 'ascendant' ? 'descendant' : 'ascendant');
  }

  const handlePromotionSelected = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
  };

  const renderPromotionsList = () => {

    const filteredPromotions = promotions.filter((promotion: Promotion) => {
      const name = promotion.description.toLocaleLowerCase();
      const salle = promotion.salle.name.toLocaleLowerCase();
      const formateurLastName = promotion.formateur.last_name.toLocaleLowerCase();
      const formateurFirstName = promotion.formateur.first_name.toLocaleLowerCase();
      const startAt = format(new Date(promotion.startAt), 'dd/MM/yyyy');
      const endAt = format(new Date(promotion.endAt), 'dd/MM/yyyy');
      const searchLowerCase = search.toLocaleLowerCase();
      return (
        name.startsWith(searchLowerCase) || salle.startsWith(searchLowerCase) ||
        formateurLastName.startsWith(searchLowerCase) || formateurFirstName.startsWith(searchLowerCase) ||
        startAt.startsWith(searchLowerCase) || endAt.startsWith(searchLowerCase)
      );
    });
  
    return filteredPromotions.map((promotion: Promotion) => {
      return (
        <PromotionListContainer
          key={promotion.id} 
          promotion={promotion} 
          onPromotionSelected={handlePromotionSelected} />
      );
    });
  }
  
  return (
    <>
    <section className={'list' + `${currentPage}` + 'Promotions'}>
      <div className="filterBarPromotions">
        <div className="allPromotions">{promotions.length} Promotions</div>
        <button onClick={filterBySalle} className="filterSalleButtonPromotions">
          By Salle
        </button>
        <button onClick={filterByFormateur} className="filterNameButtonPromotions">
          By Formateur
        </button>
        <input
          className="searchInputPromotions"
          type="search"
          placeholder="   Recherche ..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="gridPromotions">
        <h3 className="gridTitlePromotions">Description</h3>
        <h3 className="gridTitlePromotions">DC</h3>
        <h3 className="gridTitlePromotions">DD</h3>
        <h3 className="gridTitlePromotions">DF</h3>
        <h3 className="gridTitlePromotions">Formateur</h3>
        <h3 className="gridTitlePromotions">Eff.</h3>
        <h3 className="gridTitlePromotions">Salle</h3>
        <h3 className="gridTitlePromotions">Collaborateurs</h3>
      </div>
      <div className="listContainerPromotions">{renderPromotionsList()}</div>
    </section>
  </>
  )
}

export default PromotionList