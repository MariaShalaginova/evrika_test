import css from './Modals.module.scss'; // Подключение файла стилей (замените на ваш путь)
import '../../styles/_base.scss';
import close from '../../assets/close-icon.svg';
import  { useEffect, useImperativeHandle, forwardRef, useState } from 'react';
import AddFlatModal from './AddFlat';
// import { houses } from '../../mock';
import {addEntranceModalPropTypes} from '../../propTypes';

const AddEntranceModal = forwardRef ((
    { isOpen, onClose, house, onAddEntrance }, ref
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
        setSelectedEntrance(selectedEntranceIndex+1);
        console.log(selectedEntranceIndex);
        console.log(selectedEntrance)

      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedEntranceIndex((prevIndex) => (prevIndex - 1 + house.entrances.length) % house.entrances.length);
        setSelectedEntrance(selectedEntranceIndex+1);
        console.log(selectedEntranceIndex)
        console.log(selectedEntrance)
      } else if (event.key === 'Enter') {
        if (!selectedEntrance) {
          setIsModalAddFlatOpen(false);
        } else {
          handleEntranceClick(selectedEntrance, selectedEntranceIndex);
        } 
      } else if (event.key === 'Escape') {
        closeAddFlatModal();
        setSelectedEntrance(null); // Сброс выбранного подъезда при нажатии Esc
        setSelectedEntranceIndex(0); // Сброс индекса при нажатии Esc
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [house.entrances.length, selectedEntrance]);

  // Функция для установки фокуса на модальное окно подъезда
  useImperativeHandle(ref, () => ({
    focus: () => {
        // Установка фокуса на модальное окно подъезда
        // Например, можно установить фокус на кнопку закрытия окна
        const closeButton = document.querySelector('.modal__name button');
        if (closeButton) {
            closeButton.focus();
        }
    }
  }));

  const handleEntranceClick = (entranceId, index) => {
    setSelectedEntrance(entranceId);
   
    setSelectedEntranceIndex(index)
    setIsModalAddFlatOpen(true);
    console.log(selectedEntrance);
    console.log(selectedEntranceIndex);
  };
  // console.log(selectedEntrance)
  const closeAddFlatModal = () => {
    setIsModalAddFlatOpen(false);
    // selectedEntrance(null);
    // setSelectedEntranceIndex(null);
  };
  // const handleAddFlats = (entranceId, selectedFlats) => {
  //   onAddEntrance(entranceId, selectedFlats);
  //   setIsModalAddFlatOpen(false);
  // };
  const handleAddFlats = (selectedData) => {
    console.log(selectedData);
    onAddEntrance(selectedData);
    setIsModalAddFlatOpen(false);
  };
//   const handleAddFlats = (selectedData) => {
//     const updatedHouse = {
//         ...house,
//         entrances: house.entrances.map(entrance => {
//             if (entrance.id === selectedData.entranceId) {
//                 return {
//                     ...entrance,
//                     flats: selectedData.flats
//                 };
//             }
//             return entrance;
//         })
//     };
//     onAddEntrance(updatedHouse);
//     setIsModalAddFlatOpen(false);
// };

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
                                  onClick={() => handleEntranceClick(entrance.id, index)}
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
});

AddEntranceModal.propTypes = addEntranceModalPropTypes;
AddEntranceModal.displayName = 'AddEntranceModal';

export default AddEntranceModal;