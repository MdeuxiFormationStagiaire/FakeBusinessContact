import React, { useEffect, useState } from 'react'
import { Utilisateur } from '../../models/Utilisateur'
import { Salle } from '../../models/Salle'
import { Formateur } from '../../models/Formateur'
import { Stagiaire } from '../../models/Stagiaire'
import { Promotion } from '../../models/Reservation/Promotion'
import { Session } from '../../models/Reservation/Session'
import { useNavigate } from 'react-router-dom'
import AddPromotionStagiaires from './AddPromotionStagiaires'
import AddPromotionSessions from './AddPromotionSessions'

type AddPromotionProps = {
    promotions: Promotion[]
    salles: Salle[]
    formateurs: Formateur[]
    stagiaires: Stagiaire[]
    sessions: Session[]
    utilisateur: Utilisateur
    addNewPromotion: Function
}

const AddPromotion : React.FC<AddPromotionProps> = ({utilisateur, promotions, salles, formateurs, stagiaires, sessions, addNewPromotion}) => {

    const navigate = useNavigate();
    
    const [newSalle, setNewSalle] = useState<Salle>(salles[0])
    
    const [newFormateur, setNewFormateur] = useState<Formateur>(formateurs[0])
    
    const [newSessionList, setnewSessionList] = useState<Session[]>([sessions[0]])
    
    const [newStagiaireList, setNewStagiaireList] = useState<Stagiaire[]>([stagiaires[0]])

    const [newPromotion, setNewPromotion] = useState<Promotion>({
        id: 0, 
        type: "Promotion",
        description: '', 
        salle: newSalle, 
        formateur: newFormateur, 
        createdAt: new Date(),
        startAt: new Date(),
        endAt: new Date(),
        sessions: newSessionList,
        stagiaires: newStagiaireList,
        utilisateur: utilisateur
    })

    useEffect(() => {
        setNewPromotion(newPromotion);
    }, []);

    const formateDateForm = (date : Date): string => {
        const formatedDate : string = date.toLocaleString('fr-FR').slice(0, 10);
        return formatedDate;
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        if (name === 'startAt' || name === 'endAt') {
          const date = new Date(value);
          setNewPromotion(prevState => Object.assign({}, prevState, { [name]: date.toISOString() }));
        } else if (name === 'description') {
          const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
          setNewPromotion(prevState => Object.assign({}, prevState, { [name]: capitalizedValue}));
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selectedName = event.target.name;
        if (selectedName === "salle") {
          const selectedSalle = salles.find((salle) => salle.name === selectedValue);
          setNewPromotion((prevState) => ({
            ...prevState,
            salle: selectedSalle !== undefined ? selectedSalle : prevState.salle,
          }));
        } else if (selectedName === "formateur") {
          const selectedFormateur = formateurs.find((formateur) => formateur.last_name === selectedValue);
          setNewPromotion((prevState) => ({
            ...prevState,
            formateur: selectedFormateur !== undefined ? selectedFormateur : prevState.formateur,
          }))
        }
    };

    const handleAddStagiaireToPromotion = (selectedStagiaire : Stagiaire) => {

    }

    const handleDeleteStagiaireFromPromotion = (idStagiaire : number) => {

    }

    const handleAddSessionToPromotion = (idSession : number) => {

    }

    const handleDeleteSessionFromPromotion = (idSession : number) => {

    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {

    }

  return (
    <>
        <section className='addFormPromotions'>
            <form className='addFormSectionPromotions' onSubmit={(event) => handleSubmit(event)}>
                <div className="buttonDivBoxPromotions">
                  <button type="submit" className='addFormButtonPromotions'>Ajouter</button>
                  <button type='button' className='cancelButtonPromotions' onClick={() => navigate(-1)}>Annuler</button>
                </div>
                <section className='topRowAddPromotions'>
                    <div className='inputDivTopPromotions'>
                        <label className='addInputTitlePromotions'>Type :</label>
                        <input 
                            type="text"
                            name="type"
                            value={newPromotion.type}
                            className='typeInputTextPromotions'
                            disabled
                        />
                    </div>
                    <div className='inputDivTopPromotions'>
                        <label className='addInputTitlePromotions'>Salle :</label>
                        <select
                          name="salle"
                          value={newPromotion.salle.name}
                          onChange={handleSelectChange}
                          className='salleAddInputPromotions'
                        >
                          {salles.map((salle) => (
                            <option key={salle.id} value={salle.name}>{salle.name}</option>
                          ))}
                        </select>
                    </div>
                    <div className='inputDivTopPromotions'>
                        <label className='addInputTitlePromotions'>DD :</label>
                        <input
                          type="date"
                          name="startAt"
                          id="startAt"
                          className='dateAddInputPromotions'
                          value={formateDateForm(newPromotion.startAt)}
                          onChange={handleInputChange}
                          required
                        />
                    </div>
                    <div className='inputDivTopPromotion'>
                        <label className='addInputTitlePromotions'>DF :</label>
                        <input
                          type="date"
                          name="endAt"
                          id="endAt"
                          className='dateAddInputPromotions'
                          value={formateDateForm(newPromotion.endAt)}
                          onChange={handleInputChange}
                          required
                        />
                    </div>
                </section>
                <section className='botRowAddPromotions'>
                    <div className="titleInputBoxPromotions">
                        <label className='inputTitlePromotions'>Description :</label>
                        <input
                            type="text"
                            name="description"
                            value={newPromotion.description}
                            onChange={handleInputChange}
                            className='descriptionInputTextPromotions'
                        />
                    </div>
                    <div className="titleInputBoxPromotions">
                        <label className='inputTitlePromotions'>Formateur :</label>
                        <select
                            name="formateur"
                            value={newPromotion.formateur.last_name}
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
                </section>
            </form>
            <AddPromotionStagiaires
                stagiaires={stagiaires}
                onAddStagiaire={handleAddStagiaireToPromotion}
                onDeleteStagiaire={handleDeleteStagiaireFromPromotion}
            />
            <AddPromotionSessions
                sessions={sessions}
                formateurs={formateurs}
                onAddSession={handleAddSessionToPromotion}
                onDeleteSession={handleDeleteSessionFromPromotion}
            />
        </section>
    </>
  )
}

export default AddPromotion