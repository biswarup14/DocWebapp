import styles from './SocialLinks.module.css';

const socials = [
  { href: 'https://facebook.com', label: 'Facebook', icon: 'f' },
  { href: 'https://instagram.com', label: 'Instagram', icon: 'ig' },
  { href: 'https://twitter.com', label: 'Twitter', icon: 'tw' },
];

export default function SocialLinks() {
  return (
    <div className={styles.socialLinks}>
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label={s.label}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
