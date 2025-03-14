import styles from './Card.module.scss';

const Card = ({ children, title, className, showDivider = true }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <h2>{title}</h2>
      {showDivider && <hr />}
      {children}
    </div>
  );
};

export default Card;
