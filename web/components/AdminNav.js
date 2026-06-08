import Button from './ui/Button';

const AdminNav = ({ currentPage, setCurrentPage }) => {
  const pages = ['Update Scores', 'Manage Survivors', 'Manage Players'];

  return (
    <div className="flex justify-around w-full max-w-lg py-4 mx-auto md:w-3/4">
      {pages.map((page) => {
        const buttonClasses = `btn ${page === currentPage ? 'btn-primary' : 'btn-neutral'}`;
        return (
          <Button
            className={buttonClasses}
            key={page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        );
      })}
    </div>
  );
};

export default AdminNav;
