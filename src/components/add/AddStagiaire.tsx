import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Stagiaire } from '../../models/Stagiaire';
import '../../assets/styles/components/add/AddStagiaire.css'

type addStagiaireProps = {
  addNewStagiaire : Function
}

const AddStagiaire : React.FC<addStagiaireProps> = ({addNewStagiaire}) => {

  const URL = process.env.REACT_APP_DB_STAGIAIRE_URL;

  const navigate = useNavigate();
  const [stagiaire, setStagiaire] = useState<Stagiaire>({ id: 0, first_name: '', last_name: '', email: '', createdAt: new Date() });

  useEffect(() => {
    setStagiaire((stagiaire) => ({...stagiaire, createdAt: new Date()}));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStagiaire((stagiaire) => ({...stagiaire, [name]: value}));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const stagiaireCapitalized : Stagiaire = {
      ...stagiaire,
      first_name: stagiaire.first_name.charAt(0).toUpperCase() + stagiaire.first_name.toLocaleLowerCase().slice(1),
      last_name: stagiaire.last_name.charAt(0).toUpperCase() + stagiaire.last_name.toLocaleLowerCase().slice(1),
      email: stagiaire.email.toLocaleLowerCase()
    };

    const response = await fetch(`${URL}`);
    const data = await response.json();
    const duplicateStagiaire = data.find((stagiaire : Stagiaire) => stagiaire.email === stagiaireCapitalized.email);

    if (duplicateStagiaire) {
      alert('Ce stagiaire existe déjà !');
    } else {
      addNewStagiaire(stagiaireCapitalized);
      const newStagiaire : Stagiaire = { id: 0, first_name: '', last_name: '', email: '', createdAt: new Date() };
      setStagiaire(newStagiaire);
    };
  };

  return (
    <>
      <form className='addFormSectionStagiaires' onSubmit={(event) => handleSubmit(event)}>
        <div className="buttonDivBoxStagiaires">
          <button type="submit" className='addFormButtonStagiaires'>Ajouter</button>
          <button type='button' className='cancelButtonStagiaires' onClick={() => navigate(-1)}>Annuler</button>
        </div>
        <section className="addFicheSectionStagiaires">
          <div className="inputDivBoxStagiaires">
            <div className='inputDivStagiaires'>
              <label htmlFor="last_name" className='addInputTitleStagiaires'>Nom :</label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                className='lastNameInputStagiaires'
                value={stagiaire.last_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='inputDivStagiaires'>
              <label htmlFor="first_name" className='addInputTitleStagiaires'>Prénom :</label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                className='firstNameInputStagiaires'
                value={stagiaire.first_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='inputDivStagiaires'>
              <label htmlFor="email" className='addInputTitleStagiaires'>Email :</label>
              <input
                type="email"
                name="email"
                id="email"
                className='emailInputStagiaires'
                value={stagiaire.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default AddStagiaire