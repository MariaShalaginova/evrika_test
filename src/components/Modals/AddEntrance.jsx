import css from './Modals.module.scss'; // Подключение файла стилей (замените на ваш путь)
import '../../styles/_base.scss';
import close from '../../assets/close-icon.svg';
import  { useState } from 'react';
import AddFlatModal from './AddFlat';
// import { houses } from '../../mock';
import PropTypes from 'prop-types';
const AddEntranceModal = (
    { isOpen, onClose, onAddEntrance, house }
) => {
    
//   const [entranceNumber, setEntranceNumber] = useState('');
const [selectedEntrance, setSelectedEntrance] = useState(null);
const [isModalAddFlatOpen, setIsModalAddFlatOpen] = useState(false);//открытие модального окна с квартирами
//   const handleEntranceNumberChange = (e) => {
//     setEntranceNumber(e.target.value);
//   };
const handleEntranceClick = (entrance) => {
  setSelectedEntrance(entrance);
  // Открыть другое модальное окно или выполнить другие действия при нажатии на подъезд
  // Например: setOpenApartmentModal(true);
  setIsModalAddFlatOpen(true);
};


const closeAddFlatModal = () => {
  setIsModalAddFlatOpen(false);
};

if (!isOpen) return null;
//     // Вызываем функцию для добавления подъезда и закрываем модальное окно
//     onAddEntrance(entranceNumber);
//     onClose();
//   };

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

      <AddFlatModal isOpen={isModalAddFlatOpen} onClose={closeAddFlatModal} house={ house } selectedEntrance={selectedEntrance}>

      </AddFlatModal>
    </>
  );
};

AddEntranceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Флаг открытия модального окна
  onClose: PropTypes.func.isRequired, // Функция закрытия модального окна
  onAddEntrance: PropTypes.func.isRequired, // Функция добавления подъезда
  house: PropTypes.shape({
    entrances: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired // Дом, содержащий информацию о подъездах
};

export default AddEntranceModal;