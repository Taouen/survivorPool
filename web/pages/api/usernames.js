import Client from '../../components/Client';

export default async function handler(req, res) {
  const usernames = await Client.fetch('*[_type == "player"] {username}').catch(
    (err) => {
      console.log(err);
    }
  );

  res.status(200).json(usernames);
}
