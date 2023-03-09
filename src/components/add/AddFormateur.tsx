import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formateur } from '../../models/Formateur';
import '../../assets/styles/components/add/AddFormateur.css'

const AddFormateur = (props : any) => {

  const navigate = useNavigate();
  const [formateur, setFormateur] = useState<Formateur>({ id: 0, first_name: '', last_name: '', email: '', createdAt: new Date() });

  useEffect(() => {
    setFormateur((formateur) => ({...formateur, createdAt: new Date()}))
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormateur((formateur) => ({...formateur, [event.target.name]: event.target.value}))
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formateurCapitalized : Formateur = {
      ...formateur,
      first_name: formateur.first_name.charAt(0).toUpperCase() + formateur.first_name.slice(1),
      last_name: formateur.last_name.charAt(0).toUpperCase() + formateur.last_name.slice(1)
    };
    const response = await fetch('http://localhost:3000/formateurs')
    const data = await response.json();
    const duplicateFormateur = data.find((f : Formateur) => f.email === formateurCapitalized.email)
    if (duplicateFormateur) {
      alert('Ce formateur existe déjà !')
    } else {
      props.addNewFormateur(formateurCapitalized);
      const newFormateur : Formateur = { id: 0, first_name: '', last_name: '', email: '', createdAt: new Date() }
      setFormateur(newFormateur);
    }
  };

  return (
    <>
      <form className='addFormSection' onSubmit={(event) => handleSubmit(event)}>
        <div className="buttonDivBox">
          <button type="submit" className='addFormButton'>Ajouter</button>
          <button type='button' className='cancelButton' onClick={() => navigate(-1)}>Annuler</button>
        </div>
        <section className="addFicheSection">
          <div className="inputDivBox">
            <div className='inputDiv'>
              <label htmlFor="first_name" className='addInputTitle'>First Name:</label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                className='firstNameInput'
                value={formateur.first_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='inputDiv'>
              <label htmlFor="last_name" className='addInputTitle'>Last Name:</label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                className='lastNameInput'
                value={formateur.last_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='inputDiv'>
              <label htmlFor="email" className='addInputTitle'>Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                className='emailInput'
                value={formateur.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default AddFormateur;