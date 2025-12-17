import './Content.scss';

export default function Content({ type, value, url }) {
  if (type === 'image') {
    return <img className="content-img" src={value} alt="" />;
  }

  if (type === 'button') {
    const handleClick = () => {
      if (!url) return;
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
      <button className="content-btn" onClick={handleClick}>
        {value}
      </button>
    );
  }

  if (type === 'title') {
    return <p className="content-title">{value}</p>;
  }

  return <p>{value}</p>;
}
