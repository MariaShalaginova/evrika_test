import css from './Modals.module.scss'; 
import '../../styles/_base.scss';
import close from '../../assets/close-icon.svg';
import Button from '../Button/Button';
import {addFlatModalPropTypes} from '../../propTypes';
import { useEffect,  useState, forwardRef, useImperativeHandle, useRef} from 'react';

const AddFlatModal = forwardRef((
    // eslint-disable-next-line no-unused-vars
    { isOpen, onClose, house, selectedEntrance, onAddFlats, entranceRef,setSelectedFlatsObject }, ref
) => {
    
    const [selectedFlats, setSelectedFlats] = useState({});
    const [selectedFlatIndex, setSelectedFlatIndex] = useState(0);
    const flatRef = useRef(null);

    // useEffect(() => {
    //     // Проверяем, есть ли сохраненные данные для текущего дома в локальном хранилище
    //     const savedEntrances = JSON.parse(sessionStorage.getItem('selectedEntrances'));
    //     // Проверяем, что данные успешно получены
    //     if (savedEntrances) {
    //         setSelectedFlats(savedEntrances);
    //         console.log(savedEntrances);
    //     } else {
    //         // Если данные не найдены 
    //         console.error('Данные не найдены в хранилище');
    //     }
    // }, [house, selectedEntrance]);
 
    useEffect(() => {
        setSelectedFlatsObject(selectedFlats); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFlats]);

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

    useEffect(() => {
        const targetNode = flatRef.current;
        const handleKeyDown = (event) => {
            const flats = targetNode.querySelectorAll('li');
            const flatId = Number(event.target.dataset.flatId); 
           
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                setSelectedFlatIndex((prevIndex) => (prevIndex + 1) % flats.length);
                flats[selectedFlatIndex].focus();

            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setSelectedFlatIndex((prevIndex) => (prevIndex - 1 + flats.length) % flats.length);
                flats[selectedFlatIndex].focus();

            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                // console.log('vlevo')
                focusEntranceModal();
    
            }    else if (event.key === 'Enter' && event.ctrlKey) {
                event.preventDefault();
                handleAddButtonClick()

            }  else if (event.key === 'Enter') {
                event.preventDefault();
                // console.log(flatId);
                handleFlatClick(flatId);
            }
        };
    
        if (isOpen && targetNode) {
            targetNode.addEventListener('keydown', handleKeyDown);
        }
    
        return () => {
            if (targetNode) {
                targetNode.removeEventListener('keydown', handleKeyDown);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, selectedFlats, selectedFlatIndex]);
    
    useImperativeHandle(ref, () => ({
        focus: () => {
            setTimeout(() => {
                if (flatRef.current) {
                    const focusItem = flatRef.current.querySelector('li');
                    if (focusItem) {
                        focusItem.focus();
                    }
                }
            }, 0);
        }
    }));

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

    const focusEntranceModal = () => {
        if (entranceRef.current) {
            entranceRef.current.focus();
        }
      };
  
    const getFlatClassName = (flat, selectedFlats, entranceId) => {
        if (!selectedFlats || !entranceId) return css.flat;
        // Проверяем, выбрана ли квартира для текущего подъезда
        const isSelected = selectedFlats[entranceId]?.includes(flat);
        // Возвращаем классы в зависимости от выбора квартиры
        return isSelected ? `${css.flat} ${css.selected}` : css.flat;
    };

  
    const closeAddFlatModal = () => {
        setSelectedFlats([]);
        setSelectedFlatIndex(0);
        onClose();
    };

    const handleAddButtonClick = () => {
        setSelectedFlatsObject(selectedFlats);
        onAddFlats(selectedFlats);
        closeAddFlatModal(); 
    };

    if (!isOpen || !house) return null;

    const selectedEntranceData = house.entrances.find((entrance) => entrance.id === selectedEntrance);
    const isAddButtonActive = Object.values(selectedFlats).flat().length > 0;

    return (

        <div className={`${css.modal} ${css.modal__flat}`} ref={flatRef} tabIndex="0">
            <div className={css.modal__name}>
            <p>Номер квартиры</p>
            <button onClick={closeAddFlatModal} className={css.button_no_background}>
                <img src={close} alt="close" />
            </button>     
            </div>

            <div className={css.modal__content} ref={ref} >
            <ul className={css.entranceList} >
                {selectedEntranceData &&
                    selectedEntranceData.flats.map((flat) => (
                                    <li 
                                        key={flat.number}
                                        data-flat-id={flat.number}
                                        className={getFlatClassName(flat.number, selectedFlats, selectedEntrance)}
                                        onClick={() => handleFlatClick(flat.number)}
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
});

AddFlatModal.propTypes = addFlatModalPropTypes;
AddFlatModal.displayName = 'AddFlatModal';

export default AddFlatModal;