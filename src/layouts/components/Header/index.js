import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   // faSignIn,
   faEllipsisVertical,
   faLanguage,
   faCircleQuestion,
   faKeyboard,
   faUser,
   faCoins,
   faSignOut,
   faGear,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { MessageIcon, UploadIcon, NotificationIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import config from '~/config';

const cx = classNames.bind(styles);
const currentUser = true;

const MENU_ITEMS = [
   {
      icon: <FontAwesomeIcon icon={faLanguage} />,
      title: 'English',
      children: {
         title: 'Language',
         data: [
            {
               title: 'English',
               code: 'en',
               type: 'English',
            },
            {
               title: 'Tieng Viet',
               code: 'vi',
               type: 'Tieng Viet',
            },
         ],
      },
   },
   {
      icon: <FontAwesomeIcon icon={faCircleQuestion} />,
      title: 'Feedback and help',
      to: 'help',
   },
   {
      icon: <FontAwesomeIcon icon={faKeyboard} />,
      title: 'Keyboard shortcuts',
   },
];

function Header() {
   // Handle logic
   const handleMenuChange = (menuItem) => {
      // switch (menuItem.type) {
      //    case 'Language':
      //    //
      //    default:
      //    //
      // }
   };

   const userMenu = [
      {
         icon: <FontAwesomeIcon icon={faUser} />,
         title: 'View profile',
         to: '/@hoaa',
      },
      {
         icon: <FontAwesomeIcon icon={faCoins} />,
         title: 'Get coins',
         to: '/coin',
      },
      {
         icon: <FontAwesomeIcon icon={faGear} />,
         title: 'Settings',
         to: '/setTing',
      },
      ...MENU_ITEMS,
      {
         icon: <FontAwesomeIcon icon={faSignOut} />,
         title: 'Log out',
         to: '/setTing',
         separate: true,
      },
   ];

   return (
      <header className={cx('wrapper')}>
         <div className={cx('inner')}>
            <Link to={config.routes.home} className={cx('logo')}>
               <img src={images.logo} alt="TikTok" />
            </Link>

            <Search />

            <div className={cx('actions')}>
               {currentUser ? (
                  <>
                     <Tippy delay={[0, 200]} content="Upload video" placement="bottom">
                        <button className={cx('action-btn')}>
                           <UploadIcon />
                        </button>
                     </Tippy>

                     <Tippy content="Tin Nhan" placement="bottom">
                        <button className={cx('action-btn')}>
                           <MessageIcon />
                        </button>
                     </Tippy>

                     <Tippy content="Thong bao" placement="bottom">
                        <button className={cx('action-btn')}>
                           <NotificationIcon />
                        </button>
                     </Tippy>
                  </>
               ) : (
                  <>
                     <Button text onClick={() => alert('khong vao duoc dau')}>
                        Upload
                     </Button>
                     <Button
                        primary
                        /*leftIcon={<FontAwesomeIcon icon={faSignIn} />}*/ onClick={() => alert('khong vao duoc dau')}
                     >
                        Log In
                     </Button>
                  </>
               )}

               <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                  {currentUser ? (
                     <Image
                        className={cx('user-avatar')}
                        src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/11aef20fac63cc2103383df9be594c39~c5_100x100.jpeg?x-expires=1673146800&x-signature=k%2B8tEkCXJyMqJbrRwugxBGjO4e0%3D"
                        alt="Nguyen Van A"
                     />
                  ) : (
                     <button className={cx('more-btn')}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                     </button>
                  )}
               </Menu>
            </div>
         </div>
      </header>
   );
}

export default Header;
