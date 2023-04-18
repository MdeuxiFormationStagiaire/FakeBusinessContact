import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Formateur } from '../../models/Formateur';
import { formateurService } from '../../services/FormateurService';
import { ModalStyle } from '../../assets/styles/components/modals/ModalStyle.css';
import DeleteConfirmation from '../modals/DeleteConfirmation';
import Modal from 'react-modal';
import updateLogo from '../../assets/img/modify.png'
import deleteLogo from '../../assets/img/remove.png'
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
    setEditMode(false)
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
    const fiche = document.querySelector('.ficheSectionFormateurs') as HTMLDivElement | null;
    if (fiche) {
      if (hover) {
        fiche.classList.add(className);
      } else {
        fiche.classList.remove(className);
      }
    }
  }

  const handleEditMode = () => {
    if (editMode == false) {
      setBackupFormateur(formateur)
      setEditMode(true)
    } else {
      setEditMode(false)
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

  const handleCancel = () => {
    setEditMode(false)
    if (backupFormateur != undefined) {
      setFormateur(backupFormateur)
    }
  }

  const handleAddButtonNav = () => {
    navigate('/formateurs/add')
  }

  const formateDate = (date : Date) => {
    const formatedDate : string = 
      date.toLocaleString('fr-FR').slice(8, 10) + '/' +
      date.toLocaleString('fr-FR').slice(5, 7) + '/' +
      date.toLocaleString('fr-FR').slice(0, 4)
    ;
    return formatedDate;
  }

  if (!formateur) {
    return <div></div>;
  }
  
  return (
    <>
      <section className='buttonSectionFormateurs'>
        <img src={updateLogo} alt="update" className='updateLogoFiche'  onClick={handleEditMode} onMouseEnter={() => handleButtonHover('hoveredUpdateFormateurs', true)} onMouseLeave={() => handleButtonHover('hoveredUpdateFormateurs', false)}/>
        <img src={deleteLogo} alt="delete" className='deleteLogoFiche'  onClick={handleDelete} onMouseEnter={() => handleButtonHover('hoveredDeleteFormateurs', true)} onMouseLeave={() => handleButtonHover('hoveredDeleteFormateurs', false)}/>
        <button type='button' className='addButtonBoxFicheFormateurs' onClick={handleAddButtonNav}>Ajouter</button>
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
        {editMode ? (
          <section className='ficheSectionUpdateFormateurs'>
            <form className='formSectionFormateurs' onSubmit={handleFormSubmit}>
              <section className='inputSectionFormateurs'>
                <div className="titleInputBoxFormateurs">
                  <h3 className='inputTitleFormateurs'>Nom :</h3>
                  <div className="inputBoxFormateurs">
                    <input
                      type="text"
                      name="last_name"
                      value={formateur.last_name}
                      onChange={handleInputChange}
                      className='lastNameInputTextFormateurs'
                    />
                  </div>
                </div>
                <div className="titleInputBoxFormateurs">
                  <h3 className='inputTitleFormateurs'>Prénom :</h3>
                  <div className="inputBoxFormateurs">
                    <input
                      type="text"
                      name="first_name"
                      value={formateur.first_name}
                      onChange={handleInputChange}
                      className='firstNameInputTextFormateurs'
                    />
                  </div>
                </div>
                <div className="titleInputBoxFormateurs">
                  <h3 className='inputTitleFormateurs'>Email :</h3>
                  <div className="inputBoxFormateurs">
                    <input
                      type="email"
                      name="email"
                      value={formateur.email}
                      onChange={handleInputChange}
                      className='emailInputTextFormateurs'
                    />
                  </div>
                </div>
                <section className='updateButtonsSectionFormateurs'>
                  <button type="submit" className='formSaveButtonFormateurs'>Enregistrer</button>
                  <button type="button" className='formCancelButtonFormateurs' onClick={handleCancel}>Annuler</button>
                </section>
              </section>
            </form>
          </section>  
        ) : (
          <>
            <section className='ficheSectionFormateurs'>
              <div className="titleInputBoxFormateurs">
                <h3 className='inputTitleFormateurs'>Nom :</h3>
                <div className="inputBoxFormateurs">
                  <p className='lastNameInputTextFormateurs'>{backupFormateur.last_name}</p>
                </div>
              </div>
              <div className="titleInputBoxFormateurs">
                <h3 className='inputTitleFormateurs'>Prénom :</h3>
                <div className="inputBoxFormateurs">
                  <p className='firstNameInputTextFormateurs'>{backupFormateur.first_name}</p>
                </div>
              </div>
              <div className="titleInputBoxFormateurs">
                <h3 className='inputTitleFormateurs'>Email :</h3>
                <div className="inputBoxFormateurs">
                  <p className='emailInputTextFormateurs'>{backupFormateur.email}</p>
                </div>
              </div>
              <div className="titleInputBoxFormateurs">
                <h3 className='inputTitleFormateurs'>DC :</h3>
                <div className="inputBoxFormateurs">
                  <p className='createdAtInputTextFormateurs'>{formateDate(backupFormateur.createdAt)}</p>
                </div>
              </div>
            </section>
          </>
        )}
    </>
  )
}

export default FormateurFiche;