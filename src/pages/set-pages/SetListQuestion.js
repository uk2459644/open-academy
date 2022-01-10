import { useQuery } from "@apollo/client";
import {
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import { array } from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import AnswerShowEditorjsData from "../../components/editorjs/AnswerShowEditorjsData";
import AnswerShowSidebar from "../../components/editorjs/AnswerShowSidebar";
import DirectionWidget from "../../components/editorjs/DirectionWidget";
import QuestionDataSidebar from "../../components/editorjs/QuestionDataSidebar";
import SelectOptionWidget from "../../components/editorjs/SelectOptionWidget";
import ShowEditorjsData from "../../components/editorjs/ShowEditorjsData";
import Page from "../../components/Page";
import { GET_SETS_QUESTION } from "../../graphql/set/settquestion.query";
import { decrementUnit, incrementUnit, initiateQuestions, updateCurentUnit, updateQuestion } from "../../hooks/slices/QuestionsSlice";

export default function SetListQuestion() {
  const [ansSidebar, setAnssidebar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [skiploading, setSkiploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [units, setUnits] = useState([]);
  // const [currentUnit, setCurrentunit] = useState(0);

  const [corrects, setCorrects] = useState([]);
  const [wrongs, setWrongs] = useState([]);
  const [visiteds, setVisited] = useState([]);

  const [index,setIndex]=useState(0);
  const [option,setOption]=useState('');

  const { setCatId, setId } = useParams();

  const dispatch=useDispatch();

  const { data, error, loading } = useQuery(GET_SETS_QUESTION, {
    variables: { id: setId },
    skip: skiploading,
  });
  const {questionlist,currentUnit,submittingOption}=useSelector((state)=>state.questionslice);

  const optionFormik = useFormik({
    initialValues: {
      unit: "",
    },

    onSubmit: (values) => {
      setAnssidebar(false);
      // setCurrentunit(parseInt(values.unit));
      dispatch(updateCurentUnit({currentUnit:parseInt(values.unit)}));
      console.log("Answer side bar clicked with unit " + values.unit);
    },
  });

  const formik = useFormik({
    initialValues: {
      unit: "",
    },
    onSubmit: (values) => {
      setOpenFilter(false);
      console.log("filter button submitted from sidebar. "+values.unit);
     
      dispatch(updateCurentUnit({currentUnit:parseInt(values.unit)}));
     // console.log(currentUnit);
    },
  });

  const { resetForm, handleSubmit } = formik;

  if (loading) {
    return (
      <h2>
        Loading... Please wait <CircularProgress />
      </h2>
    );
  }

  if (error) {
    return `Error ${error}`;
  }

  if (data) {
    console.log(typeof data.setquestions);
    console.log("set category id" + setId);
    console.log(data);
    dispatch(initiateQuestions({questionlist:data.setquestions}));
    setUnits(data.setquestions);
    setSkiploading(true);
  }
  // const {questionlist}=useSelector((state)=>state.questionslice);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    // resetForm();
  };

  const handleOpenAnsBar = () => {
    setAnssidebar(true);
  };
  const handleCloseAnsBar = () => {
    setAnssidebar(false);
  };

  /**
   * 
   * function for iterating question , below are two functions
   *  named nextQuestion and prevQuestion
   * 
   */
  const nextQuestion = () => {
    if (currentUnit + 1 !== units.length) {
     // setCurrentunit(parseInt(currentUnit + 1));
      dispatch(incrementUnit());
     // console.log(currentUnit);
    }
  };
  const prevQuestion = () => {
    if (currentUnit !== 0) {
      dispatch(decrementUnit());
     // console.log(currentUnit);
    }
  };

  const handleSubmitted = () => {
    setSubmitted(!submitted);

    console.log(questionlist);

    if(questionlist instanceof Array){

      console.log(typeof questionlist);
      questionlist.map((item, index) => {
        item.content.blocks.map((block) => {
          if (block.type === "optionfour") {
            if (block.data.option === block.data.selected) {
              // correct option item
              let newcorrects = [...corrects];
              newcorrects.push(index);
              setCorrects(newcorrects);
            }
            if (block.data.option !== block.data.selected) {
              // wrong option item
              let newwrongs = [...wrongs];
              newwrongs.push(index);
              setWrongs(newwrongs);
            }
            if (block.data.selected === " ") {
              // visited option item
              let newvisiteds = [...visiteds];
              newvisiteds.push(index);
              setVisited(newvisiteds);
            }
          }
        });
      });

    }
   
  };

  const handleOptionselection=(questionNumber)=>{

    console.log('question number from set list page '+questionNumber);

    dispatch(updateQuestion({
      currentUnit:questionNumber-1,
      index:index,
      option:option
 }));

  }
  const getIndexOption=(option,index,questionNumber)=>{
    setIndex(index);
    setOption(option);

  }

  return (
    <Page title="Questions | Open Academy">
      <Container>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          {skiploading && units.length > 0 ? (
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={1}
              flexShrink={0}
              sx={{ my: 1 }}
            >
              <Button
                title="submit"
                color="info"
                variant="contained"
                onClick={handleSubmitted}
              >
                <Typography noWrap>Submit</Typography>
              </Button>
              {submitted === true ? (
                <AnswerShowSidebar
                  formikans={optionFormik}
                  isOpenFilterans={ansSidebar}
                  onOpenFilterans={handleOpenAnsBar}
                  onCloseFilterans={handleCloseAnsBar}
                  unitsans={questionlist}
                  corrects={corrects}
                  wrongs={wrongs}
                  visiteds={visiteds}
                  titleans="Answers status"
                />
              ) : (
                <QuestionDataSidebar
                  formik={formik}
                  isOpenFilter={openFilter}
                  onResetFilter={handleResetFilter}
                  onOpenFilter={handleOpenFilter}
                  onCloseFilter={handleCloseFilter}
                  units={questionlist}
                  title="Question"
                />
              )}
            </Stack>
          ) : (
            <div>No data available</div>
          )}
        </Stack>
        {skiploading && units.length > 0 ? (
          <div>
            {submitted === true ? (
              <AnswerShowEditorjsData
                contentData={questionlist[currentUnit].content}
              />
            ) : (
              <ShowEditorjsData 
              
              contentData={questionlist[currentUnit].content} 
              getIndexOption={getIndexOption}
              questionNumber={questionlist[currentUnit].qNo}
              
              />
            )}
          </div>
        ) : (
          <div>Sorry No data available.</div>
        )}
        {skiploading && units.length > 0 ? (
          <div>
            {
              submittingOption ? (
                  <CircularProgress />
              ):(
                <DirectionWidget questionNumber={questionlist[currentUnit].qNo} next={nextQuestion} prev={prevQuestion} submit={handleOptionselection} />
    
              )
            }
    
          </div>
             ) : (
          //   <SelectOptionWidget
          //   option={units[currentUnit].userOpt}
          //   optionFormik={optionFormik}
          //  />
          <h4>Nothing here.</h4>
        )}
      </Container>
    </Page>
  );
}
