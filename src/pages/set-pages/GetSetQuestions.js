import { useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { GET_SETS_QUESTION } from "../../graphql/set/settquestion.query";

export default function GetSetQuestions(){

    const [questionList,setQuestionList]=useState([]);
    const [skiploading,setSkiploading]=useState(false);

    const {setId}=useParams();

    const {error,loading,data}=useQuery(GET_SETS_QUESTION,{
        variables:{id:setId},
        skip:skiploading
    });

    useEffect(()=>{
      console.log('love from use effect function.');
    },[]);

    if(loading){
        return <h4>
            Please wait... <CircularProgress />
        </h4>
    }
    if(error){
        return `Error ! ${error}`;
    }

    if(data){
        console.log(data);
        setQuestionList(data.setquestions);
        setSkiploading(true);
    }

    
//   const getIndexOption=(option,index)=>{

//     console.log(currentUnit);
  
//    let newunits=[...units];
//    let newunit=newunits[currentUnit];
//    let newunitcontent={...newunit.content};
//    console.log(newunitcontent);
  
//    let blocks=[...newunitcontent.blocks];

//    console.log(blocks);

//   let changeitem=blocks[index];

//   console.log(changeitem);

//    let changeditem={
//      ...changeitem,
//      data:{
//        ...changeitem.data,
//        selected:option
//      }
//    };
//    console.log(changeditem);
//    blocks[index]=changeditem;
//    console.log(blocks);
//    let changedunitcontent={
//      ...newunitcontent,
//      blocks:blocks,
//    };

//    console.log(changedunitcontent);
//    newunits[currentUnit]={...newunit,content:{...changedunitcontent}};

//    console.log(newunits);
//  // setUnits([...units,changedunitcontent]);
//    setUnits(newunits);
//    console.log(units);
//   }


    return(
        <div>
            Get set questions page.
        </div>
    )
}


