// episode.js
export default {
  name: 'episode',
  title: 'Episode',
  type: 'document',
  fields: [
    {
      name: 'number',
      title: 'Episode Number',
      type: 'number',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'survivorScores',
      title: 'Survivor Scores',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'survivorScore',
          fields: [
            {
              name: 'survivor',
              title: 'Survivor',
              type: 'reference',
              to: [{ type: 'survivor' }],
            },
            {
              name: 'score',
              title: 'Score',
              type: 'number',
            },
          ],
        },
      ],
      initialValue: [],
    },
    {
      name: 'playerScores',
      title: 'Player Scores',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'playerScore',
          fields: [
            {
              name: 'player',
              title: 'Player',
              type: 'reference',
              to: [{ type: 'player' }],
            },
            {
              name: 'score',
              title: 'Score',
              type: 'number',
            },
          ],
        },
      ],
      initialValue: [],
    },
    // Add more fields as needed for episode-specific information
  ],
};

/* 

player = {
  seasons: [
    {
      season: reference to season doc
      picks: [
        references to survivor docs,
        ...
      ],
      mvp: reference to survivor doc,
      episodeScores: { //source of truth, will need to calculate on the front end and set here. 
        episode: score,
        episode: score,
        ...
      }
      totalScore: number //calculate from episodeScores on the front end whenever an episode score is updated.
        
  ]
}

survivor = {
  seasons: [references to season docs],
  name: string,
  nickname: string,
  _id: number,
  tribeColor: string,
  episodeScores: { // set scores both here and in the episode when updating score. If I need to edit a score, I would need to change it in 2 places unless I make it editable from the front end and programatically change it in both the episode and player document
  totalScore: sum of episode scores
  eliminated: boolean
}

season = {
  seasonNumber: season number,
  players: [
    ...references to player docs
  ],
  survivors: [
    ...references to survivor docs
  ],
  episodes: [
    1: {
        survivor: score,
        survivor: score,
        ...      
      
    },
    2: {
        survivor: score,
        survivor: score,
        ...
    },
    ...
  ]
}    

*/
