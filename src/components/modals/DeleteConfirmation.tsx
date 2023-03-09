import React from 'react'

type DeleteConfirmationProps = {
    onConfirm: () => void;
    onCancel: () => void;
};

const DeleteConfirmation : React.FC<DeleteConfirmationProps> = ({
    onConfirm,
    onCancel,
}) => {
  return (
    <section className='deleteConfirmationBox'>
        <p className='deleteConfirmationQuote'>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
        <div className="deleteConfirmationButtonBox">
            <button className='deleteConfirmationButton' onClick={onConfirm}>Oui</button>
            <button className='deleteConfirmationButton' onClick={onCancel}>Non</button>
        </div>
    </section>
  )
}

export default DeleteConfirmation;