import Modal from 'react-modal';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Utilisateur } from '../../models/Utilisateur';
import { utilisateurService } from '../../services/UtilisateurService';
import { ModalStyle } from '../../assets/styles/components/modals/ModalStyle.css';
import DeleteConfirmation from '../modals/DeleteConfirmation';
import trueLogo from '../../assets/img/accept.png'
import falseLogo from '../../assets/img/multiply.png'
import updateLogo from '../../assets/img/modify.png'
import deleteLogo from '../../assets/img/remove.png'
import backLogo from '../../assets/img/left-arrow.png'
import '../../assets/styles/components/fiches/UtilisateurFiche.css'

type UtilisateurFicheProps = {
  utilisateurs: Utilisateur[];
  onUpdateUtilisateur: Function;
}

const UtilisateurFiche : React.FC<UtilisateurFicheProps> = ({utilisateurs, onUpdateUtilisateur}) => {
    
  const navigate = useNavigate();

  const { id } = useParams<{id : string}>();

  const [utilisateur, setUtilisateur] = useState<Utilisateur>(utilisateurs[0])

  const [backupUtilisateur, setBackupUtilisateur] = useState(utilisateurs[0])

  const [editMode, setEditMode] = useState(false)

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  useEffect(() => {
    const utilisateurId = id ? parseInt(id) : 0;
    utilisateurService.getUtilisateurById(utilisateurId)
      .then((data) => {setUtilisateur(data); setBackupUtilisateur(data)})
      .catch((error) => console.log(error));
    setEditMode(false)
  }, [id]);

  const handleDelete = () => {
    setShowDeleteConfirmation(true)
  };

  const handleConfirmDelete = () => {
    if (!utilisateur) {
      return;
    }
    utilisateurService
      .deleteUtilisateur(utilisateur.id)
      .then(() => navigate('/utilisateurs'))
      .catch((error) => console.error(error))
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false)
  };

  const handleButtonHover = (className: string, hover: boolean) : any => {
    const fiche = document.querySelector('.ficheSectionUtilisateurs') as HTMLDivElement | null;
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
      setBackupUtilisateur(utilisateur)
      setEditMode(true)
    } else {
      setEditMode(false)
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked } = event.target;
    if (name === 'createdAt') {
      const date = new Date(value);
      setUtilisateur(prevState => Object.assign({}, prevState, { [name]: date.toISOString() }));
    } else if (name === 'email') {
      setUtilisateur(prevState => Object.assign({}, prevState, { [name]: value.toLocaleLowerCase() }));
    } else if (name === 'last_name' || name === 'first_name' || name === 'position') {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setUtilisateur(prevState => Object.assign({}, prevState, { [name]: capitalizedValue}));
    } else if (name === 'adminRight') {
      setUtilisateur(prevState => Object.assign({}, prevState, { [name]: checked}));
    } else {
      setUtilisateur(prevState => Object.assign({}, prevState, { [name]: value}));
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!utilisateur) {
      return;
    }

    setBackupUtilisateur(prevUtilisateur => ({
      ...prevUtilisateur,
      last_name: utilisateur.last_name,
      first_name: utilisateur.first_name,
      email: utilisateur.email,
      position: utilisateur.position,
      adminRight: utilisateur.adminRight
    }));

    utilisateurService.updateUtilisateur(utilisateur.id, utilisateur)
      .then(() => {
        setEditMode(false)
      })
      .catch((error) => console.error(error)
      );
    onUpdateUtilisateur(utilisateur)
  };

  const handleCancel = () => {
    setEditMode(false)
    if (backupUtilisateur != undefined) {
      setUtilisateur(backupUtilisateur)
    }
  };

  const handleAddButtonNav = () => {
    navigate('/utilisateurs/add')
  };

  const formateDate = (date : Date) => {
    const formatedDate : string = 
        date.toLocaleString('fr-FR').slice(8, 10) + '/' +
        date.toLocaleString('fr-FR').slice(5, 7) + '/' +
        date.toLocaleString('fr-FR').slice(0, 4)
    ;
    return formatedDate;
  }

  if (!utilisateur) {
    return <div>Loading...</div>;
  };

  return (
    <>
      <section className='buttonSectionUtilisateurs'>
        {editMode ? 
          (
            <img src={backLogo} alt="update" className='updateLogoFiche'  onClick={handleEditMode}/>
          ) : (
            <img src={updateLogo} alt="update" className='updateLogoFiche'  onClick={handleEditMode}/>
          )
        }        <img src={deleteLogo} alt="delete" className='deleteLogoFiche'  onClick={handleDelete} onMouseEnter={() => handleButtonHover('hoveredDeleteUtilisateurs', true)} onMouseLeave={() => handleButtonHover('hoveredDeleteUtilisateurs', false)}/>
        <button type='button' className='addButtonBoxFicheUtilisateurs' onClick={handleAddButtonNav}>Ajouter</button>
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
          <section className='ficheSectionUpdateUtilisateurs'>
            <form className='formSectionUtilisateurs' onSubmit={handleFormSubmit}>
              <section className='inputSectionUtilisateurs'>
                <section className='inputTopSectionUtilisateurs'>
                  <div className="titleInputBoxUtilisateurs">
                    <h3 className='inputTitleUtilisateurs'>Nom :</h3>
                    <div className="inputBoxUtilisateurs">
                      <input
                        type="text"
                        name="last_name"
                        value={utilisateur.last_name}
                        onChange={handleInputChange}
                        className='lastNameInputTextUtilisateurs'
                      />
                    </div>
                  </div>
                  <div className="titleInputBoxUtilisateurs">
                    <h3 className='inputTitleUtilisateurs'>Prénom :</h3>
                    <div className="inputBoxUtilisateurs">
                      <input
                        type="text"
                        name="first_name"
                        value={utilisateur.first_name}
                        onChange={handleInputChange}
                        className='firstNameInputTextUtilisateurs'
                      />
                    </div>
                  </div>
                  <div className="titleInputBoxUtilisateurs">
                    <h3 className='inputTitleUtilisateurs'>Admin :</h3>
                    <div className="inputAdminBoxUtilisateurs">
                      <input
                        type="checkbox"
                        name="adminRight"
                        checked={utilisateur.adminRight}
                        onChange={handleInputChange}
                        className='adminRightInputTextUtilisateurs'
                      />
                    </div>
                  </div>
                </section>
                <section className='inputBotSectionUtilisateurs'>
                  <div className="titleInputBoxUtilisateurs">
                    <h3 className='inputTitleUtilisateurs'>Email :</h3>
                    <div className="inputBoxUtilisateurs">
                      <input
                        type="email"
                        name="email"
                        value={utilisateur.email}
                        onChange={handleInputChange}
                        className='emailInputTextUtilisateurs'
                      />
                    </div>
                  </div>
                  <div className="titleInputBoxUtilisateurs">
                    <h3 className='inputTitleUtilisateurs'>Fonction :</h3>
                    <div className="inputBoxUtilisateurs">
                      <input
                        type="text"
                        name="position"
                        value={utilisateur.position}
                        onChange={handleInputChange}
                        className='positionInputTextUtilisateurs'
                      />
                    </div>
                  </div>
                </section>
              </section>
              <section className='updateButtonsSectionUtilisateurs'>
                <button type="submit" className='formSaveButtonUtilisateurs'>Enregistrer</button>
                <button type="button" className='formCancelButtonUtilisateurs' onClick={handleCancel}>Annuler</button>
              </section>
            </form>
          </section>  
        ) : (
          <>
            <section className='ficheSectionUtilisateurs'>
              <section className='ficheTopSectionUtilisateurs'>
                <div className="titleInputBoxUtilisateurs">
                  <h3 className='inputTitleUtilisateurs'>Nom :</h3>
                  <div className="inputBoxUtilisateurs">
                    <p className='lastNameInputTextUtilisateurs'>{backupUtilisateur.last_name}</p>
                  </div>
                </div>
                <div className="titleInputBoxUtilisateurs">
                  <h3 className='inputTitleUtilisateurs'>Prénom :</h3>
                  <div className="inputBoxUtilisateurs">
                    <p className='firstNameInputTextUtilisateurs'>{backupUtilisateur.first_name}</p>
                  </div>
                </div>
                <div className="titleInputBoxUtilisateurs">
                  <h3 className='inputTitleUtilisateurs'>DC :</h3>
                  <div className="inputBoxUtilisateurs">
                    <p className='createdAtInputTextUtilisateurs'>{formateDate(backupUtilisateur.createdAt)}</p>
                  </div>
                </div>
                <div className="titleInputBoxUtilisateurs">
                  <h3 className='inputTitleUtilisateurs'>Admin :</h3>
                  <div className="inputBoxAdminUtilisateurs">
                    {utilisateur.adminRight ? (
                      <span className="items2Utilisateurs">
                        <img src={trueLogo} alt="Admin Right" className="logo" />
                      </span>
                    ) : (
                      <span className="items2Utilisateurs">
                        <img src={falseLogo} alt="No Admin Right" className="logo" />
                      </span>
                    )}
                  </div>
                </div>
              </section>
              <section className='ficheBotSectionUtilisateurs'>
              <div className="titleInputBoxUtilisateurs">
                  <h3 className='inputTitleUtilisateurs'>Email :</h3>
                  <div className="inputBoxUtilisateurs">
                    <p className='emailInputTextUtilisateurs'>{backupUtilisateur.email}</p>
                  </div>
                </div>
                <div className="titleInputBoxUtilisateurs">
                  <h3 className='inputTitleUtilisateurs'>Fonction :</h3>
                  <div className="inputBoxUtilisateurs">
                    <p className='positionInputTextUtilisateurs'>{backupUtilisateur.position}</p>
                  </div>
                </div>
              </section>
            </section>
          </>
        )}
    </>
  )
}

export default UtilisateurFiche