import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
// import axios from 'axios';

// import * as request from '~/utils/request';
import * as searchServices from '~/services_api/searchService';
import { useDebounce } from '~/hooks';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import SearchAccountItem from '~/components/SearchAccountItem';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
   const [searchValue, setSearchValue] = useState('');
   const [searchResult, setSearchResult] = useState([]);
   const [showResult, setShowResult] = useState(false);
   const [loading, setLoading] = useState(false);

   const debouncedValue = useDebounce(searchValue, 800);

   const inputRef = useRef();

   useEffect(() => {
      if (!debouncedValue.trim()) {
         setSearchResult([]);
         return;
      }

      const fetchApi = async () => {
         setLoading(true);

         const result = await searchServices.search(debouncedValue);
         setSearchResult(result);

         setLoading(false);
      };
      fetchApi();

      // const fetchApi = async () => {
      //    try {
      //       const res = await request.get('users/search', {
      //          params: {
      //             q: debouncedValue,
      //             type: `less`,
      //          },
      //       });
      //       setSearchResult(res.data);
      //       setLoading(false);
      //    } catch (error) {
      //       setLoading(false);
      //    }
      // };
      // fetchApi();

      // ?q=${encodeURIComponent(debouncedValue)}&type=less`
      // request
      //    .get('users/search', {
      //       params: {
      //          q: debouncedValue,
      //          type: `less`,
      //       },
      //    })
      //    // .then((res) => res.json())
      //    .then((res) => {
      //       setSearchResult(res.data);
      //       setLoading(false);
      //    })
      //    .catch(() => {
      //       setLoading(false);
      //    });
   }, [debouncedValue]);

   const handleHideResult = () => {
      setShowResult(false);
   };

   const handleChange = (e) => {
      const searchValue = e.target.value;
      if (!searchValue.startsWith(' ')) {
         setSearchValue(searchValue);
      }
   };
   return (
      //Wraning: Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
      <div>
         <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
               <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                  <PopperWrapper>
                     <h4 className={cx('search-title')}>Accounts</h4>
                     {searchResult.map((result) => (
                        <SearchAccountItem key={result.id} data={result} />
                     ))}
                  </PopperWrapper>
               </div>
            )}
            onClickOutside={handleHideResult}
         >
            <div className={cx('search')}>
               <input
                  ref={inputRef}
                  value={searchValue}
                  placeholder="Search accounts and videos"
                  spellCheck={false}
                  onChange={handleChange}
                  onFocus={() => setShowResult(true)}
               />
               {!!searchValue && !loading && (
                  <button
                     className={cx('clear')}
                     onClick={() => {
                        setSearchValue('');
                        setSearchResult([]);
                        inputRef.current.focus();
                     }}
                  >
                     <FontAwesomeIcon icon={faCircleXmark} />
                  </button>
               )}
               {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

               <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
               </button>
            </div>
         </HeadlessTippy>
      </div>
   );
}

export default Search;
