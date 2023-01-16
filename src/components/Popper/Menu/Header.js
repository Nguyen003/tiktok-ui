import PropTypes from 'prop-types';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Header({ title, onBack }) {
   return (
      <header className={cx('header')}>
         <button className={cx('back-btn')} onClick={onBack}>
            <FontAwesomeIcon icon={faChevronLeft} />
         </button>
         <h4 className={cx('hearder-title')}>{title}</h4>
      </header>
   );
}

Header.protoTypes = {
   title: PropTypes.string.isRequired,
   onBack: PropTypes.func.isRequired,
};

export default Header;
