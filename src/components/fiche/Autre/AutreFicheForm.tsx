import Modal from 'react-modal'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Autre } from '../../../models/Reservation/Autre'
import { Salle } from '../../../models/Salle'
import { autreService } from '../../../services/Reservation/AutreService'
import { salleService } from '../../../services/SalleService'
import { ModalStyle } from '../../../assets/styles/components/modals/ModalStyle.css'
import DeleteConfirmation from '../../modals/DeleteConfirmation'
import updateLogo from '../../../assets/img/modify.png'
import deleteLogo from '../../../assets/img/remove.png'
import backLogo from '../../../assets/img/left-arrow.png'
import '../../../assets/styles/components/fiches/AutreFiche.css'

type AutreFicheFormProps = {
    autre : Autre
    onUpdateAutre: Function
}

const AutreFicheForm : React.FC<AutreFicheFormProps> = ({autre, onUpdateAutre}) => {

    const navigate = useNavigate();

    const [editMode, setEditMode] = useState<boolean>(false)

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)

    const [currentAutre, setCurrentAutre] = useState<Autre>(autre)

    const [backupAutre, setBackupAutre] = useState<Autre>(autre)

    const [salles, setSalles] = useState<Salle[]>([])

    const getAllSalles = () => {
        salleService.findAllSalles()
          .then((data) => setSalles(data))
          .catch((error) => console.log(error))
        ;
    }

    useEffect(() => {
        setCurrentAutre(autre)
        setBackupAutre(autre)
        getAllSalles()
        setEditMode(false)
    }, [autre])

    const handleEditMode = () => {
        if (editMode == false) {
          setBackupAutre(currentAutre)
          setEditMode(true)
        } else {
            setEditMode(false)
        }
    };

    const handleDelete = () => {
        setShowDeleteConfirmation(true)
    };
    
    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false)
    };
    
    const handleConfirmDelete = () => {
      if (!autre) {
        return;
      }
      autreService
        .deleteAutre(autre.id)
        .then(() => navigate('/reservations/autres'))
        .catch((error) => console.error(error))
      setShowDeleteConfirmation(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        if (name === 'startAt' || name === 'endAt') {
          const date = new Date(value);
          setCurrentAutre(prevState => Object.assign({}, prevState, { [name]: date.toISOString() }));
        } else if (name === 'desc') {
          const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
          setCurrentAutre(prevState => Object.assign({}, prevState, { [name]: capitalizedValue}));
        }
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        setCurrentAutre(prevState => Object.assign({}, prevState, { [name]: capitalizedValue}));
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selectedName = event.target.name;
        if (selectedName === "salle") {
          const selectedSalle = salles.find((salle) => salle.name === selectedValue);
          setCurrentAutre((prevState) => ({
            ...prevState,
            salle: selectedSalle !== undefined ? selectedSalle : prevState.salle,
          }));
        }
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = event.target;
        setCurrentAutre(prevState => Object.assign({}, prevState, { [name]: value }));
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (autre) {
          event.preventDefault();
      
          setBackupAutre(currentAutre);
      
          autreService.updateAutre(autre.id, currentAutre)
            .then(() => {
              setEditMode(false)
            })
            .catch((error) => console.error(error)
            );
          onUpdateAutre(currentAutre)
        }
    };

    const handleCancel = () => {
        setEditMode(false)
        if (backupAutre != undefined) {
          setCurrentAutre(backupAutre)
        }
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

    const handleAddButtonNav = () => {
        navigate('/reservations/autres/add')
    };

  return (
    <>
        <section className='buttonSectionPromotions'>
            {editMode ? 
              (
                <img src={backLogo} alt="update" className='updateLogoFiche'  onClick={handleEditMode}/>
              ) : (
                <img src={updateLogo} alt="update" className='updateLogoFiche'  onClick={handleEditMode}/>
              )
            }          
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
        <section className='ficheSectionAutres'>
        {editMode ? (
            <form className='formSectionAutres' onSubmit={handleFormSubmit}>
                <section className='inputSectionAutres'>
                    <div className="leftForm">
                        <div className="titleInputBoxAutres">
                            <h3 className='inputTitleAutres'>Type :</h3>
                            <div className="inputBoxAutres">
                            <select
                                name="type"
                                value={currentAutre.type}
                                onChange={handleTypeChange}
                                className='typeInputTextAutres'
                            >
                                <option value="Réunion">Réunion</option>
                                <option value="Examen">Examen</option>
                                <option value="Job Dating">Job Dating</option>
                                <option value="Entretien">Entretien</option>
                                <option value="Visioconférence">Visioconférence</option>
                            </select>
                            </div>
                        </div>
                        <div className="titleInputBoxAutres">
                            <h3 className='inputTitleAutres'>DD :</h3>
                            <div className="inputBoxAutres">
                                <input
                                    type="date"
                                    name="startAt"
                                    value={formateDateForm(currentAutre.startAt)}
                                    onChange={handleInputChange}
                                    className='dateInputAutres'
                                />
                            </div>
                        </div>
                        <div className="titleInputBoxAutres">
                            <h3 className='inputTitleAutres'>Salle :</h3>
                            <div className="inputBoxAutres">
                                <select
                                    name="salle"
                                    value={currentAutre.salle.name}
                                    onChange={handleSelectChange}
                                    className='salleInputAutres'
                                >
                                    {salles.map((salle) => (
                                      <option key={salle.id} value={salle.name}>{salle.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="titleInputBoxAutres">
                            <h3 className='inputTitleAutres'>DF :</h3>
                            <div className="inputBoxAutres">
                                <input
                                    type="date"
                                    name="endAt"
                                    value={formateDateForm(currentAutre.endAt)}
                                    onChange={handleInputChange}
                                    className='dateInputAutres'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="rightForm">
                        <div className="titleInputBoxAutres">
                            <h3 className='inputTitleAutres'>Description :</h3>
                            <div className="inputBoxAutres">
                                <textarea
                                    name="desc"
                                    value={currentAutre.desc}
                                    onChange={handleTextChange}
                                    className='descriptionFormInputTextAutres'
                                />
                            </div>
                        </div>
                    </div>
                    <section className='updateButtonsSectionAutres'>
                        <button type="submit" className='formSaveButtonAutres'>Enregistrer</button>
                        <button type="button" className='formCancelButtonAutres' onClick={handleCancel}>Annuler</button>
                    </section>
                </section>
            </form>
        ) : (
            <>
                <div className="topRowFiche">
                    <div className="titleInputBoxAutres">
                        <h3 className='inputTitleAutres'>Type :</h3>
                        <div className="inputBoxAutres">
                            <p className='typeInputTextAutres'>{backupAutre.type}</p>
                        </div>
                    </div>
                    <div className="titleInputBoxAutres">
                        <h3 className='inputTitleAutres'>DC :</h3>
                        <div className="inputBoxAutres">
                            <p className='dateInputAutres'>{formateDate(backupAutre.createdAt)}</p>
                        </div>
                    </div>
                    <div className="titleInputBoxAutres">
                        <h3 className='inputTitleAutres'>DD :</h3>
                        <div className="inputBoxAutres">
                            <p className='dateInputAutres'>{formateDate(backupAutre.startAt)}</p>
                        </div>
                    </div>
                    <div className="titleInputBoxAutres">
                        <h3 className='inputTitleAutres'>DF :</h3>
                        <div className="inputBoxAutres">
                            <p className='dateInputAutres'>{formateDate(backupAutre.endAt)}</p>
                        </div>
                    </div>
                </div>
                <div className="botRowFiche">
                    <div className="titleInputBoxAutres">
                        <h3 className='inputTitleAutres'>Salle :</h3>
                        <div className="inputBoxAutres">
                            <p className='salleInputTextAutres'>{backupAutre.salle.name}</p>
                        </div>
                    </div>
                    <div className="titleInputBoxAutres">
                        <h3 className='inputTitleAutres'>Description :</h3>
                        <div className="inputBoxAutres">
                            <p className='descriptionInputTextAutres'>{backupAutre.desc}</p>
                        </div>
                    </div>
                </div>
            </>
        )}
        </section>  
    </>
  )
}

export default AutreFicheForm