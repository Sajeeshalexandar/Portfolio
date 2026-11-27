export default function Footer() {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="https://github.com/Sajeeshalexandar" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <i className="fa-brands fa-github" />
        </a>
        <a href="https://www.linkedin.com/in/sajeeshalexandar/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i className="fa-brands fa-linkedin" />
        </a>
        <a href="https://www.instagram.com/_zatrix_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <i className="fa-brands fa-instagram" />
        </a>
        <a href="https://x.com/a_sajeesh69241" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
          <i className="fa-brands fa-twitter" />
        </a>
      </div>
      <ul className="list">
        <li><a href="#services1">Services</a></li>
        <li><a href="#about1">About</a></li>
        <li><a href="#projects1">Projects</a></li>
        <li><a href="#contact1">Contact</a></li>
      </ul>
      <p className="location">
        <i className="fa-solid fa-location-dot" /> TVM | Vellarada | Anappara
      </p>
      <p className="copyright">
        &copy; 2026 Sajeesh Alexandar &mdash; All Rights Reserved
      </p>
    </footer>
  );
}
