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
      name: 'totalScore',
      title: 'Total Score',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'scores',
      title: 'Scores',
      type: 'array',
      of: [{ type: 'number' }],
    },
    {
      name: 'eliminated',
      title: 'Eliminated',
      type: 'boolean',
      initialValue: false,
    },
  ],
};
