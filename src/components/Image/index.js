import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import classNames from 'classnames';
import images from '~/assets/images';
import styles from './Image.module.scss';

const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
   const [fallback, setFallback] = useState('');

   const handleError = () => {
      setFallback(customFallback);
   };

   return (
      <img
         className={classNames(styles.wrapper, className)}
         ref={ref}
         src={fallback || src}
         alt={alt}
         {...props}
         onError={handleError}
      />
   );
});

Image.propTypes = {
   src: PropTypes.string,
   alt: PropTypes.string,
   className: PropTypes.string,
   fallback: PropTypes.string,
};

export default Image;

// import classNames from 'classnames';
// import { useState, forwardRef } from 'react';
// import images from '~/assets/images';
// import styles from './Image.module.scss';

// function Image({ src, alt, className, fallback: customFallback = images.noImage, ...props }) {
//    const [fallback, setFallback] = useState('');
//    const handleError = () => {
//       setFallback(customFallback);
//    };
//    return (
//       <img
//          className={classNames(styles.wrapper, className)}
//          src={fallback || src}
//          alt={alt}
//          {...props}
//          onError={handleError}
//       />
//    );
// }

// export default forwardRef(Image);
