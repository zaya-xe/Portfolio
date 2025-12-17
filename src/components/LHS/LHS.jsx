import './Side.scss';

export default function LHS({ headerText, children }) {
  return (
    <div className="side">
      {headerText && <h3>{headerText}</h3>}
      {children}
    </div>
  );
}
