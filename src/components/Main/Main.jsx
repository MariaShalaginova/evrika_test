import House from '../House/House';
import css from './Main.module.scss';
import { houses } from '../../mock';
function Main() {
  
    return (
      <div className={css.main}>
        <div className={css.main__container}>
          {houses.map((house) => (
            <House key={house.id} house={house} />
          ))}
        </div>
     </div>
  
    );
  }

  export default Main;
  