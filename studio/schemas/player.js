export default {
  name: 'player',
  title: 'Player',
  type: 'document',
  fields: [
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'picks',
      title: 'Picks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'survivor' }] }],
      initialValue: [],
    },
    {
      name: 'mvp',
      title: 'MVP',
      type: 'reference',
      to: [{ type: 'survivor' }],
    },
    {
      name: 'episodeScores',
      title: 'Episode Scores',
      type: 'array',
      of: [{ type: 'number' }],
      initialValue: [],
    },
    {
      name: 'totalScore',
      title: 'Total Score',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'rank',
      title: 'Rank',
      type: 'array',
      of: [{ type: 'number' }],
      initialValue: [],
    },
    {
      name: 'paid',
      title: 'Paid',
      type: 'boolean',
    },
  ],
};
