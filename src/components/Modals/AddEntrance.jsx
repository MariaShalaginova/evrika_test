import css from './Modals.module.scss'; // Подключение файла стилей (замените на ваш путь)
import close from '../../assets/close-icon.svg';
import { useState } from 'react';
import AddFlatModal from './AddFlat';

const AddEntranceModal = (
    { isOpen, onClose, children }
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
if (!isOpen) return null;
//   const handleAddEntrance = () => {
//     // Проверки на валидность введенных данных
//     if (entranceNumber.trim() === '') {
//       alert('Введите номер подъезда');
//       return;
//     }
const closeAddFlatModal = () => {
  setIsModalAddFlatOpen(false);
};

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
              <li
                className={selectedEntrance === 1 ? css.selected : null}
                onClick={() => handleEntranceClick(1)}
              >
                Подъезд 1
              </li>
              <li
                className={selectedEntrance === 2 ? css.selected : null}
                onClick={() => handleEntranceClick(2)}
              >
                Подъезд 2
              </li>
            </ul>
          
          </div>
      </div>

      <AddFlatModal isOpen={isModalAddFlatOpen} onClose={closeAddFlatModal}>

      </AddFlatModal>
    </>
  );
};

export default AddEntranceModal;