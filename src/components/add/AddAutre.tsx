import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Autre } from '../../models/Reservation/Autre';
import { Salle } from '../../models/Salle';
import { Utilisateur } from '../../models/Utilisateur';
import '../../assets/styles/components/add/AddAutre.css'

type AddAutreProps = {
  autres : Autre[]
  utilisateur: Utilisateur
  salles: Salle[]
  addNewAutre : Function
}

const AddAutre : React.FC<AddAutreProps> = ({autres, utilisateur, salles, addNewAutre}) => {

  const navigate = useNavigate();

  const [newSalle, setNewSalle] = useState<Salle>(salles[0])

  const [autre, setAutre] = useState<Autre>({
    id: 0, 
    type: 'Entretien', 
    salle: newSalle, 
    desc: '', 
    createdAt: new Date(), 
    startAt: new Date(), 
    endAt: new Date(), 
    utilisateur:  utilisateur
  });

  useEffect(() => {
    setAutre((autre) => ({...autre, createdAt: new Date()}));
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'startAt' || name === 'endAt') {
      const date = new Date(value);
      setAutre(prevState => Object.assign({}, prevState, { [name]: date.toISOString() }));
    } else {
      setAutre(prevState => Object.assign({}, prevState, { [name]: value }));
    }
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setAutre(prevState => Object.assign({}, prevState, { [name]: value }));
  }

  const handleRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedName = event.target.name;
    if (selectedName === "salle") {
      const selectedSalle = salles.find((salle) => salle.name === selectedValue);
      setAutre((prevState) => ({
        ...prevState,
        salle: selectedSalle !== undefined ? selectedSalle : prevState.salle,
      }));
    }
  }

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target;
    setAutre(prevState => Object.assign({}, prevState, { [name]: value }));
  };

  const IsOverlapping = (newAutre : Autre) : boolean => {
    for (const autre of autres) {
      if (
        (newAutre.startAt >= autre.startAt && newAutre.startAt <= autre.endAt) ||
        (newAutre.endAt >= autre.startAt && newAutre.endAt <= autre.endAt)
      ) {
        return true;
      }
    }
    return false;
  }
 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const autreCapitalized : Autre = {
      ...autre,
      desc: autre.desc.charAt(0).toUpperCase() + autre.desc.toLocaleLowerCase().slice(1),
      utilisateur: utilisateur
    };

    if (!IsOverlapping(autre)) {
      addNewAutre(autreCapitalized)
      setAutre({ id: 0, type: 'Entretien', salle: newSalle, desc: '', createdAt: new Date(), startAt: new Date(), endAt: new Date(), utilisateur: utilisateur})
    } else {
      alert("Les dates de cette session sont incompatible avec la liste de sessions en cours !")
    }
  }

  const formateDateForm = (date : Date): string => {
    const formatedDate : string = date.toLocaleString('fr-FR').slice(0, 10);
    return formatedDate;
  }

  return (
    <>
      <form className='addFormSectionAutres' onSubmit={(event) => handleSubmit(event)}>
        <section className='addFicheSectionAutres'>
          <section className="addFicheLeftSectionAutres">
            <div className='inputDivLeftAutres'>
              <label className='addInputTitleAutres'>Type :</label>
              <select
                name="type"
                value={autre.type}
                onChange={handleTypeChange}
                className='typeAddInputAutres'
              >
                <option value="Réunion">Réunion</option>
                <option value="Examen">Examen</option>
                <option value="Job Dating">Job Dating</option>
                <option value="Entretien">Entretien</option>
                <option value="Visioconférence">Visioconférence</option>
              </select>
            </div>
            <div className='inputDivLeftAutres'>
              <label className='addInputTitleAutres'>DD :</label>
              <input
                type="date"
                name="startAt"
                id="startAt"
                className='dateAddInputAutres'
                value={formateDateForm(autre.startAt)}
                onChange={handleDateChange}
                required
              />
            </div>
            <div className='inputDivLeftAutres'>
              <label className='addInputTitleAutres'>Salle :</label>
              <select
                name="salle"
                value={autre.salle.name}
                onChange={handleRoomChange}
                className='typeAddInputAutres'
              >
                {salles.map((salle) => (
                  <option key={salle.id} value={salle.name}>{salle.name}</option>
                ))}
              </select>
            </div>
            <div className='inputDivLeftAutres'>
              <label className='addInputTitleAutres'>DF :</label>
              <input
                type="date"
                name="endAt"
                id="endAt"
                className='dateAddInputAutres'
                value={formateDateForm(autre.endAt)}
                onChange={handleDateChange}
                required
              />
            </div>
          </section>
          <section className='addFicheRightSectionAutres'>
            <div className='inputDivRightAutres'>
              <label htmlFor="first_name" className='addInputTitleAutres'>Description :</label>
              <textarea
                name="desc"
                id="desc"
                className='descInputAddTextAutres'
                value={autre.desc}
                onChange={handleTextChange}
                required
              />
            </div>
          </section>
        </section>
        <div className="buttonDivBoxAutres">
          <button type='button' className='cancelButtonAutres' onClick={() => navigate(-1)}>Annuler</button>
          <button type="submit" className='addFormButtonAutres'>Ajouter</button>
        </div>
      </form>
    </>
  )
}

export default AddAutre