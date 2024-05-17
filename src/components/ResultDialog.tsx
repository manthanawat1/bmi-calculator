import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { styled } from "@mui/material/styles";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";
import SentimentNeutralOutlinedIcon from "@mui/icons-material/SentimentNeutralOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import SentimentVeryDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentVeryDissatisfiedOutlined";
import SickOutlinedIcon from "@mui/icons-material/SickOutlined";

import ContextInterface from "./ContextInterface";
import KeyContextInterface from "./KeyContextInterface";
import context from "../../src/context.json";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

interface PropsInterface {
  closeModal: () => void;
  openModal: boolean;
  bmiValue: number;
  bmiClassNameValue: keyof KeyContextInterface;
}

export default function AlertDialogSlide({
  closeModal,
  openModal,
  bmiValue,
  bmiClassNameValue,
}: PropsInterface) {
  const [groupName, setGroupName] = React.useState<string>("");
  const [groupDetail, setGroupDetail] = React.useState<string>("");
  const [recommend, setRecommend] = React.useState<string[]>([]);

  React.useEffect(() => {
    const bmiContext = context[bmiClassNameValue] as ContextInterface;
    setGroupName(bmiContext.group_name);
    setGroupDetail(bmiContext.group_detail);
    setRecommend(bmiContext.others);
  }, [bmiClassNameValue]);

  const IconShowing = () => {
    switch (bmiClassNameValue) {
      case "obese(Class 2)":
        return (
          <SickOutlinedIcon sx={{ fontSize: "4.5rem", color: "#e74c3c" }} />
        );
      case "obese(Class 1)":
        return (
          <SentimentVeryDissatisfiedOutlinedIcon
            sx={{ fontSize: "4.5rem", color: "#e67e22" }}
          />
        );
      case "overweight":
        return (
          <SentimentDissatisfiedOutlinedIcon
            sx={{ fontSize: "4.5rem", color: "#f1c40f" }}
          />
        );
      case "normal":
        return (
          <MoodOutlinedIcon sx={{ fontSize: "4.5rem", color: "#3498db" }} />
        );
      case "underweight":
        return (
          <SentimentNeutralOutlinedIcon
            sx={{ fontSize: "4.5rem", color: "#2ecc71" }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <CustomizedDialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>
          <b>BMI ของคุณคือ {bmiValue}</b>
        </DialogTitle>
        <DialogContent>
          <div className="content-text">
            <div className="content-header-container">
              <IconShowing />
              <div className="my-auto">
                <strong className="header-text">{groupName}</strong>
                <br />
                <span className="text">{groupDetail}</span>
              </div>
            </div>
          </div>
          <div className="content-text">
            <strong className="header-text">ข้อแนะนำ</strong>
            <ol>
              {recommend.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ol>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>ปิดหน้าต่าง</Button>
        </DialogActions>
      </CustomizedDialog>
    </React.Fragment>
  );
}

const CustomizedDialog = styled(Dialog)`
  & .MuiPaper-root {
    border-radius: 30px;
  }

  & .MuiTypography-root {
    font-family: "Prompt", sans-serif;
    font-weight: 300;
    font-size: 1.2rem;
    background-color: #5403ce;
    color: #fff;
  }

  & .MuiTypography-root > b {
    font-weight: 600;
  }

  & .MuiDialogContent-root {
    margin-top: 20px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }

  & .MuiDialogContent-root > .content-text {
    font-family: "Prompt", sans-serif;
  }

  & .MuiDialogContent-root > .content-text > .content-header-container {
    display: flex;
    gap: 2rem;
  }

  & .MuiDialogContent-root > .content-text > .header-text {
    color: #5403ce;
    font-size: 1.2rem;
    font-weight: 500;
  }

  & .MuiDialogContent-root > .content-text > .text {
    font-weight: 300;
  }

  & .MuiDialogContent-root > .content-text > ol {
    list-style: auto;
    padding: 0.5rem 0 0.5rem 1.2rem;
  }

  & .MuiDialogActions-root {
    padding: 0.625rem 1.25rem;
  }

  & .MuiDialogActions-root > button {
    font-family: "Prompt", sans-serif;
    color: #fff;
    background-color: #5403ce;
    border-radius: 30px;
    padding: 6px 18px;
    border: 1px solid #5403ce;
  }

  & .MuiDialogActions-root > button:hover {
    color: #5403ce;
    background-color: #fff;
    border: 1px solid #5403ce;
  }
`;
