import {gql} from '@apollo/client'

export const GET_DUNITS_BY_USERID=gql`
query getDunits($userid:String!){
    dunits(where:{userid_contains:$userid,draft:true}){
      id
     userid
     title
     draft
     content
   }
 }
`