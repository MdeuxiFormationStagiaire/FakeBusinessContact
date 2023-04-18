import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formateur } from '../../models/Formateur';
import '../../assets/styles/components/add/AddFormateur.css'
import Papa from 'papaparse';

type addFormateurProps = {
  addNewFormateur : (formateur : Formateur) => void
  addNewFormateursByImport : (formateurs : Formateur[]) => void
}

const AddFormateur : React.FC<addFormateurProps> = ({addNewFormateur, addNewFormateursByImport}) => {

  const URL = process.env.REACT_APP_DB_FORMATEUR_URL;

  const navigate = useNavigate();

  const [formateur, setFormateur] = useState<Formateur>({ id: 0, first_name: '', last_name: '', email: '', createdAt: new Date() });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setFormateur((formateur) => ({...formateur, createdAt: new Date()}));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormateur((formateur) => ({...formateur, [name]: value}));
  };

  const handleFileChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formateurCapitalized : Formateur = {
      ...formateur,
      first_name: formateur.first_name.charAt(0).toUpperCase() + formateur.first_name.toLowerCase().slice(1),
      last_name: formateur.last_name.toUpperCase(),
      email: formateur.email.toLowerCase()
    };

    const response = await fetch(`${URL}`);
    const data = await response.json();
    const duplicateFormateur = data.find((f : Formateur) => f.email === formateurCapitalized.email);

    if (duplicateFormateur) {
      alert('Ce formateur existe déjà !');
    } else {
      addNewFormateur(formateurCapitalized);
      const newFormateur : Formateur = { id: 0, first_name: '', last_name: '', email: '', createdAt: new Date() };
      setFormateur(newFormateur);
    };
  };

  const handleFileSubmit = (event : React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (file) {
      Papa.parse(file, {
        header: true,
        complete : (results) => {
          const formateurs : Formateur[] = results.data.map((data : any) => ({
            id : 0,
            first_name: data.first_name.charAt(0).toUpperCase() + data.first_name.toLowerCase().slice(1),
            last_name: data.last_name.toUpperCase(),
            email: data.email.toLowerCase(),
            createdAt: new Date(),
          }));
          addNewFormateursByImport(formateurs)
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
      <section className='addFormsSectionFormateurs'>
        <form className='addFormSectionFormateurs' onSubmit={(event) => handleSubmit(event)}>
          <section className="addFicheSectionFormateurs">
            <div className="inputDivBoxFormateurs">
              <div className='inputDivFormateurs'>
                <label htmlFor="last_name" className='addInputTitleFormateurs'>Nom :</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  className='lastNameInputFormateurs'
                  value={formateur.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='inputDivFormateurs'>
                <label htmlFor="first_name" className='addInputTitleFormateurs'>Prénom :</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  className='firstNameInputFormateurs'
                  value={formateur.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='inputDivFormateurs'>
                <label htmlFor="email" className='addInputTitleFormateurs'>Email :</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className='emailInputFormateurs'
                  value={formateur.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="buttonDivBoxFormateurs">
              <button type='button' className='cancelButtonFormateurs' onClick={() => navigate(-1)}>Annuler</button>
              <button type="submit" className='addFormButtonFormateurs'>Ajouter</button>
            </div>
          </section>
        </form>
        <form onSubmit={handleFileSubmit} className='addFormCSVFileSectionFormateurs'>
          <div className='inputCSVDivFormateurs'>
            <label htmlFor="file" className='addCSVFileTitleFormateurs'>Importation par fichier CSV :</label>
            <input 
              type="file" 
              name="file" 
              id="file" 
              onChange={handleFileChange}
              accept=".csv"
              className='inputCSVFileFormateurs'
            />
          </div>
          <div className="buttonFormCSVBoxFormateurs">
            <button type="submit" className='addCSVFormButtonFormateurs'>Importer</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddFormateur;