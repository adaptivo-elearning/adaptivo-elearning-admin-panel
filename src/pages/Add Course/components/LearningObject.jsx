import { Delete, Menu } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Quiz from "./Quiz";
import UploadAudio from "./UploadAudio";
import UploadResources from "./UploadResources";
import UploadVideo from "./UploadVideo";
import Input from "../../../components/Input/Input";
import { conceptActions } from "../../../store/concept-slice";
import { useDispatch, useSelector } from "react-redux";
import Visual from "./LearningStyles/Visual";
import Verbal from "./LearningStyles/Verbal";
import Active from "./LearningStyles/Active";
import Sensing from "./LearningStyles/Sensing";
import Intuitive from "./LearningStyles/Intuitive";

const LearningObject = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [name, setName] = useState();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.element == null) {
      dispatch(
        conceptActions.addLO({
          id: props.num,
          name: "",
          visual: {},
          verbal: {},
          active: {
            quiz: [],
          },
          sensing: {},
          intuitive: {},
          quiz: [],
        })
      );
    }
  }, []);

  useEffect(() => {
    if (props.element != null) {
      setName(props.element.name);
    }
  }, [props.element]);

  const handleChange = (e) => {
    dispatch(
      conceptActions.modifyLOName({
        id: props.num,
        name: e.target.value,
      })
    );
    setName(e.target.value);
  };
  return (
    <div className="section mt-3">
      <div className="section-head">
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item onClick={toggleCollapse} xs={11}>
            <Grid container spacing={2}>
              <Grid item>
                <Menu />
              </Grid>
              <Grid item>
                <h3>Learning Object {props.num} : </h3>
              </Grid>
              <Grid item>
                <h3>{name}</h3>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Delete onClick={props.delete} />
          </Grid>
        </Grid>
      </div>
      {!collapsed && (
        <div className="section-body">
          <Input label="Learning Object Name" value={name} id={"name"} type="text" name={"name"} onChange={handleChange} placeholder="Please enter the LO name" hideLabel={false} />
          <div className="lo-caption">Upload materials for different learning styles</div>
          <Visual loId={props.num} />
          <Verbal loId={props.num} />
          <Active loId={props.num} />
          <Sensing loId={props.num} />
          <Intuitive loId={props.num} />
          <div className="lo-caption">Upload quiz to test learning object knowledge</div>
          <Quiz loId={props.num} title="Quiz" />
          {/* <UploadVideo loId={props.num} />
          <UploadAudio loId={props.num} />
          <UploadResources loId={props.num} />
          <Quiz loId={props.num} /> */}
        </div>
      )}
    </div>
  );
};

export default LearningObject;
