import Client from '../../components/Client';

export default async function handler(req, res) {
  const { values, players, survivors } = req.body;
  const { scores, eliminated } = values;

  const totalScores = [];
  const episodePlayers = [];

  players.forEach((player) => {
    const { mvp, picks, username, _id, totalScore } = player;
    const pickScores = [];

    Object.keys(scores).forEach((survivor) => {
      if (mvp === survivor) pickScores.push(scores[survivor]);

      picks.forEach((pick) => {
        if (pick === survivor) {
          pickScores.push(scores[survivor]);
        }
      });
    });

    const episodeScore = pickScores
      .filter((element) => typeof element === 'number')
      .reduce((a, b) => a + b, 0);

    totalScores.push(totalScore + episodeScore);
    episodePlayers.push({
      score: totalScore + episodeScore,
      id: _id,
    });

    Client.patch(_id)
      .setIfMissing({ episodeScores: [] })
      .append('episodeScores', [episodeScore])
      .setIfMissing({ totalScore: 0 })
      .inc({ totalScore: episodeScore })
      .commit()
      .then((updatedPlayer) =>
        console.log(`Updated scores for player ${username}:`, updatedPlayer)
      )
      .catch((err) => console.error(err));
  });

  totalScores.sort((a, b) => b - a);

  const createUniqueRanks = (arr) => {
    const ranks = [];
    arr.forEach((score) => {
      if (ranks.indexOf(score) === -1) {
        ranks.push(score);
      } else {
        ranks.push('skip');
      }
    });

    return ranks;
  };

  episodePlayers.forEach((player) => {
    const { score, id, username } = player;
    const ranks = createUniqueRanks(totalScores);

    let rank = ranks.indexOf(score) + 1;

    Client.patch(id)
      .setIfMissing({ rank: [] })
      .append('rank', [rank])
      .commit()
      .then((promise) =>
        console.log(`Updated rank for player ${username}:`, promise)
      );
  });

  survivors.forEach((survivor) => {
    if (eliminated.includes(survivor.name)) {
      Client.patch(survivor._id)
        .set({ eliminated: true })
        .commit()
        .then((promise) =>
          console.log(
            `Updated eliminated for survivor ${survivor.name}:`,
            promise
          )
        );
    }
  });
  res.status(201).json(req.body);
}
