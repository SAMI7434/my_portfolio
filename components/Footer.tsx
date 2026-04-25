export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ padding: '20px', textAlign: 'center', borderTop: '1px solid #ddd', marginTop: '40px' }}>
      <p>&copy; {year} Samiran Das. All rights reserved.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
        <span>Twitter</span>
        <span>GitHub</span>
        <span>LinkedIn</span>
      </div>
    </footer>
  );
}
