import {gql} from '@apollo/client';

export const GET_INTRO=gql`
query getIntro{
    intro{
      id
      Title
      content
    }
  }
`