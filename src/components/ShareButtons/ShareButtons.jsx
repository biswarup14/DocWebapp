import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from 'react-share';
import styles from './ShareButtons.module.css';

export default function ShareButtons({ url, title }) {
  return (
    <div className={styles.shareButtons}>
      <span className={styles.shareLabel}>Share:</span>
      <FacebookShareButton url={url} title={title} className={styles.shareBtn}>
        FB
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title} className={styles.shareBtn}>
        X
      </TwitterShareButton>
      <WhatsappShareButton url={url} title={title} className={styles.shareBtn}>
        WA
      </WhatsappShareButton>
      <EmailShareButton url={url} subject={title} className={styles.shareBtn}>
        Email
      </EmailShareButton>
    </div>
  );
}
