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
      last_name: stagiaire.last_name.charAt(0).toUpperCase() + stagiaire.last_name.toLocaleLowerCase().slice(1),
      email: stagiaire.email.toLocaleLowerCase(),
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

  const handleFileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsText(file, 'UTF-8');
  
      fileReader.onload = (e) => {
        if (e.target?.result) {
          const csvData = e.target.result as string;
          const allTextLines = csvData.split(/\r\n|\n/);
  
          const headers = allTextLines[0].split(',');
  
          for (let i = 1; i < allTextLines.length; i++) {
            const data = allTextLines[i].split(',');
            if (data.length === headers.length) {
              let stagiaire: Stagiaire = {
                id: 0,
                first_name: data[0],
                last_name: data[1],
                email: data[2],
                createdAt: new Date(),
              };
              addNewStagiaire(stagiaire);
            }
          }
        }
      };
    }
  
    const newStagiaire: Stagiaire = { id: 0, first_name: '', last_name: '', email: '', createdAt: new Date() };
    setStagiaire(newStagiaire);
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  
  //   if (file) {
  //     const fileReader = new FileReader();
  //     fileReader.readAsText(file, 'UTF-8');
  
  //     fileReader.onload = (e) => {
  //       if (e.target?.result) {
  //         const csvData = e.target.result as string;
  //         const allTextLines = csvData.split(/\r\n|\n/);
  
  //         const headers = allTextLines[0].split(',');
  
  //         for (let i = 1; i < allTextLines.length; i++) {
  //           const data = allTextLines[i].split(',');
  //           if (data.length === headers.length) {
  //             let stagiaire: Stagiaire = {
  //               id : 0,
  //               first_name: data[0],
  //               last_name: data[1],
  //               email: data[2],
  //               createdAt: new Date(),
  //             };
  //             addNewStagiaire(stagiaire);
  //           }
  //         }
  //       }
  //     };
  //   } else {
  //     const stagiaireCapitalized: Stagiaire = {
  //       ...stagiaire,
  //       first_name: stagiaire.first_name.charAt(0).toUpperCase() + stagiaire.first_name.toLocaleLowerCase().slice(1),
  //       last_name: stagiaire.last_name.charAt(0).toUpperCase() + stagiaire.last_name.toLocaleLowerCase().slice(1),
  //       email: stagiaire.email.toLocaleLowerCase(),
  //     };
  
  //     const response = await fetch(`${URL}`);
  //     const data = await response.json();
  //     const duplicateStagiaire = data.find((stagiaire: Stagiaire) => stagiaire.email === stagiaireCapitalized.email);
  
  //     if (duplicateStagiaire) {
  //       alert('Ce stagiaire existe déjà !');
  //     } else {
  //       addNewStagiaire(stagiaireCapitalized);
  //       const newStagiaire: Stagiaire = { id: 0, first_name: '', last_name: '', email: '', createdAt: new Date() };
  //       setStagiaire(newStagiaire);
  //     }
  //   }
  // };

  return (
    <>
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
      <form onSubmit={(event) => handleFileSubmit(event)}>
        <div className='inputDivStagiaires'>
          <label htmlFor="file" className='addInputTitleStagiaires'>Fichier CSV :</label>
          <input 
            type="file" 
            name="file" 
            id="file" 
            onChange={handleFileChange}
            accept=".csv"
          />
        </div>
        <div className="buttonDivBoxStagiaires">
          <button type="submit" className='addFormButtonStagiaires'>Ajouter CSV</button>
        </div>
      </form>
    </>
  );
};

export default AddStagiaire