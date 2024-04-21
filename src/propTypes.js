import PropTypes from 'prop-types';

export const housePropTypes = PropTypes.shape({
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
});

export const addEntranceModalPropTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    house: housePropTypes.isRequired,
    onAddEntrance: PropTypes.func.isRequired
};

export const addFlatModalPropTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    house: housePropTypes.isRequired,
    selectedEntrance: PropTypes.number,
    onAddFlats: PropTypes.func.isRequired
};
