import Modal from 'react-modal'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Salle } from '../../models/Salle'
import { salleService } from '../../services/SalleService'
import { ModalStyle } from '../../assets/styles/components/modals/ModalStyle.css'
import DeleteConfirmation from '../modals/DeleteConfirmation'
import '../../assets/styles/components/fiches/SalleFiche.css'

type SalleFicheProps = {
    salles : Salle[],
    onUpdateSalle: Function
}

const SalleFiche : React.FC<SalleFicheProps> = ({salles, onUpdateSalle}) => {
  
  const navigate = useNavigate();
  const { id } = useParams<{id : string}>();

  const [salle, setSalle] = useState<Salle>(salles[0])

  const [backupSalle, setBackupSalle] = useState(salles[0])

  const [editMode, setEditMode] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  useEffect(() => {
    const salleId = id ? parseInt(id) : 0;
    salleService.getSalleById(salleId)
      .then((data) => {setSalle(data); setBackupSalle(data)})
      .catch((error) => console.log(error));
  }, [id]);

  const handleDelete = () => {
    setShowDeleteConfirmation(true)
  };

  const handleConfirmDelete = () => {
    if (!salle) {
      return;
    }
    salleService
      .deleteSalle(salle.id)
      .then(() => navigate('/salles'))
      .catch((error) => console.error(error))
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleButtonHover = (className: string, hover: boolean) : any => {
    const fiche = document.querySelector('.ficheSectionSalles') as HTMLDivElement | null;
    if (fiche) {
      if (hover) {
        fiche.classList.add(className);
      } else {
        fiche.classList.remove(className);
      };
    };
  };

  const handleEditMode = () => {
    if (editMode == false) {
      setBackupSalle(salle);
      setEditMode(true);
    } else {
      setEditMode(false);
    };
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === 'createdAt') {
      const date = new Date(value);
      setSalle(prevState => 
        Object.assign({}, prevState, { [name]: date.toISOString() })
      );
    } else {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setSalle(prevState => 
        Object.assign({}, prevState, { [name]: capitalizedValue})
      );
    };
  };

  const handleFloorChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target;
    setSalle(prevState => Object.assign({}, prevState, { [name]: value }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!salle) {
      return;
    };
    setBackupSalle(prevSalle => ({
      ...prevSalle,
      name: salle.name,
      capacity: salle.capacity,
      indication: salle.indication,
      floor: salle.floor
    }));
    salleService.updateSalle(salle.id, salle)
      .then(() => {
        setEditMode(false)
      })
      .catch((error) => console.error(error)
      );
    onUpdateSalle(salle);
  };

  const handleCancel = () => {
    setEditMode(false);
    if (backupSalle != undefined) {
      setSalle(backupSalle)
    };
  };

  const handleAddButtonNav = () => {
    navigate('/salles/add');
  };

  const formateDate = (date : Date) => {
    const formatedDate : string = 
        date.toLocaleString('fr-FR').slice(8, 10) + '/' +
        date.toLocaleString('fr-FR').slice(5, 7) + '/' +
        date.toLocaleString('fr-FR').slice(0, 4)
    ;
    return formatedDate;
  }

  if (!salle) {
    return <div>Loading...</div>;
  };
  
  return (
    <>
      <section className='buttonSectionSalles'>
        <button type='button' className='updateButtonBoxSalles' onClick={handleEditMode} onMouseEnter={() => handleButtonHover('hoveredUpdateSalles', true)} onMouseLeave={() => handleButtonHover('hoveredUpdateSalles', false)}>
          M
        </button>
        <button type='button' className='deleteButtonBoxSalles' onClick={handleDelete} onMouseEnter={() => handleButtonHover('hoveredDeleteSalles', true)} onMouseLeave={() => handleButtonHover('hoveredDeleteSalles', false)}>
          X
        </button>
        <button type='button' className='addButtonBoxFicheSalles' onClick={handleAddButtonNav}>Ajouter</button>
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
          <section className='ficheSectionUpdateSalles'>
            <form className='formSectionSalles' onSubmit={handleFormSubmit}>
              <section className='inputSectionSalles'>
                <div className="titleInputBoxSalles">
                  <h3 className='inputTitleSalles'>Nom :</h3>
                  <div className="inputBoxSalles">
                    <input
                      type="text"
                      name="name"
                      value={salle.name}
                      onChange={handleInputChange}
                      className='nameInputTextSalles'
                    />
                  </div>
                </div>
                <div className="titleInputBoxSalles">
                  <h3 className='inputTitleSalles'>Capacité :</h3>
                  <div className="inputBoxSalles">
                    <input
                      type="number"
                      name="capacity"
                      value={salle.capacity}
                      onChange={handleInputChange}
                      className='capacityInputSalles'
                      min="1"
                      max="99"
                    />
                  </div>
                </div>
                <div className="titleInputBoxSalles">
                  <h3 className='inputTitleSalles'>Indications :</h3>
                  <div className="inputBoxSalles">
                    <input
                      type="text"
                      name="indication"
                      value={salle.indication}
                      onChange={handleInputChange}
                      className='indicationInputTextSalles'
                    />
                  </div>
                </div>
                <div className="titleInputBoxSalles">
                  <h3 className='inputTitleSalles'>Etage :</h3>
                  <div className="inputBoxSalles">
                    <select
                      name="floor"
                      value={salle.floor}
                      onChange={handleFloorChange}
                      className='floorInputTextSalles'
                    >
                      <option value="RDC">RDC</option>
                      <option value="1er">1er</option>
                      <option value="2ème">2ème</option>
                    </select>
                  </div>
                </div>
              </section>
              <section className='updateButtonsSectionSalles'>
                <button type="submit" className='formSaveButtonSalles'>Enregistrer</button>
                <button type="button" className='formCancelButtonSalles' onClick={handleCancel}>Annuler</button>
              </section>
            </form>
          </section>  
        ) : (
          <>
            <section className='ficheSectionSalles'>
              <div className="titleInputBoxSalles">
                <h3 className='inputTitleSalles'>Nom :</h3>
                <div className="inputBoxSalles">
                  <p className='nameInputTextSalles'>{backupSalle.name}</p>
                </div>
              </div>
              <div className="titleInputBoxSalles">
                <h3 className='inputTitleSalles'>Capacité :</h3>
                <div className="inputBoxSalles">
                  <p className='capacityInputSalles'>{backupSalle.capacity}</p>
                </div>
              </div>
              <div className="titleInputBoxSalles">
                <h3 className='inputTitleSalles'>Indications :</h3>
                <div className="inputBoxSalles">
                  <p className='indicationInputTextSalles'>{backupSalle.indication}</p>
                </div>
              </div>
              <div className="titleInputBoxSalles">
                <h3 className='inputTitleSalles'>Etage :</h3>
                <div className="inputBoxSalles">
                  <p className='floorInputTextSalles'>{backupSalle.floor}</p>
                </div>
              </div>
              <div className="titleInputBoxSalles">
                <h3 className='inputTitleSalles'>DC :</h3>
                <div className="inputBoxSalles">
                  <p className='createdAtInputTextSalles'>{formateDate(backupSalle.createdAt)}</p>
                </div>
              </div>
            </section>
          </>
        )}
    </>
  )
}

export default SalleFiche