import { useEffect, useRef } from 'react';

const services = [
  {
    icon: 'fa-brands fa-figma',
    title: 'UI & UX',
    desc: 'I design clean, intuitive, and user-centered interfaces that enhance usability and deliver engaging digital experiences. Every design is crafted to balance aesthetics with functionality.',
  },
  {
    icon: 'fa-solid fa-code',
    title: 'Frontend',
    desc: 'I build modern, responsive, and user-friendly web interfaces using the latest technologies. My focus is on creating fast, accessible, and visually engaging experiences that work seamlessly across all devices.',
  },
  {
    icon: 'fa-solid fa-database',
    title: 'Backend',
    desc: 'I develop secure, scalable, and high-performance backend solutions with robust APIs, efficient databases, and reliable server-side architecture to power modern web applications.',
  },
];

export default function Services() {
  const boxRefs = useRef([]);

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

    boxRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="services" id="services1">
      <h2 className="heading">Services</h2>
      <div className="service-container">
        {services.map(({ icon, title, desc }, i) => (
          <div
            key={title}
            className="service-box"
            ref={el => (boxRefs.current[i] = el)}
          >
            <div className="service-info">
              <i className={icon} />
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
