import css from './Button.module.scss';
import PropTypes from 'prop-types' // Подключение файла стилей (замените на ваш путь)

const Button = ({  onClick, disabled, children  }) => {
  return (
    <button 
      className={css.button} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired
};

export default Button;