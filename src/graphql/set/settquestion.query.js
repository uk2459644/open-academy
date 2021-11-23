import {gql} from '@apollo/client';

export const GET_SETS_QUESTION=gql`
query getSetquestion($id:ID!){
    setquestions (sort:"id:asc" ,where:{sett:$id}) {
      id
      title
      userOpt
      correctOpt
      correctMark
      negativeMark
      correctMark
      content
     sett{
       id
     }
   }
}
`