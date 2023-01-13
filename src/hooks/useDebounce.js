// handle viec tim kiem nhung phan khong can thiet

import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
   const [debouncedvalue, setDebouncedvalue] = useState(value);
   useEffect(() => {
      const handle = setTimeout(() => setDebouncedvalue(value), delay);

      return () => clearTimeout(handle);
      // eslint-disable-next-line
   }, [value]);

   return debouncedvalue;
}

export default useDebounce;
