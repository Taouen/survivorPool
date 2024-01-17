export default {
  name: 'season',
  title: 'Season',
  type: 'document',
  fields: [
    {
      name: 'seasonName',
      title: 'Season Name',
      type: 'string',
    },
    {
      name: 'seasonNumber',
      title: 'Season Number',
      type: 'number',
    },
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
      name: 'episodes',
      title: 'Episodes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'episode',
          title: 'Episode',
          fields: [
            { name: 'episodeNumber', title: 'Episode Number', type: 'number' },
            {
              name: 'scores',
              title: 'Scores',
              type: 'string', // will save data as a stringified object until such time as it no longer works. After that, this is the way I will have to store the data:

              /* name: 'scores',
              title: 'Scores',
              type: 'array',
              of: [{type: 'object',fields: [
                { name: 'survivor', title: 'Survivor', type: 'string' },
                { name: 'score', title: 'Score', type: 'number' },
              ],}], */

              /* This is if I want to include the reference to the survivor document. I think it's more complex than it needs to be. 
              
              of: [
                {
                  type: 'object',
                  name: 'score',
                  title: 'Score',
                  fields: [
                    {
                      name: 'survivor',
                      title: 'Survivor',
                      type: 'reference',
                      to: [{ type: 'survivor' }],
                      options: {
                        filter: ({ document }) => {
                          return {
                            filter:
                              '_type == "survivor" && $seasonNumber in seasons',
                            params: { seasonNumber: document.seasonNumber },
                          };
                        },
                      },
                    },
                    { name: 'score', title: 'Score', type: 'number' },
                  ],
                },
              ], */
            },
          ],
        },
      ],
    },
    {
      name: 'winner',
      title: 'Winner',
      type: 'reference',
      to: [{ type: 'survivor' }],
    },
  ],
};
