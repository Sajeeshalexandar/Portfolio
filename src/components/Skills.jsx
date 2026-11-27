import { useEffect, useRef } from 'react';

const technicalSkills = [
  { icon: 'fa-brands fa-html5',    label: 'HTML5'      },
  { icon: 'fa-brands fa-css3-alt', label: 'CSS3'       },
  { icon: 'fa-brands fa-js',       label: 'JavaScript' },
  { icon: 'fa-brands fa-react',    label: 'React'      },
  { icon: 'fa-brands fa-bootstrap',label: 'Bootstrap'  },
  { icon: 'fa-solid fa-code',      label: 'jQuery'     },
  { icon: 'fa-brands fa-python',   label: 'Python'     },
  { icon: 'fa-solid fa-database',  label: 'SQL'        },
  { icon: 'fa-brands fa-git-alt',  label: 'Git'        },
  { icon: 'fa-brands fa-github',   label: 'GitHub'     },
  { icon: 'fa-solid fa-server',    label: 'Django'     },
];

const languages = [
  { name: 'English',   display: '90%', width: '90%'  },
  { name: 'Malayalam', display: '100%', width: '100%' },
  { name: 'Tamil',     display: '78%', width: '75%'  },
  { name: 'Hindi',     display: '70%', width: '60%'  },
];

export default function Skills() {
  const langBoxRef   = useRef(null);
  const skillsRef    = useRef([]);

  /* ---- Scroll-reveal for skill cards ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    skillsRef.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  /* ---- Language progress bar animation ---- */
  useEffect(() => {
    const progObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.progress').forEach(bar => {
              bar.classList.add('animated');
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    if (langBoxRef.current) progObserver.observe(langBoxRef.current);
    return () => progObserver.disconnect();
  }, []);

  return (
    <section className="skills" id="skills">
      <h2 className="heading">My <span>Skills</span></h2>

      <div className="skills-wrapper">
        {/* Technical Skills */}
        <div className="skills-box">
          <h3>Technical Skills</h3>
          <div className="skills-container">
            {technicalSkills.map(({ icon, label }, i) => (
              <div
                key={label}
                className="skill-card"
                style={{ '--i': i + 1 }}
                ref={el => (skillsRef.current[i] = el)}
              >
                <i className={icon} />
                <h4>{label}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="language-box" ref={langBoxRef}>
          <h3>Languages Known</h3>
          {languages.map(({ name, display, width }) => (
            <div className="language-item" key={name}>
              <div className="language-title">
                <span>{name}</span>
                <span>{display}</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
