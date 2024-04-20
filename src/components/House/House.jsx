import Button from '../Button/Button';
import css from './House.module.scss';
import trash from '../../assets/trash-icon.svg';
import add from '../../assets/add-icon.svg';
import { useState } from 'react';
import AddEntranceModal from '../Modals/AddEntrance';
import PropTypes from 'prop-types';

function House({ house }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddButtonClick = () => {
        openModal();
    };

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


                        {house.entrances.map((entrance, index) => (
                            <div key={index} className={css.row}>
                                <div className={css.cell}>
                                    {entrance.number}
                                </div>
                                <div className={css.cell}>
                                    <ul>
                                        {entrance.flats.map((flat, index) => (
                                            <li key={index}>{flat.number}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}




                            {/* <div className={css.cell}>  
                                <ul>
                                    {house.entrances.map((entrance, index) => (
                                        <li key={index}>{entrance.number}</li>
                                    ))}
                                </ul>
                            </div> */}
                            {/* <div className={css.cell}>
                                <p>Номер квартиры</p>
                            </div> */}
                            {/* <div className={css.cell}>    
                                <ul>
                                    {house.entrances.map((entrance) => (
                                        entrance.flats.map((flat, index) => (
                                            <li key={index}>{flat.number}</li>
                                        ))
                                    ))}
                                </ul>
                            </div> */}
                        </div>    
                    {/* </div> */}
                </div>
            </div>
            <AddEntranceModal isOpen={isModalOpen} onClose={closeModal}>
                    
            </AddEntranceModal>
        </>
    );
}

House.propTypes = {
    house: PropTypes.shape({
        address: PropTypes.string.isRequired,
        entrances: PropTypes.arrayOf(PropTypes.shape({
            number: PropTypes.number.isRequired,
            flats: PropTypes.arrayOf(PropTypes.shape({
                number: PropTypes.number.isRequired
            })).isRequired
        })).isRequired
    }).isRequired
};

export default House;
