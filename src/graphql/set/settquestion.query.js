import {gql} from '@apollo/client';

export const GET_SETS_QUESTION=gql`
query getSetquestion($id:ID!){
    setquestions (sort:"id:asc" ,where:{sett:$id}) {
      id
      title
      qNo
      status
     
      negativeMark
      correctMark
      content
     sett{
       id
     }
   }
}
`

export const CREATE_SET_QUESTION=gql`
mutation createQuestion($title:String!,$correctOpt:String!,$sett:ID!,$content:JSON!){
  createSetquestion(input:{data:{title:$title,correctOpt:$correctOpt,sett:$sett,content:$content}}){
    setquestion{
      userOpt
      id
      title
    }
  }
}
`