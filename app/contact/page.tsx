import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function Contact() {
  return (
    <>
      <Navbar activePage="contact" />
      <div className={styles.ph}>
        <div className={styles.lbl}>Inquiry</div>
        <h1>
          Start a <em>partnership</em>
        </h1>
        <p>
          Share your channel, your bottleneck, and what you want the packaging
          to do better. I reply within 24 hours.
        </p>
      </div>
      <div className={styles.sec + ' ' + styles.noPadTop}>
        <div className={styles.cgrid}>
          <div className={styles.fcard}>
            <div className={styles.fhdr}>
              <h3>Project inquiry</h3>
              <div className={styles.apill}>
                <span className={styles.ap}></span>
                Currently available
              </div>
            </div>
            <form className={styles.form}>
              <input
                className={styles.fi}
                placeholder="Full Name"
                type="text"
              />
              <input
                className={styles.fi}
                placeholder="Email Address"
                type="email"
              />
              <input
                className={styles.fi + ' ' + styles.full}
                placeholder="Channel URL"
                type="text"
              />
              <input
                className={styles.fi}
                placeholder="Budget Range"
                type="text"
              />
              <input
                className={styles.fi}
                placeholder="Timeline"
                type="text"
              />
              <textarea
                className={styles.fi + ' ' + styles.full}
                placeholder="Tell me about the project..."
                rows={4}
                style={{ resize: 'none' }}
              ></textarea>
              <button className={styles.fsub} type="submit">
                Send Inquiry
              </button>
            </form>
          </div>
          <div className={styles.sidebar}>
            <div className={styles.hbox}>
              <h3>What helps me reply faster</h3>
              <ul className={styles.ul}>
                <li>Your channel link</li>
                <li>What is underperforming right now</li>
                <li>Design, strategy, or both?</li>
                <li>Rough posting frequency</li>
                <li>Any hard brand rules</li>
              </ul>
            </div>
            <div className={styles.card}>
              <h3>Get in touch directly</h3>
              <p style={{ marginBottom: 0, fontSize: '12px' }}>
                Reach out on any platform — I reply within 24 hours.
              </p>
              <div className={styles.clinks}>
                <div className={styles.clink}>
                  <div className={styles.cion}>✉</div>
                  <span className={styles.ctxt}>sumanta@example.com</span>
                </div>
                <div className={styles.clink}>
                  <div className={styles.cion}>in</div>
                  <span className={styles.ctxt}>LinkedIn — Samiran Das</span>
                </div>
                <div className={styles.clink}>
                  <div className={styles.cion}>🛒</div>
                  <span className={styles.ctxt}>SuperProfile Store</span>
                </div>
              </div>
              <p className={styles.note}>
                Based in Diamond Harbour, West Bengal.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
