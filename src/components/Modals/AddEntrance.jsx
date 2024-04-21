import css from './Modals.module.scss'; // Подключение файла стилей (замените на ваш путь)
import '../../styles/_base.scss';
import close from '../../assets/close-icon.svg';
import  { useState } from 'react';
import AddFlatModal from './AddFlat';
// import { houses } from '../../mock';
import {addEntranceModalPropTypes} from '../../propTypes';

const AddEntranceModal = (
    { isOpen, onClose, house, onAddEntrance }
) => {
    
  //   const [entranceNumber, setEntranceNumber] = useState('');
  const [selectedEntrance, setSelectedEntrance] = useState(null);
  const [isModalAddFlatOpen, setIsModalAddFlatOpen] = useState(false);//открытие модального окна с квартирами

  const handleEntranceClick = (entrance) => {
    setSelectedEntrance(entrance);
    setIsModalAddFlatOpen(true);
  };

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

              {house.entrances.map((entrance) => (
                              <li
                                  key={entrance.id}
                                  className={selectedEntrance === entrance.id? css.selected : null}
                                  onClick={() => handleEntranceClick(entrance.id)}
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