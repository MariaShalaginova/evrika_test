import Button from '../Button/Button';
import css from './House.module.scss';
import trash from '../../assets/trash-icon.svg';
import add from '../../assets/add-icon.svg';
import { useState } from 'react';
import AddEntranceModal from '../Modals/AddEntrance';
import PropTypes from 'prop-types';

function House({ house }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEntrances, setSelectedEntrances] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
   
    const handleAddEntrance = (entranceId, selectedFlats) => {
        const entrance = house.entrances.find((ent) => ent.id === entranceId);
        const updatedEntrance = { ...entrance, flats: selectedFlats };
        setSelectedEntrances([...selectedEntrances, updatedEntrance]);
        closeModal();
    };
    const handleAddButtonClick = () => {
        openModal();
    };
    console.log(selectedEntrances)
//    const handleAddEntrance = (entrance) => {
//         setEntrances([...entrances, entrance]);
//         closeModal();
//         //onAddEntrance(entrances); // Обновление списка домов после добавления подъезда
//     };
    return (
        <>
            <div className={css.item}>

                <div className={css.item__name}>
                    <p>{house.address}</p>

                    <div className={css.item__buttons}>
                        <Button className={css.item__button}>
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
                                    {entrance.flats && entrance.flats.map((flat, index) => (
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
    house: PropTypes.shape({
        address: PropTypes.string.isRequired,
        entrances: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                flats: PropTypes.arrayOf(
                    PropTypes.shape({
                        number: PropTypes.number.isRequired
                    })
                ).isRequired
            })
        ).isRequired
    }),
};
export default House;
