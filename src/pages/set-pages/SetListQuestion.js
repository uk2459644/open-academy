import { useQuery } from "@apollo/client";
import { CircularProgress, Container, Stack } from "@material-ui/core";
import { useFormik } from "formik";
import { useState } from "react";
import { useParams } from "react-router";
import QuestionDataSidebar from "../../components/editorjs/QuestionDataSidebar";
import SelectOptionWidget from "../../components/editorjs/SelectOptionWidget";
import ShowEditorjsData from "../../components/editorjs/ShowEditorjsData";
import Page from "../../components/Page";
import { GET_SETS_QUESTION } from "../../graphql/set/settquestion.query";

export default function SetListQuestion() {
  const [openFilter, setOpenFilter] = useState(false);
  const [skiploading, setSkiploading] = useState(false);
  const [units, setUnits] = useState([]);
  const [currentUnit, setCurrentunit] = useState(0);

  const { setCatId, setId } = useParams();

  const { data, error, loading } = useQuery(GET_SETS_QUESTION, {
    variables: { id: setId },
    skip: skiploading,
  });
  const optionFormik=useFormik({
    initialValues:{
      option:'',
      status:'',
    },
    
    onSubmit:(values)=>{
       //sssevent.preventDefault();
        console.log(values);
        let unit=units[currentUnit];
        let Units=[...units];
        let updatedUnit={
          ...unit,
          userOpt:values.option,
          status:values.status
        }
        Units[currentUnit]=updatedUnit;
        setUnits(Units);
        console.log(updatedUnit);
      //  setCurrentunit(currentUnit+1);
    },
  });

  const formik = useFormik({
    initialValues: {
      unit: "",
    },
    onSubmit: (values) => {
      setOpenFilter(false);
      console.log("filter button submitted.");
      setCurrentunit(values.unit);
      console.log(values.unit);
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
    setUnits(data.setquestions);
    setSkiploading(true);
  }

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
              <QuestionDataSidebar
                formik={formik}
                isOpenFilter={openFilter}
                onResetFilter={handleResetFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
                units={units}
                title="Question"
              />
            </Stack>
          ) : (
            <div>No data available</div>
          )}
        </Stack>
        {skiploading && units.length > 0 ? (
          <ShowEditorjsData contentData={units[currentUnit].content} />
        ) : (
          <div>Sorry No data available.</div>
        )}
        {
          skiploading && units.length > 0 ?(
            <SelectOptionWidget 
            option={units[currentUnit].userOpt}
            optionFormik={optionFormik}
           />
          ):(
          <h4>Nothing here.</h4>

          )
        }
     
      </Container>
    </Page>
  );
}
