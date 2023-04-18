import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Utilisateur } from '../../models/Utilisateur';
import '../../assets/styles/components/add/AddUtilisateur.css'
import Papa from 'papaparse';

type AddUtilisateurProps = {
  addNewUtilisateur : (utilisateur : Utilisateur) => void
  addNewUtilisateursByImport : (utilisateurs : Utilisateur[]) => void
}

const AddUtilisateur : React.FC<AddUtilisateurProps> = ({addNewUtilisateur, addNewUtilisateursByImport}) => {

  const URL = process.env.REACT_APP_DB_USER_URL;

  const navigate = useNavigate();

  const [utilisateur, setUtilisateur] = useState<Utilisateur>({ id: 0, first_name: '', last_name: '', email: '', position: '', createdAt: new Date(), adminRight: false });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setUtilisateur((utilisateur) => ({...utilisateur, createdAt: new Date()}));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    if (name === 'adminRight') {
      setUtilisateur((utilisateur) => ({...utilisateur, [name]: checked}));
    } else {
      setUtilisateur((utilisateur) => ({...utilisateur, [name]: value}));
    }
  };

  const handleFileChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const utilisateurCapitalized : Utilisateur = {
      ...utilisateur,
      first_name: utilisateur.first_name.charAt(0).toUpperCase() + utilisateur.first_name.toLowerCase().slice(1),
      last_name: utilisateur.last_name.toUpperCase(),
      email: utilisateur.email.toLowerCase(),
      position: utilisateur.position.charAt(0).toUpperCase() + utilisateur.position.toLowerCase().slice(1)
    };

    const response = await fetch(`${URL}`);
    const data = await response.json();
    const duplicateUtilisateur = data.find((utilisateur : Utilisateur) => utilisateur.email === utilisateurCapitalized.email);

    if (duplicateUtilisateur) {
      alert('Cet utilisateur existe déjà !');
    } else {
      addNewUtilisateur(utilisateurCapitalized);
      const newUtilisateur : Utilisateur = { id: 0, first_name: '', last_name: '', email: '', position: '', createdAt: new Date(), adminRight: false };
      setUtilisateur(newUtilisateur);
    };
  };

  const handleFileSubmit = (event : React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (file) {
      Papa.parse(file, {
        header: true,
        complete : (results) => {
          const utilisateurs : Utilisateur[] = results.data.map((data : any) => ({
            id: 0,
            first_name: data.first_name.charAt(0).toUpperCase() + data.first_name.toLowerCase().slice(1),
            last_name: data.last_name.toUpperCase(),
            email: data.email.toLowerCase(),
            position: data.position.charAt(0).toUpperCase() + data.position.toLowerCase().slice(1),
            createdAt: new Date(),
            adminRight: false
          }));
          addNewUtilisateursByImport(utilisateurs)
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
      <section className='addFormsSectionUtilisateurs'>
        <form className='addFormSectionUtilisateurs' onSubmit={(event) => handleSubmit(event)}>
          <section className="addFicheSectionUtilisateurs">
            <div className="inputDivBoxUtilisateurs">
              <div className='inputDivUtilisateurs'>
                <label htmlFor="last_name" className='addInputTitleUtilisateurs'>Nom :</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  className='lastNameInputUtilisateurs'
                  value={utilisateur.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='inputDivUtilisateurs'>
                <label htmlFor="first_name" className='addInputTitleUtilisateurs'>Prénom :</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  className='firstNameInputUtilisateurs'
                  value={utilisateur.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='inputDivUtilisateurs'>
                <label htmlFor="email" className='addInputTitleUtilisateurs'>Email :</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className='emailInputUtilisateurs'
                  value={utilisateur.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='inputDivUtilisateurs'>
                <label htmlFor="position" className='addInputTitleUtilisateurs'>Fonction :</label>
                <input
                  type="text"
                  name="position"
                  id="position"
                  className='positionInputUtilisateurs'
                  value={utilisateur.position}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='inputDivUtilisateurs'>
                <label htmlFor="adminRight" className='addInputTitleUtilisateurs'>Admin :</label>
                <input
                  type="checkbox"
                  name="adminRight"
                  id="adminRight"
                  className='adminRightInputUtilisateurs'
                  checked={utilisateur.adminRight}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="buttonDivBoxUtilisateurs">
              <button type='button' className='cancelButtonUtilisateurs' onClick={() => navigate(-1)}>Annuler</button>
              <button type="submit" className='addFormButtonUtilisateurs'>Ajouter</button>
            </div>
          </section>
        </form>
        <form onSubmit={handleFileSubmit} className='addFormCSVFileSectionUtilisateurs'>
          <div className='inputCSVDivUtilisateurs'>
            <label htmlFor="file" className='addCSVFileTitleUtilisateurs'>Importation par fichier CSV :</label>
            <input 
              type="file" 
              name="file" 
              id="file" 
              onChange={handleFileChange}
              accept=".csv"
              className='inputCSVFileUtilisateurs'
            />
          </div>
          <div className="buttonFormCSVBoxUtilisateurs">
            <button type="submit" className='addCSVFormButtonUtilisateurs'>Importer</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default AddUtilisateur