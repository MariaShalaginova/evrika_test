import css from './Modals.module.scss'; 
import '../../styles/_base.scss';
import close from '../../assets/close-icon.svg';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const AddFlatModal = (
    { isOpen, onClose, house, selectedEntrance, onAddFlats }
) => {

    const [selectedFlats, setSelectedFlats] = useState([]);
    const [selectedFlatIndex, setSelectedFlatIndex] = useState(0);

    useEffect(() => {
        setSelectedFlats([]);
        setSelectedFlatIndex(0); // Обнуляем выбранные квартиры при изменении выбранного подъезда
    }, [selectedEntrance]);
    const handleFlatClick = (flat) => {
        if (selectedFlats.includes(flat)) {
            // Если квартира уже выбрана, убираем ее из выбранных
            setSelectedFlats(selectedFlats.filter((selectedFlat) => selectedFlat !== flat));
        } else {
            // Если квартира еще не выбрана, добавляем ее в выбранные
            setSelectedFlats([...selectedFlats, flat]);
        }
    
      };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setSelectedFlatIndex((prevIndex) => Math.min(prevIndex + 1, selectedFlats.length - 1));
        } else if (e.key === 'ArrowUp') {
            setSelectedFlatIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (e.key === 'Enter' && e.ctrlKey) {
            // Сохранение выбранных квартир в таблицу через Ctrl+Enter
            // Вызовите функцию, которая сохраняет выбранные квартиры
        }
    };

    const closeAddFlatModal = () => {
        setSelectedFlats([]);
        setSelectedFlatIndex(0);
        onClose();
    };

    const handleAddButtonClick = () => {
        // Добавить выбранные квартиры и подъезд в компонент дома
        onAddFlats(selectedEntrance, selectedFlats);
        // Закрыть модальное окно
        onClose();
    };

    if (!isOpen || !house) return null;

    const selectedEntranceData = house.entrances.find((entrance) => entrance.id === selectedEntrance);

    return (
        // <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className={`${css.modal} ${css.modal__flat}`} >
        <div className={css.modal__name}>
            <p>Номер квартиры</p>
            <button onClick={closeAddFlatModal} className={css.button_no_background}
                        //  onClick={handleClick} disabled={isDisabled}
            >
                <img src={close} alt="close" />
            </button>     
            </div>

            <div className={css.modal__content} tabIndex="0" onKeyDown={handleKeyDown}>
            <ul className={css.entranceList}>
            {selectedEntranceData &&
                selectedEntranceData.flats.map((flat) => (
                                <li
                                    key={flat.number}
                                    className={selectedFlats.includes(flat.number) ? css.selected : null}
                                    onClick={() => handleFlatClick(flat.number)}
                                    onKeyDown={handleKeyDown} tabIndex="0"
                                >
                                    Квартира {flat.number}
                                </li>
                            ))}
            </ul>
            <Button onClick={handleAddButtonClick}>Добавить</Button>
            </div>
        
        </div>
    );
};

AddFlatModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    house: PropTypes.shape({
        entrances: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                flats: PropTypes.arrayOf(
                    PropTypes.shape({
                        number: PropTypes.number.isRequired
                    })
                ).isRequired
            })
        ).isRequired
    }).isRequired,
    selectedEntrance: PropTypes.number,
    onAddFlats: PropTypes.func.isRequired 
};

export default AddFlatModal;