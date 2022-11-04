import Client from '../../components/Client';

export default async function handler(req, res) {
  const { survivors } = req.body;
  const requests = [];

  survivors.forEach((survivor) => {
    const { _id, name } = survivor;
    requests.push(
      Client.patch(_id)
        .set({ eliminated: false })
        .commit()
        .then(() => console.log(`Reset eliminated for ${name}`))
        .catch((err) => console.error(err))
    );
  });

  try {
    const result = await Promise.all(requests);
    res.status(200).send({ result });
  } catch (err) {
    res
      .status(500)
      .send({ error: 'An error occurred in one or more update requests:' });
    console.error(err);
  }
}
