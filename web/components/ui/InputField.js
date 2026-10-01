export default function InputField({ className, field = {}, ...props }) {
  const classes = ['w-20 h-8 mx-2 my-1 input input-secondary', className]
    .filter(Boolean)
    .join(' ');

  return <input {...field} {...props} className={classes} />;
}
