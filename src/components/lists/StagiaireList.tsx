import React, { useState } from 'react'
import { Stagiaire } from '../../models/Stagiaire'
import StagiaireListContainer from '../listContainers/StagiaireListContainer';
import '../../assets/styles/components/lists/StagiaireList.css'

type StagiaireListProps = {
  stagiaires: Stagiaire[];
  currentPage: string;
}

const StagiaireList : React.FC<StagiaireListProps> = ({stagiaires, currentPage}) => {

  const [filterOrder, setFilterOrder] = useState<string>('ascendant')
  const [search, setSearch] = useState<string>('')

  function filterByName() {
      stagiaires.sort((a, b) => {
          const nameA : any = `${a.last_name} ${a.first_name} ${a.createdAt}`;
          const nameB : any = `${b.last_name} ${b.first_name} ${b.createdAt}`;
          if (filterOrder === 'ascendant' ) {
              return nameA.localeCompare(nameB);
          } else {
              return nameB.localeCompare(nameA);
          }
      });
      setFilterOrder(filterOrder === 'ascendant' ? 'descendant' : 'ascendant');
  }

  return (
    <>
        <section className={"stagiairesList"+`${currentPage}`}>
            <div className="filterBar">
                <button className='filterAllButton'>{stagiaires.length} Stagiaires</button>
                <button onClick={filterByName} className='filterNameButton'>By Name</button>
                {/* <button onClick={filterByDate} className='filterDcButton'>By DC</button> */}
                <input className='searchInput' type="search" placeholder='   Recherche ...' onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className="grid">
                <h3 className='gridTitle'>Nom</h3>
                <h3 className='gridTitle'>Prénom</h3>
                <h3 className='gridTitle'>Email</h3>
                <h3 className='gridTitle'>DC</h3>
            </div>
            <div className='listContainer'>
                {stagiaires
                .filter((stagiaire : Stagiaire) => {
                    const name = `${stagiaire.first_name} ${stagiaire.last_name} ${stagiaire.createdAt}`;
                    return search.toLocaleLowerCase() === '' ? stagiaire : name.toLowerCase().includes(search)
                })
                .map((stagiaire : Stagiaire) => {
                    return <StagiaireListContainer 
                        key={stagiaire.id} 
                        stagiaire={stagiaire}
                    />
                })}
            </div>
        </section>
    </>
  )
}

export default StagiaireList