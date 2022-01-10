import {gql} from '@apollo/client';

export const GET_SETS_BY_CATEGORY=gql`
query getSetbycategory($id:ID!){
    setts(sort:"id:asc" ,where:{set_category:$id}){
      id
      title
      content
      set_category{
        id
      }
    }
  }
`

export const GET_SETS=gql`
query getSets{
  setts(sort:"id:asc"){
    id
    title
  }
}
`