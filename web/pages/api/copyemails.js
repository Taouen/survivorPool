import Client from '../../components/Client';

export default async function handler(req, res) {
  try {
    const players = await Client.fetch('*[_type == "player"] {email}').then(data => 
      data.map(player => player.email));
    
    console.log(players);

    if (!players?.length) {
      console.log('No player documents found.');
    }

    res.status(200).json({ message: 'Request completed.' });
  } catch (err) {
    console.error('Fetch failed:', err);
    res.status(500).json({ message: 'Error fetching emails.' });
  }
}
