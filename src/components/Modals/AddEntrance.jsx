import css from './Modals.module.scss'; // Подключение файла стилей (замените на ваш путь)
import '../../styles/_base.scss';
import close from '../../assets/close-icon.svg';
import  { useEffect, useState } from 'react';
import AddFlatModal from './AddFlat';
// import { houses } from '../../mock';
import {addEntranceModalPropTypes} from '../../propTypes';

const AddEntranceModal = (
    { isOpen, onClose, house, onAddEntrance }
) => {
    
  //   const [entranceNumber, setEntranceNumber] = useState('');
  const [selectedEntrance, setSelectedEntrance] = useState(null);
  const [isModalAddFlatOpen, setIsModalAddFlatOpen] = useState(false);//открытие модального окна с квартирами

  const [selectedEntranceIndex, setSelectedEntranceIndex] = useState(0);

useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedEntranceIndex((prevIndex) => (prevIndex + 1) % house.entrances.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedEntranceIndex((prevIndex) => (prevIndex - 1 + house.entrances.length) % house.entrances.length);
    } else if (event.key === 'Enter') {
      console.log(6);
      if (selectedEntrance !== null) {
        handleEntranceClick(selectedEntrance);
      }
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [house.entrances.length]);

  const handleEntranceClick = (entrance, index) => {
    setSelectedEntrance(entrance);
    setIsModalAddFlatOpen(true);
    setSelectedEntranceIndex(index)
  };
console.log(selectedEntrance)
  const closeAddFlatModal = () => {
    setIsModalAddFlatOpen(false);
  };
  const handleAddFlats = (entranceId, selectedFlats) => {
    onAddEntrance(entranceId, selectedFlats);
    setIsModalAddFlatOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
    {/* // <div className={`modal ${isOpen ? 'open' : ''}`}> */}
      <div className={css.modal}>
        <div className={css.modal__name}>
            <p>Номер подъезда</p>
            <button onClick={onClose} className={css.button_no_background}
                      //  onClick={handleClick} disabled={isDisabled}
            >
                <img src={close} alt="close" />
            </button>     
          </div>

          <div className={css.modal__content}>
            <ul className={css.entranceList}>

              {house.entrances.map((entrance, index) => (
                              <li
                                  key={entrance.id}
                                  className={selectedEntranceIndex === index? css.selected : null}
                                  onClick={() => handleEntranceClick(entrance.id,index)}
                              >
                                  {entrance.name}
                              </li>
              ))}
            </ul>
          
          </div>
      </div>

      <AddFlatModal
        isOpen={isModalAddFlatOpen} 
        onClose={closeAddFlatModal}
        onAddFlats={handleAddFlats}
        house={ house }
        selectedEntrance={selectedEntrance}
        >
      </AddFlatModal>
    </>
  );
};

AddEntranceModal.propTypes = addEntranceModalPropTypes;

export default AddEntranceModal;