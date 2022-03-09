import Client from '../../components/Client';

export default async function handler(req, res) {
  Client.delete({ query: '*[_type == "player"]' })
    .then(() => {
      res.status(201).json(req.body);
    })
    .catch((err) => {
      console.error(err);
    });
}
