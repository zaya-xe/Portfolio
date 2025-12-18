import './Section.scss';

export default function Section({ id, bgImage, topContent, lhs, rhs }) {
  const sectionStyle = bgImage
    ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};

  return (
    <section className={`section ${id}`} id={id} style={sectionStyle}>
      {topContent && (
        <div className="section__top">
          {topContent}
        </div>
      )}

      <div className="section__body">
        {lhs}
        {rhs}
      </div>
    </section>
  );
}
