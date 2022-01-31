export default {
  name: 'player',
  title: 'Player',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'mvp',
      title: 'MVP',
      type: 'string',
    },
    {
      name: 'picks',
      title: 'Picks',
      type: 'array',
      of: [{ type: 'string' }],
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
      type: 'number',
    },
  ],
};
