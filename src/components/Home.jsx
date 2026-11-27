import { useEffect, useRef } from 'react';

const roles = ['Web Developer', 'Full Stack Dev', 'UI Designer', 'Django Expert'];

export default function Home() {
  const typingRef = useRef(null);

  useEffect(() => {
    let ri = 0, ci = 0, deleting = false;
    let timer;

    function typeLoop() {
      const word = roles[ri];
      if (typingRef.current) {
        typingRef.current.textContent = deleting
          ? word.slice(0, ci--)
          : word.slice(0, ci++);
      }
      if (!deleting && ci === word.length + 1) {
        deleting = true;
        timer = setTimeout(typeLoop, 1200);
        return;
      }
      if (deleting && ci < 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
      timer = setTimeout(typeLoop, deleting ? 60 : 110);
    }

    typeLoop();
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="home" id="home">
      <div className="home-content">
        <h1>Hi, It's <span>Sajeesh</span></h1>
        <h3>I'm a <span className="typing-text" ref={typingRef}>Web Developer</span></h3>
        <p>
          I build responsive, modern, and user-friendly websites that help businesses establish a
          strong online presence and achieve their digital goals.
        </p>
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
        <div className="btn-group">
          <a href="#projects1" className="btn">Projects</a>
          <a href="#contact1" className="btn">Contact</a>
        </div>
      </div>
      <div className="home-image">
        <div className="img-ring" />
        <img className="h-img" src="/zatrix.jpg" alt="Portrait of Sajeesh Alexandar" />
      </div>
    </section>
  );
}
