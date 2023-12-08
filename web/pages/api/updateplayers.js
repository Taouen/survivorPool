import Client from '../../components/Client';

export default async function handler(req, res) {
  const { players } = req.body;

  const playerRequests = players.map((player) => {
    return Client.patch(player._id)
      .set({ paid: player.paid })
      .commit()
      .then((player) => console.log(`Updated player ${player.username}`))
      .catch((err) =>
        console.log(
          `An error occurred while updating player ${player.name}: ${err}`
        )
      );
  });

  try {
    const result = await Promise.all([...playerRequests]);
    res.status(200).send(`Updates completed successfully. Result: ${result}`);
  } catch (err) {
    res.status(500).send({
      error: `An error occurred in one or more update requests: ${err}`,
    });
  }
}
