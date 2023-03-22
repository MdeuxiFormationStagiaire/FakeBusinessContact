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
import '../../assets/styles/components/fiches/PromotionFiche.css'

type PromotionFicheProps = {
  promotions: Promotion[]
  salles: Salle[]
  formateurs: Formateur[]
  stagiaires: Stagiaire[]
  sessions: Session[]
  onUpdatePromotion: Function
}

const PromotionFiche : React.FC<PromotionFicheProps> = ({promotions, salles, formateurs, stagiaires, sessions, onUpdatePromotion}) => {
  
  const navigate = useNavigate();
  const { id } = useParams<{id : string}>();

  const [promotion, setPromotion] = useState<Promotion>(promotions[0])

  const [backupPromotion, setBackupPromotion] = useState(promotions[0])

  const [editMode, setEditMode] = useState(false)

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  useEffect(() => {
    const promotionId = id ? parseInt(id) : 0;
    promotionService.getPromotionById(promotionId)
      .then((data) => {setPromotion(data); setBackupPromotion(data)})
      .catch((error) => console.log(error));
  }, [id]);

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
    } else {
      setEditMode(false)
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
    const selectedValue = event.target.value;
    const selectedName = event.target.name;
    if (selectedName === "salle") {
      const selectedSalle = salles.find((salle) => salle.name === selectedValue);
      setPromotion((prevState) => ({
        ...prevState,
        salle: selectedSalle !== undefined ? selectedSalle : prevState.salle,
      }));
    } else if (selectedName === "formateur") {
      const selectedFormateur = formateurs.find((formateur) => formateur.last_name === selectedValue);
      setPromotion((prevState) => ({
        ...prevState,
        formateur: selectedFormateur !== undefined ? selectedFormateur : prevState.formateur,
      }))
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!promotion) {
      return;
    }

    setBackupPromotion(prevPromotion => ({
      ...prevPromotion,
      description: promotion.description,
      salle: promotion.salle,
      formateur: promotion.formateur,
      startAt: promotion.startAt,
      endAt: promotion.endAt,
      sessions: promotion.sessions,
      stagiaires: promotion.stagiaires,
      utilisateur: promotion.utilisateur
    }));

    promotionService.updatePromotion(promotion.id, promotion)
      .then(() => {
        setEditMode(false)
      })
      .catch((error) => console.error(error)
      );
    onUpdatePromotion(promotion)
  };

  const handleCancel = () => {
    setEditMode(false)
    if (backupPromotion != undefined) {
      setPromotion(backupPromotion)
    }
  };

  const handleAddButtonNav = () => {
    navigate('/promotions/add')
  };

  const formateDate = (date : Date): string => {
    const formatedDate : string = date.toLocaleString('fr-FR').slice(0, 10);
    return formatedDate;
  }

  if (!promotion) {
    return <div>Loading...</div>;
  };

  return (
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
                <div className="titleInputBoxPromotions">
                  <h3 className='inputTitlePromotions'>Type :</h3>
                  <div className="inputBoxPromotions">
                    <input
                      type="text"
                      name="type"
                      value={promotion.type}
                      onChange={handleInputChange}
                      className='typeInputPromotions'
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
                      value={formateDate(promotion.startAt)}
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
                      value={formateDate(promotion.endAt)}
                      onChange={handleInputChange}
                      className='endAtInputDatePromotions'
                    />
                  </div>
                </div>
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
              </section>
              <section className='updateButtonsSectionPromotions'>
                <button type="submit" className='formSaveButtonPromotions'>Enregistrer</button>
                <button type="button" className='formCancelButtonPromotions' onClick={handleCancel}>Annuler</button>
              </section>
            </form>
            <div className="stagiairesSessionsDiv">
              <PromotionStagiairesList stagiaires={promotion.stagiaires}/>
              <PromotionSessionsList sessions={promotion.sessions}/>
            </div>
          </section>  
        ) : (
          <>
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
                <PromotionStagiairesList stagiaires={backupPromotion.stagiaires}/>
                <PromotionSessionsList sessions={backupPromotion.sessions}/>
              </div>
            </section>
          </>
        )}
    </>
  )
}

export default PromotionFiche