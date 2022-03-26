import Client from '../../components/Client';

const scoreRankings = [];
const episodePlayers = [];

export default async function handler(req, res) {
  const { values, players, survivors } = req.body;
  const { scores, eliminated } = values;

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

    scoreRankings.push(totalScore + episodeScore);
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
      .then(() => console.log('Updated scores'))
      .catch((err) => console.error(err));
  });

  scoreRankings.sort((a, b) => b - a);

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
    const { score, id } = player;
    const ranks = createUniqueRanks(scoreRankings);

    let rank = ranks.indexOf(score) + 1;

    Client.patch(id)
      .setIfMissing({ rank: 0 })
      .set({ rank: rank })
      .commit()
      .then(() => console.log('Updated rank'));
  });

  survivors.forEach((survivor) => {
    if (eliminated.includes(survivor.name)) {
      Client.patch(survivor._id).set({ eliminated: true }).commit();
    }
  });
  res.status(201).json(req.body);
}