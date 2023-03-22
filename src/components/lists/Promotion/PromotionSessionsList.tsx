import React, { useState } from 'react'
import { Session } from '../../../models/Reservation/Session'
import PromotionSessionListContainer from '../../listContainers/Promotion/PromotionSessionListContainer'

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
        <section className={'listSessionsPromotion'}>
          <div className="filterBarSessionsPromotion">
            <div className="allSessionsPromotion">Sessions</div>
            <input
              className="searchInputSessionsPromotion"
              type="search"
              placeholder="   Recherche ..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className='sumSessionsPromotion'>{sessions.length}</div>
          </div>
          <div className="gridSessionsPromotion">
            <h3 className="gridTitleSessionsPromotion">Description</h3>
            <h3 className="gridTitleSessionsPromotion">DD</h3>
            <h3 className="gridTitleSessionsPromotion">DF</h3>
            <h3 className="gridTitleSessionsPromotion">Formateur</h3>
          </div>
          <div className="listContainerSessionsPromotion">{renderPromotionSessionsList()}</div>
        </section>
    </>
)
}

export default PromotionSessionsList