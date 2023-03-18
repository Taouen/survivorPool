import Client from '../../components/Client';

export default async function handler(req, res) {
  const emails = await Client.fetch('*[_type == "player"] {email}').catch(
    (err) => {
      console.log(err);
    }
  );
  emails.forEach((item) => {
    console.log(item.email);
  });

  res.status(200).send({ message: 'Request completed.' });
}
