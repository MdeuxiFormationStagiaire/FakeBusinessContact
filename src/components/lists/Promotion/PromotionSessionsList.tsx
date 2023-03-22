import React, { useState } from 'react'
import { Session } from '../../../models/Reservation/Session'
import PromotionSessionListContainer from '../../listContainers/Promotion/PromotionSessionListContainer'
import '../../../assets/styles/components/lists/PromotionFicheList.css'

type PromotionSessionsListProps = {
  sessions: Session[]
}

const PromotionSessionsList : React.FC<PromotionSessionsListProps> = ({sessions}) => {

  const [search, setSearch] = useState<string>('')

  const renderPromotionSessionsList = () => {
    const filteredSessions = sessions.filter((session: Session) => {
        const name = `
            ${session.desc.toLocaleLowerCase()}  
            ${session.startAt.toString().slice(0, 10)} 
            ${session.endAt.toString().slice(0, 10)} 
            ${session.formateur.first_name.toLocaleLowerCase()} 
            ${session.formateur.last_name.toLocaleLowerCase()}`
        ;
        return search === '' ? session : name.includes(search);
    });

    return filteredSessions.map((session: Session) => {
      return (
        <PromotionSessionListContainer
          key={session.id} 
          session={session}
        />
      );
    });
  };

  return (
    <>
        <section className={'listPromotionFiche'}>
          <div className="filterBarPromotionFiche">
            <div className="allPromotionFiche">Sessions</div>
            <input
              className="searchInputPromotionFiche"
              type="search"
              placeholder="   Recherche ..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className='sumPromotionFiche'>{sessions.length}</div>
          </div>
          <div className="gridSessionPromotionFiche">
            <h3 className="gridTitlePromotionFiche">Description</h3>
            <h3 className="gridTitlePromotionFiche">DD</h3>
            <h3 className="gridTitlePromotionFiche">DF</h3>
            <h3 className="gridTitlePromotionFiche">Formateur</h3>
          </div>
          <div className="listContainerPromotionFiche">{renderPromotionSessionsList()}</div>
        </section>
    </>
  )
}

export default PromotionSessionsList