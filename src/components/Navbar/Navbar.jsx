import { useEffect, useState } from 'react';
import './Navbar.scss';

const sections = ['about', 'projects', 'contact'];

export default function Navbar() {
  const [active, setActive] = useState('about');

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <strong>Mawrah Khan</strong>
      </div>

      <div className="navbar__right">
        {sections.map(section => (
          <button
            key={section}
            onClick={() => scrollTo(section)}
            className={active === section ? 'active' : ''}
          >
            {section === 'about' && 'About Me'}
            {section === 'projects' && 'Projects'}
            {section === 'contact' && 'Contact Me'}
          </button>
        ))}
      </div>
    </nav>
  );
}
