import Client from '../../components/Client';

export default async function handler(req, res) {
  const emails = [];
  try {
    Client.fetch('*[_type == "player"] {email}').then(item => emails.push(item.email));
    console.log(emails);

    if (!emails?.length) {
      console.log('No player documents found.');
    } else {
      emails.forEach((item) => {
        console.log('Player email:', item.email);
      });
    }

    res.status(200).json({ message: 'Request completed.' });
  } catch (err) {
    console.error('Fetch failed:', err);
    res.status(500).json({ message: 'Error fetching emails.' });
  }
}
