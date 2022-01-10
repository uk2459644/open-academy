import {gql} from '@apollo/client';

export const LOGIN=gql`
mutation login($email:String!,$password:String!){
    login(input:{identifier:$email,password:$password}){
      jwt
      user{
        email
        username
      }
      
    }
  }
`