import Button from '../Button/Button';
import css from './House.module.scss';
import trash from '../../assets/trash-icon.svg';
import add from '../../assets/add-icon.svg';
import { useEffect, useRef, useState } from 'react';
import AddEntranceModal from '../Modals/AddEntrance';
import { housePropTypes } from '../../propTypes';

function House({ house }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEntrances, setSelectedEntrances] = useState([]);
    const [activeHouseIndex, setActiveHouseIndex] = useState(null); 
    const houseRef=useRef();
    const entranceRef = useRef(null);
   
    useEffect(() => {
        // Получаем идентификатор текущего дома
        const houseId = house.id;
        // Формируем ключ для хранения данных в локальном хранилище
        const storageKey = `selectedEntrances_${houseId}`;
        // Проверяем, есть ли сохраненные данные для текущего дома в локальном хранилище
        const savedEntrances = JSON.parse(sessionStorage.getItem(storageKey));
        if (savedEntrances) {
            setSelectedEntrances(savedEntrances);
            console.log(selectedEntrances);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [house]);
   
    // console.log (sessionStorage.getItem('selectedEntrances'))
    useEffect(() => {
        const targetNode = houseRef.current;
        const handleKeyDown = (event) => {
           if (event.key === 'Escape' && isModalOpen) {
                closeModal();
            } else if (event.key === 'Delete') {
                handleDeleteEntrance();
            }
        };

        targetNode && targetNode.addEventListener("keydown", handleKeyDown);

        return () => {
            targetNode && targetNode.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen, activeHouseIndex]);

    const openModal = (index) => {
        setIsModalOpen(true);
        setActiveHouseIndex(index);
        entranceRef.current.focus();
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleAddEntrance = (selectedData) => {
        // Проверяем, является ли selectedData объектом
        if (typeof selectedData === 'object' && selectedData !== null) {
            // Преобразовать selectedData в массив объектов перед передачей в House
            const selectedEntrancesArray = Object.keys(selectedData).map((key) => ({
                [key]: selectedData[key]
            }));

            // Объединяем новые данные с предыдущими
             const updatedEntrances = mergeEntrancesArrays([selectedEntrances, selectedEntrancesArray]);

             setSelectedEntrances(updatedEntrances);
            //  console.log(updatedEntrances)
            
             // При обновлении данных сохраняем их в локальное хранилище
             sessionStorage.setItem('selectedEntrances', JSON.stringify(updatedEntrances));

            // Закрываем модальное окно
            closeModal();
        } else {
            console.error('Ошибка: selectedData должен быть объектом.');
        }
    };

    //проверка на повторяющиеся номера квартир в подъезде
    const mergeEntrancesArrays =(arrays) =>{
        // Создаем пустой объект для хранения данных о квартирах в подъездах
        const mergedEntrances = {};

        arrays.forEach(array => {
            // Проходимся по каждому объекту в массиве
            array.forEach(obj => {
                // Получаем ключ (номер подъезда) и значение (массив квартир)
                const key = Object.keys(obj)[0];
                const value = obj[key];
    
                // Если подъезд уже есть в объединенном объекте, добавляем квартиры к существующему массиву
                if (Object.prototype.hasOwnProperty.call(mergedEntrances, key)) {
                    mergedEntrances[key] = [...new Set([...mergedEntrances[key], ...value])]; // Используем Set для удаления дубликатов
                } else {
                    // Если подъезда еще нет, создаем новую запись
                    mergedEntrances[key] = value;
                }
            });
        });
    
        // Преобразуем объект обратно в массив объектов
        const result = Object.entries(mergedEntrances).map(([key, value]) => ({ [key]: value }));
    
        return result;
    }

    const handleAddButtonClick = (index) => { 
        openModal(index);
    };

    const handleDeleteEntrance = () => {
        setSelectedEntrances([]);
    };

    return (
        <>
            <div className={css.item} ref={houseRef}>

                <div className={css.item__name}>
                    <p>{house.address}</p>

                    <div className={css.item__buttons}>
                        <Button  
                            onClick={() => handleDeleteEntrance()} 
                            className={css.item__button} 
                            onKeyDown={(event) => {
                                    if (event.key === 'Enter' ) {
                                        handleDeleteEntrance();
                                    }
                                }}
                                >
                                <img src={trash} alt="trash" />
                        </Button>
                        <Button
                            onClick={handleAddButtonClick} 
                            className={css.button}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    openModal();
                                }
                            }} >
                            <img src={add} alt="add" />
                        </Button>
                    </div>
                </div>

                <div className={css.item__list}>
                    <div className={css.block}>
                        <div className={css.row}>
                            <div className={css.cell}>
                                <p>Номер подъезда</p>
                            </div>  
                            <div className={css.cell}>
                                <p>Номер квартиры</p>
                            </div>
                        </div>

                        {selectedEntrances.map((entrance) => (
                            <div key={Object.keys(entrance)[0]} className={css.row}>
                                <div className={css.cell}>
                                    Подъезд {Object.keys(entrance)[0]}
                                </div>
                                <div className={css.cell}>
                                    {entrance[Object.keys(entrance)[0]].sort((a, b) => a - b).map((flat, index, array) => (
                                        <span key={flat}>{flat}{index !== array.length - 1 ? ', ' : ''}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
  
                    </div>    
                    
                </div>
            </div>
            <AddEntranceModal
                isOpen={isModalOpen}
                onClose={closeModal} 
                onAddEntrance={handleAddEntrance}
                house={ house }
                ref={entranceRef}
                >
            </AddEntranceModal>
        </>
    );
}

House.propTypes = {
    house: housePropTypes
};

export default House;
