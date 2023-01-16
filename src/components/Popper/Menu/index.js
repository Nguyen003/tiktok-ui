import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
   const [history, setHistory] = useState([{ data: items }]); //Menu dacap
   const current = history[history.length - 1]; //Menu dacap

   const renderItems = () => {
      return current.data.map((item, index) => {
         //Menu dacap
         const isParent = !!item.children; //Menu dacap
         return (
            <MenuItem
               key={index}
               data={item}
               onClick={() => {
                  //Menu dacap
                  if (isParent) {
                     //Menu dacap
                     setHistory((prev) => [...prev, item.children]); //Menu dacap
                  } else {
                     onChange(item);
                  }
               }}
            />
         );
      });
   };

   return (
      <Tippy
         interactive
         delay={[0, 800]}
         offset={[12, 8]}
         hideOnClick={hideOnClick}
         placement="bottom-end"
         render={(attrs) => (
            <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
               <PopperWrapper className={cx('menu-popper')}>
                  {history.length > 1 && ( //Menu dacap
                     <Header
                        title={current.title}
                        onBack={() => {
                           setHistory((prev) => prev.slice(0, prev.length - 1));
                        }}
                     />
                  )}
                  <div className={cx('menu-body')}>{renderItems()}</div>
               </PopperWrapper>
            </div>
         )}
         onHide={() => setHistory((prev) => prev.slice(0, 1))}
      >
         {children}
      </Tippy>
   );
}

Menu.porpTypes = {
   children: PropTypes.node.isRequired,
   items: PropTypes.array,
   hideOnClick: PropTypes.bool,
   onChange: PropTypes.func,
};

export default Menu;
