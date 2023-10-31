import { useState } from 'react';

const ManageSurvivors = ({ survivors, setIsSubmitting }) => {
  const [updatedSurvivors, setUpdatedSurvivors] = useState([...survivors]);

  const updateSurvivors = ({ updatedSurvivors }) => {
    const data = { survivors: updatedSurvivors };
    setIsSubmitting(true);
    fetch('/api/updateSurvivors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        setIsSubmitting(false);
        alert('Changes successfully saved.');
      })
      .catch((err) => {
        console.log(err);
        alert('Error saving changes. See console for error details.');
      });
  };

  const handleEliminatedChange = (name) => {
    setUpdatedSurvivors((prevState) => {
      const lastState = [...prevState];
      lastState.map((survivor) => {
        survivor.name === name
          ? (survivor.eliminated = !survivor.eliminated)
          : survivor;
      });
      return lastState;
    });
  };

  const handleTribeColorChange = (name, color) => {
    setUpdatedSurvivors((prevState) => {
      const lastState = [...prevState];
      lastState.map((survivor) => {
        survivor.name === name ? (survivor.tribeColor = color) : survivor;
      });
      return lastState;
    });
  };

  return (
    <div>
      {updatedSurvivors.map((survivor) => (
        <div
          className="flex items-center justify-between py-1"
          key={survivor.name}
        >
          <h1>{survivor.name}</h1>
          <div className="pl-4">
            <input
              type="checkbox"
              value={survivor.eliminated}
              checked={survivor.eliminated}
              onChange={() => handleEliminatedChange(survivor.name)}
            />
            <select
              onChange={(e) =>
                handleTribeColorChange(survivor.name, e.target.value)
              }
              className="ml-2 dark:text-black"
            >
              <option value="none">--</option>
              <option value="red">Red</option>
              <option value="orange">Orange</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
            </select>
          </div>
        </div>
      ))}
      <button
        className="p-1 border rounded text-md w-28 md:w-36 "
        onClick={() => updateSurvivors({ updatedSurvivors })}
      >
        Save Changes
      </button>
    </div>
  );
};

export default ManageSurvivors;
