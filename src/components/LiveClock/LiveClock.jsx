import { useState, useEffect, useRef } from 'react';
import styles from './LiveClock.module.css';

export default function LiveClock() {
  const [display, setDisplay] = useState(() =>
    new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
  );
  const rafRef = useRef(null);
  const lastSecondRef = useRef(new Date().getSeconds());

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const currentSecond = now.getSeconds();
      if (currentSecond !== lastSecondRef.current) {
        lastSecondRef.current = currentSecond;
        setDisplay(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <span className={styles.clock}>
      {display}
    </span>
  );
}
