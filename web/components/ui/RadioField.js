export default function RadioField({ className, field = {}, ...props }) {
  const classes = ['radio radio-secondary radio-sm', className]
    .filter(Boolean)
    .join(' ');

  return <input {...field} {...props} type="radio" className={classes} />;
}
