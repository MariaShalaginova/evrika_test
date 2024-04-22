import css from './Modals.module.scss'; 
import '../../styles/_base.scss';
import close from '../../assets/close-icon.svg';
import Button from '../Button/Button';
import {addFlatModalPropTypes} from '../../propTypes';
import { useEffect, useState } from 'react';

const AddFlatModal = (
    { isOpen, onClose, house, selectedEntrance, onAddFlats }
) => {

    const [selectedFlats, setSelectedFlats] = useState({});
    const [selectedFlatIndex, setSelectedFlatIndex] = useState(0);
 
    // useEffect(() => {
    //     // Проверяем, есть ли сохраненные данные для текущего дома в локальном хранилище
    //     const savedEntrances = JSON.parse(sessionStorage.getItem('selectedEntrances'));

    //     // Проверяем, что данные успешно получены
    //     if (savedEntrances) {
    //         setSelectedFlats(savedEntrances);
    //         console.log(savedEntrances);
    //     } else {
    //         // Если данные не найдены или не удалось их прочитать
    //         console.error('Данные не найдены в хранилище');
    //     }
    // }, [house, selectedEntrance]);
 

    useEffect(() => {
        // Обновляем selectedFlats при изменении выбранного подъезда
        setSelectedFlats(prevSelectedFlats => {
            const updatedSelectedFlats = {};
    
            // Проходим по всем выбранным подъездам и добавляем квартиры в общий список
            Object.keys(prevSelectedFlats).forEach(entranceId => {
                updatedSelectedFlats[entranceId] = prevSelectedFlats[entranceId];
            });
    
            return updatedSelectedFlats;
        });
    }, [selectedEntrance]);

    const handleFlatClick = (flat) => {
        setSelectedFlats(prevSelectedFlats => {
            const updatedSelectedFlats = { ...prevSelectedFlats };
    
            // Проверяем, есть ли уже выбранные квартиры для текущего подъезда
            if (updatedSelectedFlats[selectedEntrance]) {
                // Если есть, проверяем, выбрана ли уже эта квартира
                if (updatedSelectedFlats[selectedEntrance].includes(flat)) {
                    // Если выбрана, убираем ее из выбранных
                    updatedSelectedFlats[selectedEntrance] = updatedSelectedFlats[selectedEntrance].filter(selectedFlat => selectedFlat !== flat);
                } else {
                    // Если не выбрана, добавляем ее в выбранные
                    updatedSelectedFlats[selectedEntrance] = [...updatedSelectedFlats[selectedEntrance], flat];
                }
            } else {
                // Если для текущего подъезда еще нет выбранных квартир, создаем массив и добавляем в него текущую квартиру
                updatedSelectedFlats[selectedEntrance] = [flat];
            }
    
            return updatedSelectedFlats;
        });
    };

    const getFlatClassName = (flat, selectedFlats, entranceId) => {
        // Проверяем, что selectedFlats определен и не null
        if (!selectedFlats || !entranceId) return css.flat;
        // Проверяем, выбрана ли квартира для текущего подъезда
        const isSelected = selectedFlats[entranceId]?.includes(flat);
        // Возвращаем классы в зависимости от выбора квартиры
        return isSelected ? `${css.flat} ${css.selected}` : css.flat;
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setSelectedFlatIndex((prevIndex) => Math.min(prevIndex + 1, selectedFlats.length - 1));
        } else if (e.key === 'ArrowUp') {
            setSelectedFlatIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (e.key === 'Enter' && e.ctrlKey) {
            // Сохранение выбранных квартир в таблицу 
           
        }
    };

    const closeAddFlatModal = () => {
        setSelectedFlats([]);
        setSelectedFlatIndex(0);
        onClose();
    };

    const handleAddButtonClick = () => {
        onAddFlats(selectedFlats);
        // Закрыть модальное окно
        onClose();
    };

    if (!isOpen || !house) return null;

    const selectedEntranceData = house.entrances.find((entrance) => entrance.id === selectedEntrance);
    const isAddButtonActive = Object.values(selectedFlats).flat().length > 0;

    return (
        // <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className={`${css.modal} ${css.modal__flat}`} >
        <div className={css.modal__name}>
            <p>Номер квартиры</p>
            <button onClick={closeAddFlatModal} className={css.button_no_background}>
                <img src={close} alt="close" />
            </button>     
            </div>

            <div className={css.modal__content} tabIndex="0" onKeyDown={handleKeyDown}>
            <ul className={css.entranceList}>
                {selectedEntranceData &&
                    selectedEntranceData.flats.map((flat) => (
                                    <li
                                        key={flat.number}
                                        className={getFlatClassName(flat.number, selectedFlats, selectedEntrance)}
                                        onClick={() => handleFlatClick(flat.number)}
                                        onKeyDown={handleKeyDown} 
                                        tabIndex="0"
                                    >
                                        Квартира {flat.number}
                                    </li>
                    ))}
            </ul>
            <Button onClick={handleAddButtonClick}  disabled={!isAddButtonActive}>Добавить</Button>
            </div>
        
        </div>
    );
};

AddFlatModal.propTypes = addFlatModalPropTypes;

export default AddFlatModal;