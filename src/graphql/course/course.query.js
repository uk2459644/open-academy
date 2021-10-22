import {gql} from '@apollo/client';

export const GET_COURSES=gql`
query getCourses{
    courses {
     id
     image
     title
     content
   }
 }
`;

export const GET_COURSE=gql`
query getCourse($id:ID!){
    course(id:$id){
     id
     title
     image
     content
   }
 }
`;

export const GET_COURSE_WITH_UNIT=gql`
query getCourse($id:ID!){
  course(id:$id){
    id
    title
    content
    units{
      id
      title
      content
      
    }
  }
}`;