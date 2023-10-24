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

  return (
    <div>
      {updatedSurvivors.map((survivor) => (
        <div className="flex justify-between w-32" key={survivor.name}>
          <h1>{survivor.name}</h1>
          <input
            type="checkbox"
            value={survivor.eliminated}
            checked={survivor.eliminated}
            onChange={() => handleEliminatedChange(survivor.name)}
          />
        </div>
      ))}
      <button onClick={() => updateSurvivors({ updatedSurvivors })}>
        Save Changes
      </button>
    </div>
  );
};

export default ManageSurvivors;
