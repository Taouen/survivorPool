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
    {
      name: 'seasons',
      title: 'Seasons',
      type: 'array',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'season.seasonNumber',
            },
          },
          fields: [
            {
              name: 'season',
              title: 'Season',
              type: 'reference',
              to: { type: 'season' },
            },
            { name: 'tribeColor', title: 'Tribe Color', type: 'string' },
            {
              name: 'episodeScores',
              title: 'Episode Scores',
              type: 'array',
              of: [
                {
                  type: 'object',
                  preview: {
                    select: {
                      title: 'episodeNumber',
                    },
                  },
                  fields: [
                    {
                      name: 'episodeNumber',
                      title: 'Episode Number',
                      type: 'number',
                    },
                    { name: 'score', title: 'Score', type: 'number' },
                  ],
                },
              ],
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
        },
      ],
    },
  ],
};
