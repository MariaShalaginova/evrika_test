import css from './Modals.module.scss'; 
import '../../styles/_base.scss';
import close from '../../assets/close-icon.svg';
import  { useEffect, useImperativeHandle, forwardRef, useState, useRef } from 'react';
import AddFlatModal from './AddFlat';
import {addEntranceModalPropTypes} from '../../propTypes';

const AddEntranceModal = forwardRef ((
   { isOpen, onClose, house, onAddEntrance }, ref
  ) => {
  
  const [selectedEntrance, setSelectedEntrance] = useState(0);
  const [isModalAddFlatOpen, setIsModalAddFlatOpen] = useState(false);//открытие модального окна с квартирами
  const [selectedFlatsObject, setSelectedFlatsObject]= useState({});
  const [selectedEntranceIndex, setSelectedEntranceIndex] = useState(0);
  const flatModalRef = useRef(null);
  const entranceRef = useRef(null);

  useEffect(() => {
    setSelectedFlatsObject(selectedFlatsObject);
  }, [selectedFlatsObject]);

  useEffect(() => {
    const targetNode = entranceRef.current;
    const handleKeyDown = (event) => {
      const focusItem = document.activeElement;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const nextItem = focusItem.nextElementSibling;
        if (nextItem) {
          nextItem.focus();
          setSelectedEntranceIndex((prevIndex) => (prevIndex + 1) % house.entrances.length);
          handleEntranceClick(house.entrances[(selectedEntranceIndex + 1) % house.entrances.length].id, (selectedEntranceIndex + 1) % house.entrances.length);
        }
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        const previousItem = focusItem.previousElementSibling;
        if (previousItem) {
          previousItem.focus();
          setSelectedEntranceIndex((prevIndex) => (prevIndex - 1 + house.entrances.length) % house.entrances.length);
          handleEntranceClick(house.entrances[(selectedEntranceIndex - 1 + house.entrances.length) % house.entrances.length].id, (selectedEntranceIndex - 1 + house.entrances.length) % house.entrances.length);
        }
      } else if (event.key === 'Escape') {
        closeAddFlatModal();
        setSelectedEntrance(null); 
        setSelectedEntranceIndex(0); 
      } else if (event.key === 'ArrowRight' || event.key === 'Enter') {
        event.preventDefault();
        // setIsModalAddFlatOpen(true);
        focusAddFlatdModal();
      }  if (event.key === 'Enter' && event.ctrlKey) {
        console.log('vvod')
        event.preventDefault();
        console.log(selectedFlatsObject);
        handleAddFlats(selectedFlatsObject);
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
  }, [isOpen,house.entrances.length, selectedEntrance]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        setTimeout(() => {
          const focusItems = entranceRef.current.querySelectorAll('li');
          if (focusItems.length > selectedEntranceIndex) {
            const focusItem = focusItems[selectedEntranceIndex];
            focusItem.focus();
          }
        }, 0);
      }
    }));

    const focusAddFlatdModal = () => {
      if (flatModalRef.current) {
        flatModalRef.current.focus();
      }
    };

    const handleEntranceClick = (entranceId, index) => {
      setSelectedEntrance(entranceId);
      setSelectedEntranceIndex(index)
      setIsModalAddFlatOpen(true);
      // console.log(selectedEntrance);
      // console.log(selectedEntranceIndex);
    };
  
    const closeAddFlatModal = () => {
      setIsModalAddFlatOpen(false);
    };

    const handleAddFlats = (selectedData) => {
      console.log(selectedData);
      onAddEntrance(selectedData);
      setIsModalAddFlatOpen(false);
    };

    const onCloseModal = () => {
      onClose();
      setSelectedEntranceIndex(0); 
    }; 

  if (!isOpen) return null;

  return (
    <>
      <div className={css.modal} ref={entranceRef}>
        <div className={css.modal__name}>
            <p>Номер подъезда</p>
            <button onClick={onCloseModal} className={css.button_no_background}>
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
                                  tabIndex="0"
                                  ref={index === selectedEntranceIndex ? entranceRef : null}
                              >
                                  {entrance.name}
                              </li>
              ))}
            </ul>
          
          </div>
      </div>

      {isModalAddFlatOpen &&
        <AddFlatModal
          isOpen={isModalAddFlatOpen} 
          onClose={closeAddFlatModal}
          onAddFlats={handleAddFlats}
          house={ house }
          selectedEntrance={selectedEntrance}
          ref={flatModalRef}
          entranceRef={entranceRef}
          setSelectedFlatsObject={setSelectedFlatsObject}
        >
        </AddFlatModal>}
    </>
  );
});

AddEntranceModal.propTypes = addEntranceModalPropTypes;
AddEntranceModal.displayName = 'AddEntranceModal';

export default AddEntranceModal;