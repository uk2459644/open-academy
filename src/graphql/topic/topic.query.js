import { gql } from '@apollo/client';

export const GET_QUESTIONS_BY_TOPIC_ID=gql`
query getQuestionsByTopic($id:ID!){
  topic(id:$id){
    id
    title
 
    practice_questions{
      id
      title
      content
      answer
      answerType
    }
    
    example_questions {
      id
      title
      content
      answer
      
    }
 
  }
}
`