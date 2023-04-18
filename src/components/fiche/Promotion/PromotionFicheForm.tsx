import React, { useEffect, useState } from 'react'
import { Formateur } from '../../../models/Formateur'
import { Promotion } from '../../../models/Reservation/Promotion'
import { Salle } from '../../../models/Salle'
import { formateurService } from '../../../services/FormateurService'
import { promotionService } from '../../../services/Reservation/PromotionService'
import { salleService } from '../../../services/SalleService'

type PromotionFicheFormProps = {
    promotion : Promotion
    onUpdatePromotion : Function
    editMode : boolean
    handleEditModeFiche : Function
}

const PromotionFicheForm : React.FC<PromotionFicheFormProps> = ({promotion, onUpdatePromotion, editMode, handleEditModeFiche}) => {

    const [currentEditMode, setCurrentEditMode] = useState<boolean>(editMode)

    const [currentPromotion, setCurrentPromotion] = useState<Promotion>(promotion)

    const [backupPromotion, setBackupPromotion] = useState<Promotion>(promotion)

    const [formateurs, setFormateurs] = useState<Formateur[]>([])

    const [salles, setSalles] = useState<Salle[]>([])

    const getAllFormateur = () => {
        formateurService.findAllFormateurs()
          .then((data) => setFormateurs(data))
          .catch((error) => console.log(error));
    }

    const getAllSalles = () => {
        salleService.findAllSalles()
          .then((data) => setSalles(data))
          .catch((error) => console.log(error));
    }

    useEffect(() => {
        getAllFormateur()
        getAllSalles()
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        if (name === 'startAt' || name === 'endAt') {
          const date = new Date(value);
          setCurrentPromotion(prevState => Object.assign({}, prevState, { [name]: date.toISOString() }));
        } else if (name === 'description') {
          const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
          setCurrentPromotion(prevState => Object.assign({}, prevState, { [name]: capitalizedValue}));
        } else {
          setCurrentPromotion(prevState => Object.assign({}, prevState, { [name]: value}));
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selectedName = event.target.name;
        if (selectedName === "salle") {
          const selectedSalle = salles.find((salle) => salle.name === selectedValue);
          setCurrentPromotion((prevState) => ({
            ...prevState,
            salle: selectedSalle !== undefined ? selectedSalle : prevState.salle,
          }));
        } else if (selectedName === "formateur") {
          const selectedFormateur = formateurs.find((formateur) => formateur.last_name === selectedValue);
          setCurrentPromotion((prevState) => ({
            ...prevState,
            formateur: selectedFormateur !== undefined ? selectedFormateur : prevState.formateur,
          }))
        }
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (promotion) {
          event.preventDefault();
      
          setBackupPromotion(currentPromotion);
      
          promotionService.updatePromotion(promotion.id, currentPromotion)
            .then(() => {
              setCurrentEditMode(false)
            })
            .catch((error) => console.error(error)
            );
          onUpdatePromotion(currentPromotion)
        }
        handleEditModeFiche()
    };

    const handleCancel = () => {
        setCurrentEditMode(false)
        if (backupPromotion != undefined) {
          setCurrentPromotion(backupPromotion)
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

  return (
    <>
        <section className='ficheSectionUpdatePromotions'>
        {editMode ? (
            <form className='formSectionPromotions' onSubmit={handleFormSubmit}>
                <section className='inputSectionPromotions'>
                    <section className='inputTopBotSectionPromotions'>
                        <div className="topRowForm">
                            <div className="titleInputBoxPromotions">
                                <h3 className='inputTitlePromotions'>Type :</h3>
                                <div className="inputBoxPromotions">
                                    <input
                                        type="text"
                                        name="type"
                                        value={currentPromotion.type}
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
                                        value={formateDateForm(currentPromotion.startAt)}
                                        onChange={handleInputChange}
                                        className='dateInputPromotions'
                                    />
                                </div>
                            </div>
                            <div className="titleInputBoxPromotions">
                                <h3 className='inputTitlePromotions'>DF :</h3>
                                <div className="inputBoxPromotions">
                                    <input
                                        type="date"
                                        name="endAt"
                                        value={formateDateForm(currentPromotion.endAt)}
                                        onChange={handleInputChange}
                                        className='dateInputPromotions'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="botRowForm">
                            <div className="titleInputBoxPromotions">
                                <h3 className='inputTitlePromotions'>Description :</h3>
                                <div className="inputBoxPromotions">
                                    <input
                                        type="text"
                                        name="description"
                                        value={currentPromotion.description}
                                        onChange={handleInputChange}
                                        className='descriptionInputTextPromotions'
                                    />
                                </div>
                            </div>
                            <div className="titleInputBoxPromotions">
                                <h3 className='inputTitlePromotions'>Salle :</h3>
                                <div className="inputBoxPromotions">
                                    <select
                                        name="salle"
                                        value={currentPromotion.salle.name}
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
                                <h3 className='inputTitlePromotions'>Formateur :</h3>
                                <div className="inputBoxPromotions">
                                    <select
                                        name="formateur"
                                        value={currentPromotion.formateur.last_name}
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
                        <button type="button" className='formCancelButtonPromotions' onClick={() => {
                            handleCancel();
                            handleEditModeFiche();
                        }}>Annuler</button>
                    </section>
                </section>
            </form>
        ) : (
            <>
                <div className="topRowFichePromotions">
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
                <div className="botRowFichePromotions">
                    <div className="titleInputBoxPromotions">
                        <h3 className='inputTitlePromotions'>Description :</h3>
                        <div className="inputBoxPromotions">
                            <p className='descriptionInputTextPromotions'>{backupPromotion.description}</p>
                        </div>
                    </div>
                    <div className="titleInputBoxPromotions">
                        <h3 className='inputTitlePromotions'>Salle :</h3>
                        <div className="inputBoxPromotions">
                            <p className='salleInputPromotions'>{backupPromotion.salle.name}</p>
                        </div>
                    </div>
                    <div className="titleInputBoxPromotions">
                        <h3 className='inputTitlePromotions'>Formateur :</h3>
                        <div className="inputBoxPromotions">
                            <p className='formateurInputPromotions'>
                                {`${backupPromotion.formateur.first_name} ${backupPromotion.formateur.last_name}`}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )}
        </section>  
    </>
  )
}

export default PromotionFicheForm