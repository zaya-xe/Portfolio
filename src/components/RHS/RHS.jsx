import '../LHS/Side.scss';

export default function RHS({ headerText, children }) {
  return (
    <div className="side">
      {headerText && <h3>{headerText}</h3>}
      {children}
    </div>
  );
}
