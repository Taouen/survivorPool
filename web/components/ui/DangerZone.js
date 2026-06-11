const DangerZone = ({ children, title = 'Danger Zone' }) => {
  return (
    <div className="w-full p-2 border card card-border border-error bg-base-100">
      <h3 className="mb-4 text-xl">{title}</h3>
      <div className="flex justify-around w-full">{children}</div>
    </div>
  );
};

export default DangerZone;
