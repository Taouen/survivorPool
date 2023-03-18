import Client from '../../components/Client';

export default async function handler(req, res) {
  const emails = await Client.fetch('*[_type == "player"] {email}').catch(
    (err) => {
      console.log(err);
    }
  );
  console.log(emails);

  res.status(200);
}
