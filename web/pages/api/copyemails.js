import Client from '../../components/Client';

export default async function handler(req, res) {
  const emails = await Client.fetch('*[_type == "player"] {email}').catch(
    (err) => {
      console.log(err);
    }
  );

  res.status(200).json(emails);
}
