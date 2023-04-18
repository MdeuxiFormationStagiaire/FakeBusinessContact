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
import { sessionService } from '../../services/Reservation/SessionService'
import '../../assets/styles/components/add/AddPromotion.css'

type AddPromotionProps = {
  utilisateur: Utilisateur
  formateurs: Formateur[]
  salles: Salle[]
  stagiaires: Stagiaire[]
  addNewPromotion: Function
}

const AddPromotion : React.FC<AddPromotionProps> = ({utilisateur, formateurs, salles, stagiaires, addNewPromotion}) => {

  const navigate = useNavigate();

  const [sessions, setSessions] = useState<Session[]>([])

  const [newSalle, setNewSalle] = useState<Salle>({ id: 0, name: '', capacity: 0, indication: '', floor: 'RDC', createdAt: new Date() })
  
  const [newFormateur, setNewFormateur] = useState<Formateur>({ id: 0, first_name: '', last_name: '', email: '', createdAt: new Date()})
  
  const [newSessionList, setNewSessionList] = useState<Session[]>([])
  
  const [newStagiaireList, setNewStagiaireList] = useState<Stagiaire[]>([])
  
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

  console.log(utilisateur);
  

  useEffect(() => {
    getAllSessions()
  }, []);

  const getAllSessions = () => {
    sessionService.findAllSessions().then(data => setSessions(data))
  }

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

  const handleAddStagiaireToPromotionFromSelect = (selectedStagiaire : Stagiaire) => {
    if (newStagiaireList.some(stagiaire => stagiaire.id === selectedStagiaire.id)) {
      alert("Ce stagiaire existe déjà dans cette liste.")
    } else {
      setNewStagiaireList((prevStagiaireList) => {
        const newStagiaireList = [...prevStagiaireList, selectedStagiaire];
        setNewPromotion((prevState) => ({
          ...prevState,
          stagiaires: newStagiaireList,
        }));
        return newStagiaireList;
      });
    }
  }

  const handleDeleteStagiaireFromPromotion = (idStagiaire : number) => {
    const updatedStagiaireList : Stagiaire[] = newStagiaireList.filter((stagiaire : Stagiaire) => stagiaire.id !== idStagiaire)
    setNewStagiaireList(updatedStagiaireList);
    setNewPromotion((prevState) => ({
      ...prevState,
      stagiaires: updatedStagiaireList,
    }));
  }

  const handleAddSessionToPromotion = (newSession : Session) => {
    const sessionListTest : Session[] = [...newSessionList, newSession]
    setNewPromotion((prevState) => ({
      ...prevState,
      sessions: sessionListTest
    }))
    setNewSessionList(sessionListTest)
  }

  const handleDeleteSessionFromPromotion = (session : Session) => {
    const updatedSessionList : Session[] = newSessionList.filter((s : Session) => s.id !== session.id)
    setNewSessionList(updatedSessionList)
    setNewPromotion((prevState) => ({
      ...prevState,
      sessions: updatedSessionList,
    }));
    sessionService.deleteSession(session.id)
      .then(() => {
        getAllSessions()
      })
      .catch((error) => console.error(error))
    ;
  }

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNewPromotion(newPromotion)
  }

  return (
    <>
      <section className='addFormPromotions'>
        <form className='formSectionAddPromotions' onSubmit={(event) => handleSubmit(event)}>
          <section className='topRowAddPromotions'>
            <div className='inputDivTopPromotions'>
                <label className='addInputTitlePromotions'>Type :</label>
                <input 
                  type="text"
                  name="type"
                  value={newPromotion.type}
                  className='inputFormPromotions'
                  disabled
                />
            </div>
            <div className='inputDivTopPromotions'>
                <label className='addInputTitlePromotions'>Salle :</label>
                <select
                  name="salle"
                  value={newPromotion.salle.name}
                  onChange={handleSelectChange}
                  className='inputFormPromotions'
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
                  className='inputFormPromotions'
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
                  className='inputFormPromotions'
                  value={formateDateForm(newPromotion.endAt)}
                  onChange={handleInputChange}
                  required
                />
            </div>
          </section>
          <section className='botRowAddPromotions'>
            <div className="inputDivBotPromotion">
                <label className='addInputTitlePromotions'>Description :</label>
                <input
                  type="text"
                  name="description"
                  value={newPromotion.description}
                  onChange={handleInputChange}
                  className='inputFormPromotions'
                />
            </div>
            <div className="inputDivBotPromotion">
                <label className='addInputTitlePromotions'>Formateur :</label>
                <select
                  name="formateur"
                  value={newPromotion.formateur.last_name}
                  onChange={handleSelectChange}
                  className='inputFormPromotions'
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
        <section className='stagiairesSessionsForm'>
          <div className='stagiairesSectionForm'>
            <AddPromotionStagiaires
              stagiaires={stagiaires}
              onAddStagiaireSelect={handleAddStagiaireToPromotionFromSelect}
              onDeleteStagiaire={handleDeleteStagiaireFromPromotion}
            />
          </div>
          <div className='sessionsSectionForm'>
            <AddPromotionSessions
              sessions={sessions}
              formateurs={formateurs}
              onAddSession={handleAddSessionToPromotion}
              onDeleteSession={handleDeleteSessionFromPromotion}
            />
          </div>
        </section>
        <section className="buttonDivBoxPromotions">
          <button type='button' className='cancelButtonPromotions' onClick={() => navigate(-1)}>Annuler</button>
          <button type="submit" className='addFormButtonPromotions'>Ajouter</button>
        </section>
      </section>
    </>
  )
}

export default AddPromotion