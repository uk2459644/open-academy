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
export const GET_UNITS_BY_COURSE_ID=gql`
query getUnitsbyCourseId($id:ID!){
  units (sort:"id:asc" ,where:{course:$id}){
   id
    title
    content
    
  }
}
`