import { useState } from 'react';
import Skeleton from './Skeleton';
import styles from './SkeletonImage.module.css';

export default function SkeletonImage({ src, alt, className = '', style = {} }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`${styles.wrapper} ${className}`} style={style}>
      {!loaded && <Skeleton borderRadius="inherit" />}
      <img
        src={src}
        alt={alt}
        className={`${styles.img} ${loaded ? styles.imgLoaded : ''}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
}
