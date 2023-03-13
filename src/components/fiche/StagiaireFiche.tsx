import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Stagiaire } from '../../models/Stagiaire'
import { stagiaireService } from '../../services/StagiaireService';
import { ModalStyle } from '../../assets/styles/components/modals/ModalStyle.css';
import DeleteConfirmation from '../modals/DeleteConfirmation';
import Modal from 'react-modal';
import '../../assets/styles/components/fiches/StagiaireFiche.css'

type stagiaireFicheProps = {
  stagiaires: Stagiaire[];
  onUpdateStagiaire: Function;
}

const StagiaireFiche : React.FC<stagiaireFicheProps> = ({stagiaires, onUpdateStagiaire}) => {
  
  const navigate = useNavigate();
  const { id } = useParams<{id : string}>();

  const [stagiaire, setStagiaire] = useState<Stagiaire>(stagiaires[0])

  const [backupStagiaire, setBackupStagiaire] = useState(stagiaires[0])

  const [editMode, setEditMode] = useState(false)

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  useEffect(() => {
    const stagiaireId = id ? parseInt(id) : 0;
    stagiaireService.getStagiaireById(stagiaireId)
      .then((data) => {setStagiaire(data); setBackupStagiaire(data)})
      .catch((error) => console.log(error));
  }, [id]);

  const handleDelete = () => {
    setShowDeleteConfirmation(true)
  };

  const handleConfirmDelete = () => {
    if (!stagiaire) {
      return;
    }
    stagiaireService
      .deleteStagiaire(stagiaire.id)
      .then(() => navigate('/stagiaires'))
      .catch((error) => console.error(error))
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false)
  };

  const handleButtonHover = (className: string, hover: boolean) : any => {
    const fiche = document.querySelector('.ficheSectionStagiaires') as HTMLDivElement | null;
    if (fiche) {
      if (hover) {
        fiche.classList.add(className);
      } else {
        fiche.classList.remove(className);
      }
    }
  };

  const handleEditMode = () => {
    if (editMode == false) {
      setBackupStagiaire(stagiaire)
      setEditMode(true)
    } else {
      setEditMode(false)
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === 'createdAt') {
      const date = new Date(value);
      setStagiaire(prevState => Object.assign({}, prevState, { [name]: date.toISOString() }));
    } else if (name === 'email') {
      setStagiaire(prevState => Object.assign({}, prevState, { [name]: value.toLocaleLowerCase() }));
    } else {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setStagiaire(prevState => Object.assign({}, prevState, { [name]: capitalizedValue}));
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stagiaire) {
      return;
    }

    setBackupStagiaire(prevStagiaire => ({
      ...prevStagiaire,
      last_name: stagiaire.last_name,
      first_name: stagiaire.first_name,
      email: stagiaire.email
    }));

    stagiaireService.updateStagiaire(stagiaire.id, stagiaire)
      .then(() => {
        setEditMode(false)
      })
      .catch((error) => console.error(error)
      );
    onUpdateStagiaire(stagiaire)
  };

  const handleCancel = () => {
    setEditMode(false)
    if (backupStagiaire != undefined) {
      setStagiaire(backupStagiaire)
    }
  };

  const handleAddButtonNav = () => {
    navigate('/stagiaires/add')
  };

  if (!stagiaire) {
    return <div>Loading...</div>;
  };
  
  return (
    <>
      <section className='buttonSectionStagiaires'>
        <button type='button' className='updateButtonBoxStagiaires' onClick={handleEditMode} onMouseEnter={() => handleButtonHover('hoveredUpdateStagiaires', true)} onMouseLeave={() => handleButtonHover('hoveredUpdateStagiaires', false)}>
          M
        </button>
        <button type='button' className='deleteButtonBoxStagiaires' onClick={handleDelete} onMouseEnter={() => handleButtonHover('hoveredDeleteStagiaires', true)} onMouseLeave={() => handleButtonHover('hoveredDeleteStagiaires', false)}>
          X
        </button>
        <button type='button' className='addButtonBoxFicheStagiaires' onClick={handleAddButtonNav}>Ajouter</button>
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
          <section className='ficheSectionUpdateStagiaires'>
            <form className='formSectionStagiaires' onSubmit={handleFormSubmit}>
              <section className='inputSectionStagiaires'>
                <div className="titleInputBoxStagiaires">
                  <h3 className='inputTitleStagiaires'>Nom :</h3>
                  <div className="inputBoxStagiaires">
                    <input
                      type="text"
                      name="last_name"
                      value={stagiaire.last_name}
                      onChange={handleInputChange}
                      className='lastNameInputTextStagiaires'
                    />
                  </div>
                </div>
                <div className="titleInputBoxStagiaires">
                  <h3 className='inputTitleStagiaires'>Prénom :</h3>
                  <div className="inputBoxStagiaires">
                    <input
                      type="text"
                      name="first_name"
                      value={stagiaire.first_name}
                      onChange={handleInputChange}
                      className='firstNameInputTextStagiaires'
                    />
                  </div>
                </div>
                <div className="titleInputBoxStagiaires">
                  <h3 className='inputTitle'>Email :</h3>
                  <div className="inputBoxStagiaires">
                    <input
                      type="email"
                      name="email"
                      value={stagiaire.email}
                      onChange={handleInputChange}
                      className='emailInputTextStagiaires'
                    />
                  </div>
                </div>
              </section>
              <section className='updateButtonsSectionStagiaires'>
                <button type="submit" className='formSaveButtonStagiaires'>Enregistrer</button>
                <button type="button" className='formCancelButtonStagiaires' onClick={handleCancel}>Annuler</button>
              </section>
            </form>
          </section>  
        ) : (
          <>
            <section className='ficheSectionStagiaires'>
              <div className="titleInputBoxStagiaires">
                <h3 className='inputTitleStagiaires'>Nom :</h3>
                <div className="inputBoxStagiaires">
                  <p className='lastNameInputTextStagiaires'>{backupStagiaire.last_name}</p>
                </div>
              </div>
              <div className="titleInputBoxStagiaires">
                <h3 className='inputTitleStagiaires'>Prénom :</h3>
                <div className="inputBoxStagiaires">
                  <p className='firstNameInputTextStagiaires'>{backupStagiaire.first_name}</p>
                </div>
              </div>
              <div className="titleInputBoxStagiaires">
                <h3 className='inputTitleStagiaires'>Email :</h3>
                <div className="inputBoxStagiaires">
                  <p className='emailInputTextStagiaires'>{backupStagiaire.email}</p>
                </div>
              </div>
              <div className="titleInputBoxStagiaires">
                <h3 className='inputTitleStagiaires'>DC :</h3>
                <div className="inputBoxStagiaires">
                  <p className='createdAtInputTextStagiaires'>
                    {backupStagiaire.createdAt.toLocaleString("fr-FR").slice(8,10) + "/"
                    + backupStagiaire.createdAt.toLocaleString("fr-FR").slice(5,7) + "/"
                    + backupStagiaire.createdAt.toLocaleString("fr-FR").slice(0,4)}
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
    </>
  )
}

export default StagiaireFiche