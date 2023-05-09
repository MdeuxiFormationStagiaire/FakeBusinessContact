import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Stagiaire } from '../../models/Stagiaire';
import Papa from 'papaparse';
import _ from 'lodash';
import '../../assets/styles/components/add/AddStagiaire.css'

type addStagiaireProps = {
  addNewStagiaire : (stagiaire : Stagiaire) => void
  addNewStagiairesByImport : (stagiaires : Stagiaire[]) => void
}

const AddStagiaire : React.FC<addStagiaireProps> = ({addNewStagiaire, addNewStagiairesByImport}) => {

  const URL = process.env.REACT_APP_DB_STAGIAIRE_URL;

  const navigate = useNavigate();

  const [stagiaire, setStagiaire] = useState<Stagiaire>({ id: 0, first_name: '', last_name: '', email: '', createdAt: new Date() });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setStagiaire((stagiaire) => ({...stagiaire, createdAt: new Date()}));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStagiaire((stagiaire) => ({...stagiaire, [name]: value}));
  };

  const handleFileChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const stagiaireCapitalized: Stagiaire = {
      ...stagiaire,
      first_name: stagiaire.first_name.charAt(0).toUpperCase() + stagiaire.first_name.toLocaleLowerCase().slice(1),
      last_name: stagiaire.last_name.toUpperCase(),
      email: stagiaire.email.toLowerCase(),
    };
  
    const response = await fetch(`${URL}`);
    const data = await response.json();
    const duplicateStagiaire = data.find((stagiaire: Stagiaire) => stagiaire.email === stagiaireCapitalized.email);
  
    if (duplicateStagiaire) {
      alert('Ce stagiaire existe déjà !');
    } else {
      addNewStagiaire(stagiaireCapitalized);
      const newStagiaire: Stagiaire = { id: 0, first_name: '', last_name: '', email: '', createdAt: new Date() };
      setStagiaire(newStagiaire);
    }
  };

  const handleFileSubmit = (event : React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (file) {
      Papa.parse(file, {
        header: true,
        complete : (results) => {
          const stagiaires : Stagiaire[] = results.data.map((data : any) => ({
            id : 0,
            first_name: data.first_name.charAt(0).toUpperCase() + data.first_name.toLowerCase().slice(1),
            last_name: data.last_name.toUpperCase(),
            email: data.email.toLowerCase(),
            createdAt: new Date(),
          }));
          addNewStagiairesByImport(stagiaires)
        },
        error : (error) => {
          console.log(error);
          alert("Le fichier CSV est incorrect : " + error.message)
        }
      })
    }
  }

  return (
    <>
      <section className='addFormsSectionStagiaires'>
        <form className='addFormSectionStagiaires' onSubmit={(event) => handleSubmit(event)}>
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
            <div className="buttonDivBoxStagiaires">
              <button type='button' className='cancelButtonStagiaires' onClick={() => navigate(-1)}>Annuler</button>
              <button type="submit" className='addFormButtonStagiaires'>Ajouter</button>
            </div>
          </section>
        </form>
        <form onSubmit={handleFileSubmit} className='addFormCSVFileSectionStagiaires'>
          <div className='inputCSVDivStagiaires'>
            <label htmlFor="file" className='addCSVFileTitleStagiaires'>Importation par fichier CSV :</label>
            <input 
              type="file" 
              name="file" 
              id="file" 
              onChange={handleFileChange}
              accept=".csv"
              className='inputCSVFileStagiaires'
            />
          </div>
          <div className="buttonFormCSVBoxStagiaires">
            <button type="submit" className='addCSVFormButtonStagiaires'>Importer</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddStagiaire