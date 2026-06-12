export default function Button({ className, children, ...props }) {
  const styles = `btn ${className ? className : 'btn-primary'} py-1 m-1 flex-1`;

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
