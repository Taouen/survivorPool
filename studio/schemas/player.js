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
      name: 'mvp',
      title: 'MVP',
      type: 'reference',
      to: [{ type: 'survivor' }],
    },
    {
      name: 'picks',
      title: 'Picks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'survivor' }] }],
      initialValue: [],
    },
    {
      name: 'score',
      title: 'Score',
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
