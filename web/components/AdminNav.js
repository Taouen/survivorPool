import Button from './ui/Button';

const AdminNav = ({ setSelectedPage }) => {
  const pages = ['Update Scores', 'Manage Survivors', 'Manage Players'];

  return (
    <div className="flex justify-around w-full max-w-lg py-4 mx-auto md:w-3/4">
      {pages.map((page) => {
        return (
          <Button key={page} onClick={() => setSelectedPage(page)}>
            {page}
          </Button>
        );
      })}
    </div>
  );
};

export default AdminNav;
