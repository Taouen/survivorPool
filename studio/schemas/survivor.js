export default {
  name: 'survivor',
  title: 'Survivor',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'nickname',
      title: 'Nickname',
      type: 'string',
    },
    { name: 'tribeColor', title: 'Tribe Color', type: 'string' },
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
      name: 'eliminated',
      title: 'Eliminated',
      type: 'boolean',
      initialValue: false,
    },
  ],
};
