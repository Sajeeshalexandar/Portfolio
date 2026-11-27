import { useEffect, useRef } from 'react';

const projects = [
  {
    featured: true,
    img: '/hospitalManagement.png',
    imgAlt: 'Screenshot of Hospital Management SaaS',
    tags: ['Python', 'Django', 'SaaS', 'REST API'],
    title: 'Hospital Management SaaS',
    desc: 'A full-featured hospital management platform where doctors consult patients online and patients can find doctors and hospitals. Includes complete CRUD operations for Super Admin, Hospital Admin, Doctor, Patient, and Receptionist roles.',
    links: [
      { href: 'https://hospital-management-saas-disk.onrender.com/', icon: 'fa-solid fa-arrow-up-right-from-square', label: 'Live Demo' },
      { href: 'https://github.com/Sajeeshalexandar/Hospital', icon: 'fa-brands fa-github', label: 'GitHub' },
    ],
  },
  {
    img: '/scopeIndiaClone.png',
    imgAlt: 'Screenshot of Scope India Website Clone',
    tags: ['HTML', 'CSS', 'JavaScript', 'Student Portal'],
    title: 'Scope India Clone',
    desc: 'A faithful clone of the Scope India institutional website, complete with a student portal for course discovery, admissions information, and academic resources.',
    links: [
      { href: 'https://scopeindia-website.onrender.com/', icon: 'fa-solid fa-arrow-up-right-from-square', label: 'Live Demo' },
      { href: 'https://github.com/Sajeeshalexandar/ScopeIndia_Website', icon: 'fa-brands fa-github', label: 'GitHub' },
    ],
  },
  {
    img: '/cardflipGame.png',
    imgAlt: 'Screenshot of the Card Flip Memory Game',
    tags: ['HTML', 'CSS', 'JavaScript'],
    title: 'Card Flip Memory Game',
    desc: 'A fun and interactive memory card game built using HTML, CSS, and JavaScript. Players flip cards to find matching pairs while improving memory and concentration. Features smooth animations, responsive design, and engaging gameplay.',
    links: [
      { href: 'https://github.com/Sajeeshalexandar/myProjects/blob/SajeeshAlexandar/CardFlipGame.html', icon: 'fa-brands fa-github', label: 'GitHub' },
    ],
  },
  {
    img: '/QuizzApp.png',
    imgAlt: 'Screenshot of the Interactive Quiz Application',
    tags: ['HTML', 'CSS', 'JavaScript'],
    title: 'Interactive Quiz Application',
    desc: 'A responsive quiz application developed with HTML, CSS, and JavaScript. It presents multiple-choice questions, tracks scores in real time, provides instant feedback, and delivers the final result after completion.',
    links: [
      { href: 'https://github.com/Sajeeshalexandar/myProjects/blob/SajeeshAlexandar/QuizApp.html', icon: 'fa-brands fa-github', label: 'GitHub' },
    ],
  },
  {
    img: '/dynamicIdCard.png',
    imgAlt: 'Screenshot of the Dynamic ID Card Generator',
    tags: ['HTML', 'CSS', 'jQuery'],
    title: 'Dynamic ID Card Generator',
    desc: 'A web application that generates professional-looking ID cards using user input. Built with HTML, CSS, JavaScript, and jQuery, it allows users to enter personal details and instantly preview a customized ID card.',
    links: [
      { href: 'https://github.com/Sajeeshalexandar/myProjects/blob/SajeeshAlexandar/jQueryIDcard.html', icon: 'fa-brands fa-github', label: 'GitHub' },
    ],
  },
  {
    img: '/BaloonPop.png',
    imgAlt: 'Screenshot of the Balloon Pop Arcade Game',
    tags: ['HTML', 'CSS', 'JavaScript'],
    title: 'Balloon Pop Arcade Game',
    desc: 'A simple and entertaining browser game where players pop balloons to earn points before time runs out. Developed using HTML, CSS, and JavaScript with smooth animations and score tracking.',
    links: [
      { href: 'https://github.com/Sajeeshalexandar/myProjects/blob/SajeeshAlexandar/popBaloonGame.html', icon: 'fa-brands fa-github', label: 'GitHub' },
    ],
  },
  {
    img: '/TodoApp.png',
    imgAlt: 'Screenshot of the Todo List Manager',
    tags: ['HTML', 'CSS', 'JavaScript'],
    title: 'Todo List Manager',
    desc: 'A clean and user-friendly task management application built with HTML, CSS, and JavaScript. Users can add, edit, delete, and organize daily tasks, making productivity simple and efficient.',
    links: [
      { href: 'https://github.com/Sajeeshalexandar/myProjects/blob/SajeeshAlexandar/todoList.html', icon: 'fa-brands fa-github', label: 'GitHub' },
    ],
  },
  {
    img: '/petApp.png',
    imgAlt: 'Screenshot of the PetHub pet shop website',
    tags: ['React', 'CSS', 'JavaScript'],
    title: 'PetHub – Pet Shop Website',
    desc: 'A modern React-based pet shop website featuring an attractive user interface for browsing pets and pet products. Designed with reusable React components, responsive layouts, and a clean shopping experience.',
    links: [
      { href: 'https://github.com/Sajeeshalexandar/ReactProjects/tree/master/src/PetHub', icon: 'fa-brands fa-github', label: 'GitHub' },
    ],
  },
];

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-img-wrap">
        <img src={project.img} alt={project.imgAlt} />
        <div className="project-overlay">
          <div className="project-links">
            {project.links.map(({ href, icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="overlay-btn"
                aria-label={label}
              >
                <i className={icon} /> {label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="project-tags">
        {project.tags.map(tag => <span key={tag}>{tag}</span>)}
      </div>
      <h3>{project.title}</h3>
      <p>{project.desc}</p>
    </div>
  );
}

export default function Projects() {
  const contentRefs = useRef([]);

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

    contentRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects" id="projects1">
      <h2 className="heading">Projects</h2>
      <div className="project-box">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className={`content${project.featured ? ' featured' : ''}`}
            ref={el => (contentRefs.current[i] = el)}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
