import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './SearchAccountItem.module.scss';

const cx = classNames.bind(styles);

function SearchAccountItem() {
   return (
      <div className={cx('wrapper')}>
         <Image
            className={cx('avatar')}
            src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/b9055470021d1d6d0af5a4224ca8fde3~c5_100x100.jpeg?x-expires=1672801200&x-signature=DczemHCjUgpenGzcFaTHHxxsLFU%3D"
            alt="Hoa"
         />
         <div className={cx('info')}>
            <h4 className={cx('name')}>
               <span>Nguyen Van A</span>
               <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
            </h4>
            <span className={cx('userName')}>Nguyen Van A</span>
         </div>
      </div>
   );
}

export default SearchAccountItem;
