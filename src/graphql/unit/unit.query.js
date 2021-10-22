import {gql} from '@apollo/client';

export const GET_TOPICS_BY_UNIT = gql`
query getUnit($id:ID!){
    unit(id:$id){
      id
     title
     topics{
      id
      title
      content
    }
    }
  }

`