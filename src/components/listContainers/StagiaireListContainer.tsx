import { Link } from 'react-router-dom'
import { Stagiaire } from '../../models/Stagiaire'
import '../../assets/styles/components/listContainer/ListContainer.css'

type StagiaireListContainerProps = {
  stagiaire: Stagiaire
}

const StagiaireListContainer : React.FC<StagiaireListContainerProps> = ({stagiaire}) => {
  return (
    <Link to={`/stagiaires/${stagiaire.id}`} className='ficheLink'>
      <div className="itemsContainer">
        <span className='items'>{stagiaire.last_name}</span>
        <span className='items'>{stagiaire.first_name}</span>
        <span className='items'>{stagiaire.email}</span>
        <span className='items2'>
          {stagiaire.createdAt.toLocaleString("fr-FR").slice(8,10) + "/"
          + stagiaire.createdAt.toLocaleString("fr-FR").slice(5,7) + "/"
          + stagiaire.createdAt.toLocaleString("fr-FR").slice(0,4)}
        </span>
      </div>
    </Link>
  )
}

export default StagiaireListContainer