import PropTypes from 'prop-types';
// editorjs elements
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Mathk from "editorjs-math-uk";
import SimpleImage from "editorjs-simpleimage-uk";
import Embed from "editorjs-embed-uk";
import Alert from 'editorjs-alert-uk';
import Option from 'editorjs-options-uk';
import Optionfour from 'editorjs-4-option';
import Chart from 'editorjs-chart';

import Table from '@editorjs/table';
import { useEffect, useState } from 'react';

const Checklist = require('@editorjs/checklist');

AnswerShowEditorjsData.propTypes={
    contentData : PropTypes.object
}
let editor=null;

export default function AnswerShowEditorjsData({contentData}){

    const [editorjscreated,setEditorjscreated]=useState(false);

    useEffect(()=>{

        if(editor!==null && editorjscreated){
            console.log('editor has initialized');
            editor.clear();
            editor.render(contentData);
        } else {
            editor = new EditorJS({
                holder: "editorjs",
                placeholder:"Your data will appear here.",
                readOnly:true,
                data:contentData,
                tools: {
                  chart:Chart,
                  table:Table,
                  alert:Alert,
                  optionfour: {
                    class: Optionfour,
                    config:{
                      showAnswer:true,
                    }
                  },
                  mathk:{
                  class:Mathk,
                  inlineToolbar:true,
                  },
                  image:{
                    class:SimpleImage,
                    inlineToolbar:true,
                  },
                  embed:{
                    class:Embed,
                    inlineToolbar:true,
                  },
                  header: {
                    class: Header,
                    inlineToolbar:true,
                  },
                  list: {
                    class: List,
                    inlineToolbar:true,
                  },
                  checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                  },
                },
              });

              setEditorjscreated(true);
    
        }
    
    
          
    },[contentData]);



  
    return(
        <div>
              <div
               id="editorjs"
               sx={{
                 padding: "4px",
               }}
             ></div>

        </div>
    )
}