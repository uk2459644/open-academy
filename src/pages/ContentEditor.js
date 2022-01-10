// material
import { styled } from "@material-ui/core/styles";
import { Card, Container, Stack } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
// layouts

// components
import Page from "../components/Page";

import { useEffect, useRef, useState } from "react";
// editorjs elements
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Mathk from "editorjs-math-uk";
import SimpleImage from "editorjs-simpleimage-uk";
import Embed from "editorjs-embed-uk";
import Alert from "editorjs-alert-uk";
import Option from "editorjs-options-uk";
import Optionfour from 'editorjs-4-option';
import Chart from "editorjs-chart";

import Table from "@editorjs/table";
import ContentSpeedDial from "../components/editorjs/ContentSpeedDial";
import ContentSidebar from "../components/editorjs/ContentSidebar";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { PUBLISH_DUNIT, UPDATE_DUNIT } from "../graphql/dunit/dunit.mutation";
const Checklist = require("@editorjs/checklist");

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  //   maxWidth: 480,
  width: "100%",
  margin: "auto",
  // marginTop:'16px',
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "normal",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

let editor = null;
export default function ContentEditor() {
  const [progress, setProgress] = useState(false);
  const [isContent, setIscontent] = useState(false);

  const [content, setContent] = useState({});

  const editorRef = useRef();

  // const {data,error,loading}=useQuery(GET_SETS);

  const { userid, displayName } = useSelector((state) => state.authenar);

  const [addDunit] = useMutation(PUBLISH_DUNIT);
  const [updateDunit] = useMutation(UPDATE_DUNIT);

  useEffect(() => {
    editor = new EditorJS({
      holder: "editorjs",
      placeholder: "You can write from here.",
      tools: {
        chart: Chart,
        table: Table,
        alert: Alert,
        optionfour: {
          class: Optionfour,
          config:{
            showAnswer:false,
          }
        },
        mathk: {
          class: Mathk,
          inlineToolbar: true,
        },
        image: {
          class: SimpleImage,
          inlineToolbar: true,
        },
        embed: {
          class: Embed,
          inlineToolbar: true,
        },
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
      },
    });
  }, []);

  const copyDraft = () => {
    if (editor !== null) {
      editor
        .save()
        .then((savedData) => {
          navigator.clipboard.writeText(JSON.stringify(savedData));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleContent = () => {
    if (editor !== null) {
      editor
        .save()
        .then((savedData) => {
          setContent(savedData);
          setIscontent(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDraft = () => {
    if (editor !== null) {
      setProgress(true);

      editor
        .save()
        .then((savedData) => {
          console.log(JSON.stringify(savedData));

          addDunit({
            variables: {
              userid: userid,
              title: displayName,
              content: savedData,
            },
          })
            .then((res) => {
              console.log("dunit mutation added successfully.");
              console.log(res.data.createDunit.dunit);
              setProgress(false);
            })
            .catch((error) => {
              console.log("dunit add mutaion error.");
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <RootStyle title="Content Editor | Open Academy">
      <Container>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          {isContent ? <ContentSidebar content={content}/> : <></>}
        </Stack>

        {/* You can write down here. just write it. */}

        {progress ? (
          <CircularProgress>Uploading data ...</CircularProgress>
        ) : (
          <div>
            <ContentStyle>
              <div
                ref={editorRef}
                id="editorjs"
                sx={{
                  padding: "4px",
                }}
              ></div>
            </ContentStyle>

            <ContentSpeedDial
              handleDraft={handleDraft}
              copyDraft={copyDraft}
              handleContent={handleContent}
            />
          </div>
        )}
      </Container>
    </RootStyle>
  );
}
