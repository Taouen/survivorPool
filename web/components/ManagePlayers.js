import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Button from './ui/Button';
import DangerZone from './ui/DangerZone';
import { postJsonWithHandling } from '../lib/fetchJson';

const ManageSurvivors = ({ players, setIsSubmitting }) => {
  const [updatedPlayers, setupdatedPlayers] = useState([...players]);

  const updatePlayers = ({ updatedPlayers }) => {
    const data = { players: updatedPlayers };
    setIsSubmitting(true);
    postJsonWithHandling(
      '/api/updateplayers',
      data,
      () => {
        setIsSubmitting(false);
        alert('Changes successfully saved.');
      },
      (err) => {
        setIsSubmitting(false);
        alert('Error saving changes. See console for error details.');
      },
    );
  };

  const deletePlayer = (player) => {
    const data = { player: player._id };

    if (
      prompt(
        'Are you sure you want to delete this player? Type the username to confirm.',
      ) === player.username
    ) {
      setIsSubmitting(true);
      postJsonWithHandling(
        '/api/deletePlayer',
        data,
        () => {
          setIsSubmitting(false);
          alert(`Successfully deleted player ${player.username}`);
        },
        (err) => {
          setIsSubmitting(false);
          alert('An error occurred. See console for error details.');
        },
      );
    } else {
      alert('Username entry did not match.');
    }
  };

  const deletePlayers = (setIsSubmitting) => {
    if (window.confirm('Are you sure you want to delete all players?')) {
      if (window.confirm('Are you really sure?')) {
        setIsSubmitting(true);
        postJsonWithHandling(
          '/api/deleteplayers',
          {},
          () => {
            setIsSubmitting(false);
            window.alert('All players have been deleted.');
          },
          (err) => {
            setIsSubmitting(false);
            console.error(err);
          },
        );
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
    <div className="flex flex-col items-center w-full max-w-lg">
      <div className="mb-4">
        <div className="grid grid-cols-3">
          <p className="font-bold justify-self-start">Username</p>
          <p className="font-bold">Paid</p>
          <p className="font-bold">Delete</p>
          {updatedPlayers.map((player) => (
            <div
              className="relative grid grid-cols-3 col-span-3 group justify-items-start last:pb-2"
              key={player._id}
            >
              <p className="self-center">{player.username}</p>
              <div className="flex items-center justify-self-center">
                <input
                  type="checkbox"
                  value={player.paid}
                  checked={player.paid}
                  onChange={() => handlePaidChange(player._id)}
                />
              </div>

              <div className="flex items-center justify-self-center">
                <Button
                  className="max-w-fit"
                  onClick={() => deletePlayer(player)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={() => updatePlayers({ updatedPlayers })}>
          Save Changes
        </Button>
      </div>

      <DangerZone>
        <Button onClick={() => copyEmails(setIsSubmitting)}>
          Copy Player Emails
        </Button>
        <Button onClick={() => deletePlayers(setIsSubmitting)}>
          Delete all players
        </Button>
      </DangerZone>
    </div>
  );
};

export default ManageSurvivors;
