import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Formateur } from '../../models/Formateur';
import { formateurService } from '../../services/FormateurService';
import { ModalStyle } from '../../assets/styles/components/modals/ModalStyle.css';
import DeleteConfirmation from '../modals/DeleteConfirmation';
import Modal from 'react-modal';
import '../../assets/styles/components/fiches/FormateurFiche.css'

type formateurFicheProps = {
  formateurs: Formateur[];
  onUpdateFormateur: Function;
}

const FormateurFiche : React.FC<formateurFicheProps> = ({formateurs, onUpdateFormateur}) => {

  const navigate = useNavigate();
  const { id } = useParams<{id : string}>();

  const [backupFormateur, setBackupFormateur] = useState<Formateur>(formateurs[0])

  const [formateur, setFormateur] = useState<Formateur>(formateurs[0])

  const [editMode, setEditMode] = useState(false)

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  useEffect(() => {
    const formateurId = id ? parseInt(id) : 0;
    formateurService.getFormateurById(formateurId)
      .then((data) => {setFormateur(data); setBackupFormateur(data)})
      .catch((error) => console.log(error));
  }, [id]);

  const handleDelete = () => {
    setShowDeleteConfirmation(true)
  }

  const handleConfirmDelete = () => {
    if (!formateur) {
      return;
    }
    formateurService
      .deleteFormateur(formateur.id)
      .then(() => navigate('/formateurs'))
      .catch((error) => console.error(error))
    setShowDeleteConfirmation(false);
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false)
  }

  const handleButtonHover = (className: string, hover: boolean) : any => {
    const fiche = document.querySelector('.ficheSection') as HTMLDivElement | null;
    if (fiche) {
      if (hover) {
        fiche.classList.add(className);
      } else {
        fiche.classList.remove(className);
      }
    }
  }

  const handleEditMode = (className: string) => {
    const fiche = document.querySelector('.ficheSection') as HTMLDivElement | null;
    if (editMode == false) {
      setBackupFormateur(formateur)
      setEditMode(true)
      if (fiche) {
        console.log(fiche);
        fiche.classList.add(className);
      }
    } else {
      setEditMode(false)
      if (fiche) {
        fiche.classList.remove(className);
      }
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === 'createdAt') {
      const date = new Date(value);
      setFormateur(prevState => Object.assign({}, prevState, { [name]: date.toISOString() }));
    } else if (name === 'email') {
      setFormateur(prevState => Object.assign({}, prevState, { [name]: value.toLocaleLowerCase() }));
    } else {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setFormateur(prevState => Object.assign({}, prevState, { [name]: capitalizedValue}));
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formateur) {
      return;
    }

    const response = await fetch('http://localhost:3000/formateurs')
    const data = await response.json();
    const duplicateFormateur = data.find((f : Formateur) => f.email === formateur.email)
    if (duplicateFormateur) {
      alert('Ce formateur existe déjà !')
    } else {
      setBackupFormateur(prevFormateur => ({
        ...prevFormateur,
        last_name: formateur.last_name,
        first_name: formateur.first_name,
        email: formateur.email
      }));
      formateurService.updateFormateur(formateur.id, formateur)
        .then(() => {
          setEditMode(false)
        })
        .catch((error) => console.error(error)
        );
      onUpdateFormateur(formateur)
    }
  }

  const handleCancel = () => {
    setEditMode(false)
    if (backupFormateur != undefined) {
      setFormateur(backupFormateur)
    }
  }

  const handleAddButtonNav = () => {
    navigate('/formateurs/add')
  }

  if (!formateur) {
    return <div></div>;
  }
  
  return (
    <>
      <section className='buttonSection'>
        <button type='button' className='updateButtonBox' onClick={() => handleEditMode('hoveredUpdate')} onMouseEnter={() => handleButtonHover('hoveredUpdate', true)} onMouseLeave={() => handleButtonHover('hoveredUpdate', false)}>
          M
        </button>
        <button type='button' className='deleteButtonBox' onClick={handleDelete} onMouseEnter={() => handleButtonHover('hoveredDelete', true)} onMouseLeave={() => handleButtonHover('hoveredDelete', false)}>
          X
        </button>
        <button type='button' className='addButtonBoxFiche' onClick={handleAddButtonNav}>Ajouter</button>
      </section>
      <Modal
        isOpen={showDeleteConfirmation}
        onRequestClose={handleCancelDelete}
        contentLabel="Confirmation de suppression"
        style={ModalStyle}
      >
        <DeleteConfirmation
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete} 
        />
      </Modal>
      <section className='ficheSection'>
        {editMode ? (
          <form className='formSection' onSubmit={handleFormSubmit}>
            <section className='inputSection'>
              <div className="titleInputBox">
                <h3 className='inputTitle'>Nom :</h3>
                <div className="inputBox">
                  <input
                    type="text"
                    name="last_name"
                    value={formateur.last_name}
                    onChange={handleInputChange}
                    className='lastNameInputText'
                  />
                </div>
              </div>
              <div className="titleInputBox">
                <h3 className='inputTitle'>Prénom :</h3>
                <div className="inputBox">
                  <input
                    type="text"
                    name="first_name"
                    value={formateur.first_name}
                    onChange={handleInputChange}
                    className='firstNameInputText'
                  />
                </div>
              </div>
              <div className="titleInputBox">
                <h3 className='inputTitle'>Email :</h3>
                <div className="inputBox">
                  <input
                    type="email"
                    name="email"
                    value={formateur.email}
                    onChange={handleInputChange}
                    className='emailInputText'
                  />
                </div>
              </div>
            </section>
            <section className='updateButtonsSection'>
              <button type="submit" className='formSaveButton'>Enregistrer</button>
              <button type="button" className='formCancelButton' onClick={handleCancel}>Annuler</button>
            </section>
          </form>
        ) : (
          <>
            <div className="titleInputBox">
              <h3 className='inputTitle'>Nom :</h3>
              <div className="inputBox">
                <p className='lastNameInputText'>{backupFormateur.last_name}</p>
              </div>
            </div>
            <div className="titleInputBox">
              <h3 className='inputTitle'>Prénom :</h3>
              <div className="inputBox">
                <p className='firstNameInputText'>{backupFormateur.first_name}</p>
              </div>
            </div>
            <div className="titleInputBox">
              <h3 className='inputTitle'>Email :</h3>
              <div className="inputBox">
                <p className='emailInputText'>{backupFormateur.email}</p>
              </div>
            </div>
            <div className="titleInputBox">
              <h3 className='inputTitle'>DC :</h3>
              <div className="inputBox">
                <p className='createdAtInputText'>
                  {backupFormateur.createdAt.toLocaleString("fr-FR").slice(8,10) + "/"
                  + backupFormateur.createdAt.toLocaleString("fr-FR").slice(5,7) + "/"
                  + backupFormateur.createdAt.toLocaleString("fr-FR").slice(0,4)}
                </p>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  )
}

export default FormateurFiche;