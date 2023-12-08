import Client from '../../components/Client';

export default async function handler(req, res) {
  const { player } = req.body;

  Client.delete(player)
    .then(() => {
      res.status(200);
    })
    .catch((err) => {
      console.log(`An error occurred with the request: ${err}`);
    });
}
