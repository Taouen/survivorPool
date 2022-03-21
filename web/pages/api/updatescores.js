import Client from '../../components/Client';

const scoreRankings = [];
const episodePlayers = [];

export default async function handler(req, res) {
  const { values, players } = req.body;
  const { scores, eliminated } = values;

  players.forEach((player) => {
    const { mvp, picks, username, _id, totalScore } = player;
    let episodeScore = 0;

    Object.keys(scores).forEach((survivor) => {
      if (mvp === survivor) episodeScore += scores[survivor];

      picks.forEach((pick) => {
        if (pick === survivor) {
          episodeScore += scores[survivor];
        }
      });
    });

    scoreRankings.push(totalScore + parseInt(episodeScore));
    episodePlayers.push({
      score: totalScore + parseInt(episodeScore),
      id: _id,
    });

    Client.patch(_id)
      .setIfMissing({ episodeScores: [] })
      .append('episodeScores', [parseInt(episodeScore)])
      .setIfMissing({ totalScore: 0 })
      .inc({ totalScore: parseInt(episodeScore) })
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

  res.status(201).json(req.body);
}
