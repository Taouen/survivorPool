const DangerZone = ({ players, survivors, setIsSubmitting }) => {
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

  const resetScores = (players, survivors, setIsSubmitting) => {
    const data = { players, survivors };

    if (
      window.confirm(
        'Are you sure you want to reset all player and survivor scores?'
      )
    ) {
      if (window.confirm('Are you really sure?')) {
        setIsSubmitting(true);
        fetch('/api/resetScores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(() => {
            setIsSubmitting(false);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const deleteLatestScore = (players, survivors, setIsSubmitting) => {
    const data = { players, survivors };
    setIsSubmitting(true);
    fetch('/api/deletelatestscore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        setIsSubmitting(false);
      })
      .catch((err) => console.log(err));
  };

  const clearEliminated = (survivors, setIsSubmitting) => {
    const data = { survivors };
    setIsSubmitting(true);
    fetch('/api/cleareliminated', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        setIsSubmitting(false);
        if (
          window.confirm(
            'Reset eliminated survivors. Do you want to reload the page?'
          )
        ) {
          window.location.reload(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const copyEmails = async () => {
    const request = await fetch('/api/copyemails').then((data) => data.json());
    console.log(request.message);
  };

  return (
    <div className="w-full p-2 border border-red-500 rounded">
      <h3 className="mb-4 text-xl ">Danger Zone</h3>
      <div className="flex flex-col justify-center w-full md:flex-row">
        <button
          className="p-1 mb-2 border rounded md:ml-2"
          onClick={() => deleteLatestScore(players, survivors, setIsSubmitting)}
        >
          Delete latest score
        </button>
        <button
          className="p-1 mb-2 border rounded md:ml-2"
          onClick={() => copyEmails(setIsSubmitting)}
        >
          Copy Player Emails
        </button>

        <button
          className="p-1 mb-2 border rounded md:ml-2"
          onClick={() => clearEliminated(survivors, setIsSubmitting)}
        >
          Clear Eliminated
        </button>
        <button
          className="p-1 mb-2 border rounded md:ml-2"
          onClick={() => resetScores(players, survivors, setIsSubmitting)}
        >
          Reset scores
        </button>
        <button
          className="p-1 mb-2 border rounded md:ml-2"
          onClick={() => deletePlayers(setIsSubmitting)}
        >
          Delete all players
        </button>
      </div>
    </div>
  );
};

export default DangerZone;
