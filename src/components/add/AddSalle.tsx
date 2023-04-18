import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Salle } from '../../models/Salle';
import '../../assets/styles/components/add/AddSalle.css'


type addSalleProps = {
  addNewSalle : Function
}

const AddSalle : React.FC<addSalleProps> = ({addNewSalle}) => {

  const URL = process.env.REACT_APP_DB_SALLE_URL;

  const navigate = useNavigate();
  const [salle, setSalle] = useState<Salle>({ id: 0, name: '', capacity: 0, indication: '', floor: 'RDC', createdAt: new Date() });
  
  useEffect(() => {
    setSalle((salle) => ({...salle, createdAt: new Date()}));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSalle((salle) => ({...salle, [name]: value}));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSalle((salle) => ({...salle, [name]: value}));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const salleCapitalized : Salle = {
        ...salle,
        name: salle.name.charAt(0).toUpperCase() + salle.name.toLocaleLowerCase().slice(1),
        indication: salle.indication.charAt(0).toUpperCase() + salle.indication.toLocaleLowerCase().slice(1)
    };
    const response = await fetch(`${URL}`);
    const data = await response.json();
    const duplicateSalle = data.find((salle : Salle) => salle.name === salleCapitalized.name);
    if (duplicateSalle) {
        alert('Cette salle existe déjà !');
    } else {
        addNewSalle(salleCapitalized);
        const newSalle : Salle = {id: 0, name: '', capacity: 0, indication: '', floor: 'RDC', createdAt: new Date()};
        setSalle(newSalle);
    };
  };

  return (
    <>
      <form className='addFormSectionSalles' onSubmit={(event) => handleSubmit(event)}>
        <section className="addFicheSectionSalles">
          <div className="inputDivBoxSalles">
            <div className='inputDivSalles'>
              <label htmlFor="name" className='addInputTitleSalles'>Nom :</label>
              <input
                type="text"
                name="name"
                id="name"
                className='nameAddInputTextSalles'
                value={salle.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='inputDivSalles'>
              <label htmlFor="capacity" className='addInputTitleSalles'>Capacité :</label>
              <input
                type="number"
                name="capacity"
                id="capacity"
                className='capacityAddInputSalles'
                value={salle.capacity}
                onChange={handleInputChange}
                min="1"
                max="99"
                required
              />
            </div>
            <div className='inputDivSalles'>
              <label htmlFor="indication" className='addInputTitleSalles'>Indications :</label>
              <input
                type="text"
                name="indication"
                id="indication"
                className='indicationAddInputTextSalles'
                value={salle.indication}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='inputDivSalles'>
              <label htmlFor="floor" className='addInputTitleSalles'>Etage :</label>
              <select
                  name="floor"
                  value={salle.floor}
                  onChange={handleSelectChange}
                  className='floorAddInputTextSalles'
                  required
                >
                  <option value="RDC">RDC</option>
                  <option value="1er">1er</option>
                  <option value="2ème">2ème</option>
                </select>
            </div>
          </div>
          <div className="buttonDivBoxSalles">
            <button type='button' className='cancelButtonSalles' onClick={() => navigate(-1)}>Annuler</button>
            <button type="submit" className='addFormButtonSalles'>Ajouter</button>
          </div>
        </section>
      </form>
    </>
  );
}

export default AddSalle