const AdminNav = ({ setSelectedPage }) => {
  const pages = ['Update Scores', 'Manage Survivors', 'Manage Players'];

  return (
    <div className="flex justify-around w-full max-w-lg py-4 mx-auto md:w-3/4">
      {pages.map((page) => {
        return (
          <button
            key={page}
            className="p-1 border rounded text-md w-28 md:w-36 "
            onClick={() => setSelectedPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default AdminNav;
