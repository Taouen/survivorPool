export default {
  name: 'season',
  title: 'Season',
  type: 'document',
  fields: [
    {
      name: 'players',
      title: 'Players',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'player' }] }],
    },
    {
      name: 'survivors',
      title: 'Survivors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'survivor' }] }],
    },

    {
      name: 'winner',
      title: 'Winner',
      type: 'reference',
      to: [{ type: 'survivor' }],
    },
  ],
};
