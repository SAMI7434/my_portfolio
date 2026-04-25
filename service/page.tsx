import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

const clients = [
  { name: 'Traya Health', initial: 'T', description: 'Full packaging overhaul for the hair health series.' },
  { name: 'Agritalk', initial: 'A', description: 'Income-driven thumbnails for rural audiences.' },
  { name: 'Her Health Podcast', initial: 'H', description: 'Podcast warmth meets YouTube click psychology.' },
  { name: 'Visionary Indians', initial: 'V', description: 'Packaging for entrepreneurship content.' },
];

export default function Service() {
  return (
    <>
      <Navbar activePage="about" />
      <div className={styles.ph}>
        <div className={styles.lbl}>Services</div>
        <h1>
          What I help creators <em>fix and scale</em>
        </h1>
        <p>
          Thumbnail design, packaging strategy, and click performance built
          around how viewers actually behave.
        </p>
      </div>
      <div className={styles.sec + ' ' + styles.noPadTop}>
        <div className={styles.sg + ' ' + styles.marginBottom}>
          <div className={styles.card}>
            <div className={styles.ico}>🎯</div>
            <h3>Thumbnail Design</h3>
            <p>
              Custom concepts to improve glance value, emotional contrast, and
              click intent.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.ico}>🧠</div>
            <h3>Packaging Strategy</h3>
            <p>
              Stronger title-thumbnail fit, sharper angle development, better
              packaging logic.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.ico}>📈</div>
            <h3>CTR Analysis</h3>
            <p>
              Review of weak hooks, unclear visuals, and packaging decisions
              suppressing clicks.
            </p>
          </div>
        </div>

        <div className={styles.g2 + ' ' + styles.marginBottom}>
          <div className={styles.card}>
            <h3>Best fit for</h3>
            <ul className={styles.ul}>
              <li>YouTube creators wanting better packaging</li>
              <li>Brands building a premium visual system</li>
              <li>Podcast channels needing episode packaging</li>
              <li>Expert-led channels needing trust + curiosity</li>
            </ul>
          </div>
          <div className={styles.card}>
            <h3>What the work includes</h3>
            <ul className={styles.ul}>
              <li>Angle exploration</li>
              <li>Thumbnail text direction</li>
              <li>Subject and prop hierarchy</li>
              <li>Visual contrast decisions</li>
              <li>Brand tone matching</li>
            </ul>
          </div>
        </div>

        <div className={styles.lbl + ' ' + styles.marginBottom}>Past clients</div>
        <div className={styles.cg}>
          {clients.map((client, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.ci}>
                <div className={styles.cic}>{client.initial}</div>
                <div>
                  <h4>{client.name}</h4>
                  <p>{client.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
