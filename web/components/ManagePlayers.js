import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ManageSurvivors = ({ players, setIsSubmitting }) => {
  const [updatedPlayers, setupdatedPlayers] = useState([...players]);

  const updatePlayers = ({ updatedPlayers }) => {
    const data = { players: updatedPlayers };
    setIsSubmitting(true);
    fetch('/api/updateplayers', {
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

  const deletePlayer = (player) => {
    const data = { player: player._id };

    if (
      prompt(
        'Are you sure you want to delete this player? Type the username to confirm.'
      ) === player.username
    ) {
      setIsSubmitting(true);
      fetch('/api/deletePlayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          setIsSubmitting(false);
          alert(`Successfully deleted player ${player.username}`);
        })
        .catch((err) => {
          console.log(err);
          alert('An error occurred. See console for error details.');
        });
    } else {
      alert('Username entry did not match.');
    }
  };

  const deletePlayers = (setIsSubmitting) => {
    setIsSubmitting(true);
    if (window.confirm('Are you sure you want to delete all players?')) {
      if (window.confirm('Are you really sure?')) {
        try {
          fetch('/api/deleteplayers').then(() => {
            setIsSubmitting(false);
            window.alert('All players have been deleted.');
          });
        } catch {
          console.error(error);
        }
      }
    }
  };

  const copyEmails = async () => {
    const request = await fetch('/api/copyemails').then((data) => data.json());
    console.log(request.message);
  };

  const handlePaidChange = (_id) => {
    setupdatedPlayers((prevState) => {
      const lastState = [...prevState];
      lastState.map((player) => {
        player._id === _id ? (player.paid = !player.paid) : player;
      });
      return lastState;
    });
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="grid grid-cols-3 ">
        <p className="font-bold justify-self-start">Username</p>
        <p className="font-bold">Paid</p>
        <p className="font-bold">Delete</p>
        {updatedPlayers.map((player) => (
          <div
            className="relative grid grid-cols-3 col-span-3 group justify-items-start last:pb-2"
            key={player._id}
          >
            <p>{player.username}</p>
            <div className="flex items-center justify-self-center">
              <input
                type="checkbox"
                value={player.paid}
                checked={player.paid}
                onChange={() => handlePaidChange(player._id)}
              />
            </div>

            <div className="flex items-center justify-self-center">
              <button onClick={() => deletePlayer(player)}>
                <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#C00' }} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="p-1 mt-4 border rounded text-md w-28 md:w-36 "
        onClick={() => updatePlayers({ updatedPlayers })}
      >
        Save Changes
      </button>

      <div className="w-full p-2 mt-4 border border-red-500 rounded">
        <h3 className="mb-4 text-xl ">Danger Zone</h3>
        <div className="flex flex-col justify-center w-full md:flex-row">
          <button
            className="p-1 mb-2 border rounded md:ml-2"
            onClick={() => copyEmails(setIsSubmitting)}
          >
            Copy Player Emails
          </button>
          <button
            className="p-1 mb-2 border rounded md:ml-2"
            onClick={() => deletePlayers(setIsSubmitting)}
          >
            Delete all players
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageSurvivors;
