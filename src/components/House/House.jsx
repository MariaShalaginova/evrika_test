import Button from '../Button/Button';
import css from './House.module.scss';
import trash from '../../assets/trash-icon.svg';
import add from '../../assets/add-icon.svg';
import { useEffect, useState } from 'react';
import AddEntranceModal from '../Modals/AddEntrance';
import { housePropTypes } from '../../propTypes';

function House({ house }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEntrances, setSelectedEntrances] = useState([]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter' && !isModalOpen) {
                openModal();
            } else if (e.key === 'Escape' && isModalOpen) {
                closeModal();
            } else if (e.key === 'Delete') {
                handleDeleteEntrance();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
   
    const handleAddEntrance = (entranceId, selectedFlats) => {
        
        const existingEntranceIndex = selectedEntrances.findIndex((ent) => ent.id === entranceId);
     
        if (existingEntranceIndex !== -1) {
            // Если подъезд уже выбран, обновляем список его квартир
            const updatedEntrances = [...selectedEntrances];
            const entranceToUpdate = updatedEntrances[existingEntranceIndex];
            // Фильтруем квартиры, чтобы исключить уже выбранные
            const filteredFlats = selectedFlats.filter((flat) => !entranceToUpdate.flats.includes(flat));
            const updatedFlats = [...entranceToUpdate.flats, ...filteredFlats];
            const updatedEntrance = { ...entranceToUpdate, flats: updatedFlats };
            updatedEntrances[existingEntranceIndex] = updatedEntrance;
    
            setSelectedEntrances(updatedEntrances);
        } else {
            const entrance = house.entrances.find((ent) => ent.id === entranceId);
            const updatedEntrance = { ...entrance, flats: selectedFlats };
            setSelectedEntrances([...selectedEntrances, updatedEntrance]);
        }
    
        closeModal();
    };
    const handleAddButtonClick = () => {
        openModal();
    };
    console.log(selectedEntrances)
    const handleDeleteEntrance = () => {
        setSelectedEntrances([]);
    };

    return (
        <>
            <div className={css.item}>

                <div className={css.item__name}>
                    <p>{house.address}</p>

                    <div className={css.item__buttons}>
                        <Button  onClick={() => handleDeleteEntrance()} className={css.item__button}>
                            <img src={trash} alt="trash" />
                        </Button>
                        <Button onClick={handleAddButtonClick} className={css.button}>
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
                        {/* <div className={css.row}> */}

                        {selectedEntrances.map((entrance) => (
                            <div key={entrance.id} className={css.row}>
                                <div className={css.cell}>
                                 Подъезд {entrance.number}
                                </div>
                                <div className={css.cell}>
                                    {entrance.flats && entrance.flats
                                        .sort((a, b) => a - b) // Сортируем квартиры по возрастанию
                                        .map((flat, index) => (
                                            <span key={flat}>{flat}{index !== entrance.flats.length - 1 ? ', ' : ''}</span>
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
                house={ house }>
                    
            </AddEntranceModal>
        </>
    );
}

House.propTypes = {
    house: housePropTypes
};

export default House;
