import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4';

export default function Home() {
  return (
    <>
      <Navbar activePage="home" />
      <div className={styles.hero}>
        <div className={styles.heroBackground}>
          <video
            className={styles.heroBackgroundVideo}
            src={HERO_VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.hi}>
            <div className={styles.holeWrap}>
              <div className={styles.holeCore} aria-hidden="true"></div>
              <h1 className={styles.holeTitle}>
                <span className={styles.buildingWord}>Building</span>
                <br />
                <em>Intelligent Web</em>
              </h1>
              <p className={styles.hsub + ' ' + styles.holeSub}>
                I build scalable ML-powered web apps, from clean frontend
                interfaces to production-ready backend integration.{' '}
                <b>Fast, reliable, and built for real users.</b>
              </p>
            </div>
            <div className={styles.hbtns}>
              <div className={styles.btnp}>Let's Build Together</div>
              <div className={styles.btno}>View Projects</div>
            </div>
            <div className={styles.ghostl}>
              <div className={styles.gl}>See ML projects →</div>
              <div className={styles.gl}>Explore web apps →</div>
              <div className={styles.gl}>Check tech stack →</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sec}>
        <div className={styles.lbl}>What I do</div>
        <div className={styles.sh}>

          AI-first capabilities. <em>Real-world outcomes.</em>
        </div>
        <div className={styles.g3 + ' ' + styles.marginTop}>
          <div className={styles.card}>
            <div className={styles.cnum}>01</div>
            <h3>AI Web Product Development</h3>
            <p>
              End-to-end web platforms designed for scale, from intuitive UI to
              robust backend systems and clean architecture.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cnum}>02</div>
            <h3>Machine Learning Integration</h3>
            <p>
              Practical ML features including prediction, recommendation, and
              intelligent automation embedded directly into product workflows.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cnum}>03</div>
            <h3>MLOps and Deployment</h3>
            <p>
              Production-ready model delivery with API serving, monitoring,
              optimization, and reliable cloud deployment.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
