import React, { useState } from 'react'
import { Stagiaire } from '../../models/Stagiaire'
import PromotionAddStagiaireListContainer from '../listContainers/Promotion/PromotionAddStagiaireListContainer'
import addLogo from '../../assets/img/ajouter.png'
import { stagiaireService } from '../../services/StagiaireService'

type AddPromotionStagiairesProps = {
    stagiaires: Stagiaire[]
    onAddStagiaire: (selectedStagiaire : Stagiaire) => void
    onDeleteStagiaire: (idStagiaire : number) => void
}

const AddPromotionStagiaires : React.FC<AddPromotionStagiairesProps> = ({stagiaires, onAddStagiaire, onDeleteStagiaire}) => {
    
    const [search, setSearch] = useState<string>('')

    const [newStagiaire, setNewStagiaire] = useState<Stagiaire>({
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        createdAt: new Date()
    })
    
    const [newStagiairesList, setNewStagiairesList] = useState<Stagiaire[]>([])

    const [defaultSelectedValue, setDefaultSelectedValue] = useState('')

    const handleDeleteStagiaire = async (idStagiaire : number) => {
        const newListOfStagiaire : Stagiaire[] = newStagiairesList.filter((stagiaire : Stagiaire) => idStagiaire !== stagiaire.id)
        setNewStagiairesList(newListOfStagiaire)
        onDeleteStagiaire(idStagiaire)
    }

    const handleAddStagiaire = async (event : React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selectedStagiaire = stagiaires.find((stagiaire) => stagiaire.id.toString() === selectedValue);
        if (selectedStagiaire) {
            const newListOfStagiaire : Stagiaire[] = [...newStagiairesList, selectedStagiaire]
            setNewStagiairesList(newListOfStagiaire)
            onAddStagiaire(selectedStagiaire)
        }
    }

    const renderPromotionStagiairesList = () => {
        const filteredStagiaires = newStagiairesList.filter((stagiaire: Stagiaire) => {
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
            <PromotionAddStagiaireListContainer
                key={stagiaire.id}
                stagiaire={stagiaire}
                onDeleteStagiaire={handleDeleteStagiaire}
            />
          );
        });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setNewStagiaire(prevState => Object.assign({}, prevState, { [name]: value.toLowerCase()}));
        } else {
            const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
            setNewStagiaire(prevState => Object.assign({}, prevState, { [name]: capitalizedValue}));
        }
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const duplicateStagiaire = stagiaires.find((stagiaire : Stagiaire) => stagiaire.email === newStagiaire.email)

        if (duplicateStagiaire) {
            alert('Ce stagiaire existe déjà !');
        } else {
            stagiaireService.createStagiaire(newStagiaire)
                .catch((error) => console.error(error))
            ;
            const newStagiaireId : number = stagiaires[stagiaires.length-1].id + 1;
            
            const newStagiaireReset : Stagiaire = { id: 0, first_name: '', last_name: '', email: '', createdAt: new Date() };
            setNewStagiaire(newStagiaireReset);
        };
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
              <div className='sumPromotionFiche'>{newStagiairesList.length}</div>
            </div>
            <div className='addStagiaireMenu'>
              <select
                  name="stagiaire"
                  value={defaultSelectedValue}
                  onChange={(event) => handleAddStagiaire(event)}
                  className='stagiaireInputPromotions'
                >
                  <option value="">-- Sélectionner un stagiaire pour l'ajouter --</option>
                  {stagiaires.map((stagiaire) => (
                    <option key={stagiaire.id} value={stagiaire.id} className="stagiaireInputContainer">
                      {stagiaire.last_name} {stagiaire.first_name}
                    </option>
                  ))}
              </select>
            </div>
            <form className="formSectionStagiairesPromotions" onSubmit={handleFormSubmit}>
                <div className="addStagiaireMenu">
                  <div className="inputBoxStagiaire">
                    <input
                      type="text"
                      name="last_name"
                      placeholder='Nom'
                      value={newStagiaire.last_name}
                      onChange={handleInputChange}
                      className='inputTextStagiaire'
                      required
                    />
                  </div>
                  <div className="inputBoxStagiaire">
                    <input
                      type="text"
                      name="first_name"
                      placeholder='Prénom'
                      value={newStagiaire.first_name}
                      onChange={handleInputChange}
                      className='inputTextStagiaire'
                      required
                    />
                  </div>
                  <div className="inputBoxStagiaire">
                    <input
                      type="text"
                      name="email"
                      placeholder='Email'
                      value={newStagiaire.email}
                      onChange={handleInputChange}
                      className='inputTextStagiaire'
                      required
                    />
                  </div>
                </div>
                <button type='submit' className='formAddButtonSessionsPromotion'>
                    <img src={addLogo} className='addLogoForm'/>
                </button>
            </form>
            <div className="gridStagiairePromotionFicheUpdate">
              <h3 className="gridTitlePromotionFiche">Nom</h3>
              <h3 className="gridTitlePromotionFiche">Prénom</h3>
              <h3 className="gridTitlePromotionFiche">Email</h3>
            </div>
            <div className="listContainerPromotionFiche">{renderPromotionStagiairesList()}</div>
          </section>
        </>
  )
}

export default AddPromotionStagiaires