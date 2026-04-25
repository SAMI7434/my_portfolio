import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

const portfolioItems = [
  {
    title: 'Podcast Packaging',
    subtitle: 'Emotional framing',
    image: 'https://i.ibb.co/GvX3KGsL/Vaibhav-Sisinty-X-2am-v1.jpg',
  },
  {
    title: 'Case Study Concepts',
    subtitle: 'Storytelling curiosity',
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=400&q=70',
  },
  {
    title: 'Expert Led Videos',
    subtitle: 'Trust-focused systems',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&q=70',
  },
  {
    title: 'Brand Led Packaging',
    subtitle: 'Consistent identity',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=70',
  },
  {
    title: 'Business Commentary',
    subtitle: 'Authority + tension',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=70',
  },
  {
    title: 'Educational Videos',
    subtitle: 'Concept at a glance',
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=70',
  },
  {
    title: 'Growth Strategy',
    subtitle: 'Behavior-first thinking',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=70',
  },
  {
    title: 'Consulting Work',
    subtitle: 'Full system thinking',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=70',
  },
];

export default function Portfolio() {
  return (
    <>
      <Navbar activePage="projects" />
      <div className={styles.ph}>
        <div className={styles.lbl}>Portfolio</div>
        <h1>
          Curated <em>Masterpieces</em>
        </h1>
        <p>
          Selected thumbnail and packaging direction built for stronger first
          impressions and intent-driven clicks.
        </p>
      </div>
      <div className={styles.sec + ' ' + styles.noPadTop}>
        <div className={styles.pgrid}>
          {portfolioItems.map((item, idx) => (
            <div key={idx} className={styles.pcard}>
              <img src={item.image} alt={item.title} />
              <div className={styles.pov}>
                <h4>{item.title}</h4>
                <p>{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.card + ' ' + styles.ctac + ' ' + styles.marginTop}>
          <div className={styles.lbl + ' ' + styles.center}>Ready to work</div>
          <h2>
            Want packaging that <em>actually converts?</em>
          </h2>
          <p>Let's talk about your channel and what we can fix.</p>
          <div className={styles.btnp + ' ' + styles.inline}>
            Start a project
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
