import Client from '../../components/Client';

export default async function handler(req, res) {
  const { survivors } = req.body;

  survivors.forEach((survivor) => {
    const { _id, name } = survivor;
    Client.patch(_id)
      .set({ eliminated: false })
      .commit()
      .then(() => console.log(`Reset eliminated for ${name}`))
      .catch((err) => console.error(err));
  });

  res.status(201).json(req.body);
}
