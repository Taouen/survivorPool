export default function CheckboxField({ className, field = {}, ...props }) {
  const classes = ['ml-2 checkbox checkbox-secondary checkbox-sm', className]
    .filter(Boolean)
    .join(' ');

  return <input {...field} {...props} type="checkbox" className={classes} />;
}
