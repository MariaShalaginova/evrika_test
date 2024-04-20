import css from './Modals.module.scss'; 
import '../../styles/_base.scss';
import close from '../../assets/close-icon.svg';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const AddFlatModal = (
    { isOpen, onClose, house, selectedEntrance }
) => {

    const [selectedFlats, setSelectedFlats] = useState([]);

    useEffect(() => {
        setSelectedFlats([]); // Обнуляем выбранные квартиры при изменении выбранного подъезда
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

    console.log(selectedFlats);
    if (!isOpen || !house) return null;

    const selectedEntranceData = house.entrances.find((entrance) => entrance.id === selectedEntrance);

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
            {selectedEntranceData &&
                selectedEntranceData.flats.map((flat) => (
                                <li
                                    key={flat.number}
                                    className={selectedFlats.includes(flat.number) ? css.selected : null}
                                    onClick={() => handleFlatClick(flat.number)}
                                >
                                    Квартира {flat.number}
                                </li>
                            ))}
            </ul>
            <Button>Добавить</Button>
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
    selectedEntrance: PropTypes.number 
};

export default AddFlatModal;