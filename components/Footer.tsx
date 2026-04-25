import Image from 'next/image';
import emailIcon from '../icon/email.png';
import facebookIcon from '../icon/facebook.png';
import instagramIcon from '../icon/instagram.png';
import linkedinIcon from '../icon/linkedin.png';
import telegramIcon from '../icon/telegram.png';
import styles from './Footer.module.css';

const footerItems = [
  { label: 'Email', href: 'mailto:sumanta@example.com', icon: emailIcon },
  { label: 'Facebook', href: '#', icon: facebookIcon },
  { label: 'Instagram', href: '#', icon: instagramIcon },
  { label: 'LinkedIn', href: '#', icon: linkedinIcon },
  { label: 'Telegram', href: '#', icon: telegramIcon },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.items}>
        {footerItems.map((item) => (
          <a key={item.label} href={item.href} className={styles.item}>
            <Image src={item.icon} alt={item.label} className={styles.icon} />
          </a>
        ))}
      </div>
    </footer>
  );
}
