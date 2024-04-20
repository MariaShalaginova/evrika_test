import css from './Modals.module.scss'; // Подключение файла стилей (замените на ваш путь)
import close from '../../assets/close-icon.svg';
import Button from '../Button/Button';

const AddFlatModal = (
    { isOpen, onClose, children }
) => {
    if (!isOpen) return null;
//   const [entranceNumber, setEntranceNumber] = useState('');

//   const handleEntranceNumberChange = (e) => {
//     setEntranceNumber(e.target.value);
//   };

//   const handleAddEntrance = () => {
//     // Проверки на валидность введенных данных
//     if (entranceNumber.trim() === '') {
//       alert('Введите номер подъезда');
//       return;
//     }

//     // Вызываем функцию для добавления подъезда и закрываем модальное окно
//     onAddEntrance(entranceNumber);
//     onClose();
//   };

  return (
    // <div className={`modal ${isOpen ? 'open' : ''}`}>
    <div className={`${css.modal} ${css.modal__flat}`}>
       <div className={css.modal__name}>
          <p>Номер квартиры</p>
          <button onClick={onClose} className={css.button_no_background}
                    //  onClick={handleClick} disabled={isDisabled}
          >
              <img src={close} alt="close" />
          </button>     
        </div>

        <div className={css.modal__content}>
          <ul className={css.entranceList}>
            <li
              // className={selectedEntrance === 1 ? css.selected : null}
              // onClick={() => handleEntranceClick(1)}
            >
              Квартира 1
            </li>
            <li
              // className={selectedEntrance === 2 ? css.selected : null}
              // onClick={() => handleEntranceClick(2)}
            >
              Квартира 2
            </li>
          </ul>
          <Button>Добавить</Button>
        </div>
       
    </div>
  );
};

export default AddFlatModal;