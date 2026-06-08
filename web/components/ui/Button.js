export default function Button({ className, children, ...props }) {
  const styles = className ? className : `btn btn-primary m-1 flex-1`;

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
