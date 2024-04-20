import css from './Button.module.scss'; // Подключение файла стилей (замените на ваш путь)

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

export default Button;