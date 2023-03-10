import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Stagiaire } from '../../models/Stagiaire'
import { stagiaireService } from '../../services/StagiaireService';
import { ModalStyle } from '../../assets/styles/components/modals/ModalStyle.css';
import DeleteConfirmation from '../modals/DeleteConfirmation';
import Modal from 'react-modal';

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
  }

  const handleConfirmDelete = () => {
    if (!stagiaire) {
      return;
    }
    stagiaireService
      .deleteStagiaire(stagiaire.id)
      .then(() => navigate('/stagiaires'))
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
    if (editMode == false) {
      setBackupStagiaire(stagiaire)
      setEditMode(true)
    } else {
      setEditMode(false)
    }
  }

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
  }

  const handleCancel = () => {
    setEditMode(false)
    if (backupStagiaire != undefined) {
      setStagiaire(backupStagiaire)
    }
  }

  const handleAddButtonNav = () => {
    navigate('/stagiaires/add')
  }

  if (!stagiaire) {
    return <div>Loading...</div>;
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
      {editMode ? (
          <section className='ficheSectionUpdate'>
            <form className='formSection' onSubmit={handleFormSubmit}>
              <section className='inputSection'>
                <div className="titleInputBox">
                  <h3 className='inputTitle'>Nom :</h3>
                  <div className="inputBox">
                    <input
                      type="text"
                      name="last_name"
                      value={stagiaire.last_name}
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
                      value={stagiaire.first_name}
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
                      value={stagiaire.email}
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
          </section>  
        ) : (
          <>
            <section className='ficheSection'>
              <div className="titleInputBox">
                <h3 className='inputTitle'>Nom :</h3>
                <div className="inputBox">
                  <p className='lastNameInputText'>{backupStagiaire.last_name}</p>
                </div>
              </div>
              <div className="titleInputBox">
                <h3 className='inputTitle'>Prénom :</h3>
                <div className="inputBox">
                  <p className='firstNameInputText'>{backupStagiaire.first_name}</p>
                </div>
              </div>
              <div className="titleInputBox">
                <h3 className='inputTitle'>Email :</h3>
                <div className="inputBox">
                  <p className='emailInputText'>{backupStagiaire.email}</p>
                </div>
              </div>
              <div className="titleInputBox">
                <h3 className='inputTitle'>DC :</h3>
                <div className="inputBox">
                  <p className='createdAtInputText'>
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