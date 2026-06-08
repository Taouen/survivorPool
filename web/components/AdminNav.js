import Button from './ui/Button';

const AdminNav = ({ selectedPage, setSelectedPage }) => {
  const pages = ['Update Scores', 'Manage Survivors', 'Manage Players'];

  return (
    <div className="flex justify-around w-full max-w-lg py-4 mx-auto md:w-3/4">
      {pages.map((page) => {
        const buttonClasses = `btn ${page === selectedPage ? 'btn-primary' : 'btn-neutral'}`;
        return (
          <Button
            className={buttonClasses}
            key={page}
            onClick={() => setSelectedPage(page)}
          >
            {page}
          </Button>
        );
      })}
    </div>
  );
};

export default AdminNav;
