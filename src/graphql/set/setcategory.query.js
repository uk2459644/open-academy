import {gql} from '@apollo/client';

export const GET_SET_CATEGORY=gql`
query getSetcategory{
  setCategories (sort:"id:asc"){
    id
    title
    content
  }
}
`