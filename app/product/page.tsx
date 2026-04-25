import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

const products = [
  {
    title: 'Thumbnail PSD Pack',
    type: 'PSD Pack',
    description: 'Master templates for stronger visual punch.',
    price: '$149',
    headerText: 'PSD PACK\nPro Templates',
    bgClass: 'pt1b',
  },
  {
    title: 'Prompt Pack',
    type: 'Prompt Collection',
    description: 'Engineered prompts for visual generation.',
    price: '$49',
    headerText: 'PROMPT PACK\nAI Ideation',
    bgClass: 'pt2b',
  },
  {
    title: 'Asset Pack',
    type: 'Asset Collection',
    description: 'Curated overlays for thumbnail workflows.',
    price: '$79',
    headerText: 'ASSET PACK\nOverlays + Textures',
    bgClass: 'pt3b',
  },
  {
    title: 'Ebook Pack',
    type: 'Ebook',
    description: 'Framework-driven packaging principles.',
    price: '₹249',
    headerText: 'EBOOK PACK\nClick Psychology',
    bgClass: 'pt4b',
  },
];

export default function Product() {
  return (
    <>
      <Navbar activePage="skills" />
      <div className={styles.ph}>
        <div className={styles.lbl}>Digital Assets</div>
        <h1>
          The specialist's <em>toolkit</em>
        </h1>
        <p>PSD packs, ebooks, prompts, and assets distilled from real client work.</p>
      </div>
      <div className={styles.sec + ' ' + styles.noPadTop}>
        <div className={styles.g4 + ' ' + styles.marginBottom}>
          {products.map((product, idx) => (
            <div key={idx} className={styles.prcard}>
              <div className={styles.pth + ' ' + styles[product.bgClass]}>
                <div className={styles.scl}></div>
                <div className={styles.ptxt}>
                  <b>{product.headerText.split('\n')[0]}</b>
                  {product.headerText.split('\n')[1]}
                </div>
              </div>
              <div className={styles.pbody}>
                <div className={styles.ptype}>{product.type}</div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className={styles.ppr}>{product.price}</div>
                <div className={styles.pbtn}>Buy Now →</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.g3}>
          <div className={styles.card}>
            <div className={styles.ico}>⚡</div>
            <h3>Proven in production</h3>
            <p>
              Battle-tested on real client channels before being packaged.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.ico}>🎯</div>
            <h3>Immediately usable</h3>
            <p>
              Open, adapt to your channel, and apply the same day.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.ico}>📐</div>
            <h3>System thinking</h3>
            <p>
              They compound together into a full packaging workflow.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
