import {gql} from '@apollo/client';

export const DRAFT_DUNIT=gql`
mutation createDunit($userid:String!,$title:String!,$content:JSON){
    createDunit(input: 
      {data : 
        {userid:$userid,
      title:$title,
      content:$content,
      draft:true
        }
      }
    )
    
    {
      dunit{
        userid
        title
        content
        id
      }
    }
  }
`
export const PUBLISH_DUNIT=gql`
mutation publishDunit($userid:String!,$title:String!,$content:JSON){
    createDunit(input: 
      {data : 
        {userid:$userid,
      title:$title,
      content:$content,
      draft:false
        }
      }
    )
    
    {
      dunit{
        userid
        title
        content
        id
      }
    }
  }
`
export const UPDATE_DUNIT=gql`
mutation updateDunit($id:ID!,$content:JSON){
    updateDunit(input: 
      {
         where: { id: $id }
        data : 
         {
          content:$content,
        }
      }
    )
    
    {
      dunit{
        draft
        userid
        title
        content
        id
      }
    }
  }
`

export const UPDATE_PUBLISH_DUNIT=gql`
mutation updateDunit($id:ID!,$content:JSON){
    updateDunit(input: 
      {
         where: { id: $id }
        data : 
         {
          content:$content,
          draft:true
        }
      }
    )
    
    {
      dunit{
        draft
        userid
        title
        content
        id
      }
    }
  }
`