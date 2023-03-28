import Modal from 'react-modal';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Promotion } from '../../models/Reservation/Promotion'
import { promotionService } from '../../services/Reservation/PromotionService';
import DeleteConfirmation from '../modals/DeleteConfirmation';
import { ModalStyle } from '../../assets/styles/components/modals/ModalStyle.css';
import { Salle } from '../../models/Salle';
import { Formateur } from '../../models/Formateur';
import { Stagiaire } from '../../models/Stagiaire';
import { Session } from '../../models/Reservation/Session';
import PromotionStagiairesList from '../lists/Promotion/PromotionStagiairesList';
import PromotionSessionsList from '../lists/Promotion/PromotionSessionsList';
import { formateurService } from '../../services/FormateurService';
import { stagiaireService } from '../../services/StagiaireService';
import { salleService } from '../../services/SalleService';
import { sessionService } from '../../services/Reservation/SessionService';
import '../../assets/styles/components/fiches/PromotionFiche.css'

type PromotionFicheProps = {
  idPromotion: number
  onUpdatePromotion : Function
}

const PromotionFiche : React.FC<PromotionFicheProps> = ({idPromotion, onUpdatePromotion}) => {

  const navigate = useNavigate();

  const [promotion, setPromotion] = useState<Promotion>()

  const [backupPromotion, setBackupPromotion] = useState<Promotion>()

  const [editMode, setEditMode] = useState<boolean>(false)

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)

  const [formateurs, setFormateurs] = useState<Formateur[]>([])
  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([])
  const [salles, setSalles] = useState<Salle[]>([])
  const [sessions, setSessions] = useState<Session[]>([])

  const getPromotionById = (id : number) => {
    promotionService.getPromotionById(id)
      .then((data) => {setPromotion(data); setBackupPromotion(data)})
      .catch((error) => console.log(error));
  }

  const getAllFormateur = () => {
    formateurService.findAllFormateurs()
      .then((data) => setFormateurs(data))
      .catch((error) => console.log(error));
  }

  const getAllStagiaires = () => {
    stagiaireService.findAllStagiaires()
      .then((data) => setStagiaires(data))
      .catch((error) => console.log(error));
  }

  const getAllSalles = () => {
    salleService.findAllSalles()
      .then((data) => setSalles(data))
      .catch((error) => console.log(error));
  }

  const getAllSessions = () => {
    sessionService.findAllSessions()
      .then((data) => setSessions(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getPromotionById(idPromotion)
    getAllFormateur()
    getAllStagiaires()
    getAllSalles()
    getAllSessions()
  }, [idPromotion]);

  const handleDelete = () => {
    setShowDeleteConfirmation(true)
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false)
  };

  const handleConfirmDelete = () => {
    if (!promotion) {
      return;
    }
    promotionService
      .deletePromotion(promotion.id)
      .then(() => navigate('/promotions'))
      .catch((error) => console.error(error))
    setShowDeleteConfirmation(false);
  };

  const handleButtonHover = (className: string, hover: boolean) : any => {
    const fiche = document.querySelector('.ficheSectionPromotions') as HTMLDivElement | null;
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
      setBackupPromotion(promotion)
      setEditMode(true)
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === 'startAt' || name === 'endAt') {
      const date = new Date(value);
      setPromotion(prevState => Object.assign({}, prevState, { [name]: date.toISOString() }));
    } else if (name === 'description') {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setPromotion(prevState => Object.assign({}, prevState, { [name]: capitalizedValue}));
    } else {
      setPromotion(prevState => Object.assign({}, prevState, { [name]: value}));
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedValue = event.target.value;
  //   const selectedName = event.target.name;
  //   if (selectedName === "salle") {
  //     const selectedSalle = salles.find((salle) => salle.name === selectedValue);
  //     setPromotion((prevState) => ({
  //       ...prevState,
  //       salle: selectedSalle !== undefined ? selectedSalle : prevState.salle,
  //     }));
  //   } else if (selectedName === "formateur") {
  //     const selectedFormateur = formateurs.find((formateur) => formateur.last_name === selectedValue);
  //     setPromotion((prevState) => ({
  //       ...prevState,
  //       formateur: selectedFormateur !== undefined ? selectedFormateur : prevState.formateur,
  //     }))
  //   }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (promotion) {
      event.preventDefault();
  
      setBackupPromotion(promotion);
  
      promotionService.updatePromotion(promotion.id, promotion)
        .then(() => {
          setEditMode(false)
        })
        .catch((error) => console.error(error)
        );
      onUpdatePromotion(promotion)
    }
  };

  const handleDeleteStagiaireFromPromotion = (idStagiaire : number) => {
    promotionService.deleteStagiairePromotion(idPromotion, idStagiaire)
    .then(() => 
      getPromotionById(idPromotion)
    )
    .catch((error) => console.error(error))
  }

  const handleAddStagiaireToPromotion = (selectedStagiaire : Stagiaire) => {
    if (selectedStagiaire && promotion) {
      if (promotion.stagiaires.some(stagiaire => stagiaire.id === selectedStagiaire.id)) {
        alert("Ce stagiaire existe déjà dans cette liste.")
        return;
      } else {
        promotionService.addStagiaireToPromotion(promotion.id, selectedStagiaire)
        .then(() => {
          getPromotionById(idPromotion)
        })
        .catch((error) => console.error(error));
      }
    }
  }

  const handleCancel = () => {
    setEditMode(false)
    if (backupPromotion != undefined) {
      setPromotion(backupPromotion)
    }
  };

  const handleAddButtonNav = () => {
    navigate('/promotions/add')
  };

  const formateDateForm = (date : Date): string => {
    const formatedDate : string = date.toLocaleString('fr-FR').slice(0, 10);
    return formatedDate;
  }

  const formateDate = (date : Date) => {
    const formatedDate : string = 
        date.toLocaleString('fr-FR').slice(8, 10) + '/' +
        date.toLocaleString('fr-FR').slice(5, 7) + '/' +
        date.toLocaleString('fr-FR').slice(0, 4)
    ;
    return formatedDate;
  }

  return (
    <>
      {promotion &&
        <>
          <section className='buttonSectionPromotions'>
            <button type='button' className='updateButtonBoxPromotions' onClick={handleEditMode} onMouseEnter={() => handleButtonHover('hoveredUpdatePromotions', true)} onMouseLeave={() => handleButtonHover('hoveredUpdatePromotions', false)}>
              M
            </button>
            <button type='button' className='deleteButtonBoxPromotions' onClick={handleDelete} onMouseEnter={() => handleButtonHover('hoveredDeletePromotions', true)} onMouseLeave={() => handleButtonHover('hoveredDeletePromotions', false)}>
              X
            </button>
            <button type='button' className='addButtonBoxFichePromotions' onClick={handleAddButtonNav}>Ajouter</button>
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
              <section className='ficheSectionUpdatePromotions'>
                <form className='formSectionPromotions' onSubmit={handleFormSubmit}>
                  <section className='inputSectionPromotions'>
                    <div className="topRow">
                      <div className="titleInputBoxPromotions">
                        <h3 className='inputTitlePromotions'>Type :</h3>
                        <div className="inputBoxPromotions">
                          <input
                            type="text"
                            name="type"
                            value={promotion.type}
                            onChange={handleInputChange}
                            className='typeInputTextPromotions'
                            disabled
                          />
                        </div>
                      </div>
                      <div className="titleInputBoxPromotions">
                        <h3 className='inputTitlePromotions'>DD :</h3>
                        <div className="inputBoxPromotions">
                          <input
                            type="date"
                            name="startAt"
                            value={formateDateForm(promotion.startAt)}
                            onChange={handleInputChange}
                            className='startAtInputDatePromotions'
                          />
                        </div>
                      </div>
                      <div className="titleInputBoxPromotions">
                        <h3 className='inputTitlePromotions'>DF :</h3>
                        <div className="inputBoxPromotions">
                          <input
                            type="date"
                            name="endAt"
                            value={formateDateForm(promotion.endAt)}
                            onChange={handleInputChange}
                            className='endAtInputDatePromotions'
                          />
                        </div>
                      </div>
                    </div>
                    <div className="botRow">
                      <div className="titleInputBoxPromotions">
                        <h3 className='inputTitle'>Description :</h3>
                        <div className="inputBoxPromotions">
                          <input
                            type="text"
                            name="description"
                            value={promotion.description}
                            onChange={handleInputChange}
                            className='descriptionInputTextPromotions'
                          />
                        </div>
                      </div>
                      <div className="titleInputBoxPromotions">
                        <h3 className='inputTitle'>Salle :</h3>
                        <div className="inputBoxPromotions">
                          <select
                            name="salle"
                            value={promotion.salle.name}
                            onChange={handleSelectChange}
                            className='salleInputPromotions'
                          >
                            {salles.map((salle) => (
                              <option key={salle.id} value={salle.name}>{salle.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="titleInputBoxPromotions">
                        <h3 className='inputTitle'>Formateur :</h3>
                        <div className="inputBoxPromotions">
                        <select
                          name="formateur"
                          value={promotion.formateur.last_name}
                          onChange={handleSelectChange}
                          className='formateurInputPromotions'
                        >
                          {formateurs.map((formateur) => (
                            <option key={formateur.id} value={formateur.last_name}>
                              {`${formateur.first_name} ${formateur.last_name}`}
                            </option>
                          ))}
                        </select>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className='updateButtonsSectionPromotions'>
                    <button type="submit" className='formSaveButtonPromotions'>Enregistrer</button>
                    <button type="button" className='formCancelButtonPromotions' onClick={handleCancel}>Annuler</button>
                  </section>
                </form>
                <div className="stagiairesSessionsTabs">
                  <PromotionStagiairesList 
                    promotion={promotion} 
                    allStagiaires={stagiaires}
                    onUpdatePromotion={onUpdatePromotion}
                    onDeleteStagiaire={handleDeleteStagiaireFromPromotion}
                    onAddStagiaire={handleAddStagiaireToPromotion}
                  />
                  <PromotionSessionsList sessions={promotion.sessions}/>
                </div>
              </section>  
            ) : (
              <>
                {backupPromotion &&
                  <section className='ficheSectionPromotions'>
                    <div className="topRow">
                      <div className="titleInputBoxPromotions">
                        <h3 className='inputTitlePromotions'>Type :</h3>
                        <div className="inputBoxPromotions">
                          <p className='typeInputTextPromotions'>{backupPromotion.type}</p>
                        </div>
                      </div>
                      <div className="titleInputBoxPromotions">
                        <h3 className='inputTitlePromotions'>DC :</h3>
                        <div className="inputBoxPromotions">
                          <p className='dateInputPromotions'>{formateDate(backupPromotion.createdAt)}</p>
                        </div>
                      </div>
                      <div className="titleInputBoxPromotions">
                        <h3 className='inputTitlePromotions'>DD :</h3>
                        <div className="inputBoxPromotions">
                          <p className='dateInputPromotions'>{formateDate(backupPromotion.startAt)}</p>
                        </div>
                      </div>
                      <div className="titleInputBoxPromotions">
                        <h3 className='inputTitlePromotions'>DF :</h3>
                        <div className="inputBoxPromotions">
                          <p className='dateInputPromotions'>{formateDate(backupPromotion.endAt)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="botRow">
                      <div className="titleInputBoxPromotions">
                        <h3 className='inputTitlePromotions'>Description :</h3>
                        <div className="inputBoxPromotions">
                          <p className='descriptionInputTextPromotions'>{backupPromotion.description}</p>
                        </div>
                      </div>
                      <div className="titleInputBoxPromotions">
                        <h3 className='inputTitlePromotions'>Salle :</h3>
                        <div className="inputBoxPromotions">
                          <p className='salleInputTextPromotions'>{backupPromotion.salle.name}</p>
                        </div>
                      </div>
                      <div className="titleInputBoxPromotions">
                        <h3 className='inputTitlePromotions'>Formateur :</h3>
                        <div className="inputBoxPromotions">
                          <p className='formateurInputTextPromotions'>
                            {`${backupPromotion.formateur.first_name} ${backupPromotion.formateur.last_name}`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="stagiairesSessionsTabs">
                      <PromotionStagiairesList 
                        promotion={backupPromotion} 
                        allStagiaires={stagiaires}
                        onUpdatePromotion={onUpdatePromotion}
                        onDeleteStagiaire={handleDeleteStagiaireFromPromotion}
                        onAddStagiaire={handleAddStagiaireToPromotion}
                      />
                      <PromotionSessionsList sessions={backupPromotion.sessions}/>
                    </div>
                  </section>
                }
              </>
            )}
        </>
      }
    </>
  )
}

export default PromotionFiche