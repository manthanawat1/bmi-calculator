import * as React from "react";
import clsx from "clsx";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import { useButton } from "@mui/base/useButton";
import { ButtonProps } from "@mui/base/Button";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ResultDialog from "./ResultDialog";
import BodyRatioInterface from "./BodyRatioInterface";

const CustomButton = React.forwardRef(function CustomButton(
  props: ButtonProps,
  ref: React.ForwardedRef<any>
) {
  const { children, disabled } = props;
  const { active, focusVisible, getRootProps } = useButton({
    ...props,
    rootRef: ref,
  });

  return (
    <CustomButtonRoot
      {...getRootProps()}
      className={clsx({
        active,
        disabled,
        focusVisible,
      })}
    >
      {children}
    </CustomButtonRoot>
  );
});

interface DataInterface {
  getValue: () => (string | BodyRatioInterface)[] | undefined;
}

export default function UseButton({ getValue }: DataInterface) {
  const [modal, setModal] = React.useState<boolean>(false);
  const bmiValueRef = React.useRef<number>(0);
  const bmiClassNameRef = React.useRef<string>("");

  const handleGetValue = () => {
    const dataForCalculate = getValue();

    if (dataForCalculate) {
      const gender: string = dataForCalculate[0];
      const bodyRatio: BodyRatioInterface = dataForCalculate[1];

      if (gender && bodyRatio && bodyRatio.weight && bodyRatio.height) {
        const weight = parseFloat(bodyRatio.weight);
        const height = parseFloat(bodyRatio.height);
        handleCalculateBmi(weight, height, gender);
      }
    }
  };

  const handleCalculateBmi = (
    weight: number,
    height: number,
    gender: string
  ) => {
    const heightMetre = height / 100;
    bmiValueRef.current = parseFloat(
      (weight / (heightMetre * heightMetre)).toFixed(2)
    );
    handleBmiRange(gender);
  };

  const handleBmiRange = (gender: string) => {
    const bmi = bmiValueRef.current;
    let bmiClassName = "";
    if (gender === "male") {
      if (bmi >= 40) {
        bmiClassName = "obese(Class 2)";
      } else if (bmi < 40 && bmi >= 30) {
        bmiClassName = "obese(Class 1)";
      } else if (bmi < 30 && bmi >= 25) {
        bmiClassName = "overweight";
      } else if (bmi < 25 && bmi >= 18.5) {
        bmiClassName = "normal";
      } else {
        bmiClassName = "underweight";
      }
    } else {
      if (bmi >= 36) {
        bmiClassName = "obese(Class 2)";
      } else if (bmi < 36 && bmi >= 29) {
        bmiClassName = "obese(Class 1)";
      } else if (bmi < 29 && bmi >= 24) {
        bmiClassName = "overweight";
      } else if (bmi < 24 && bmi >= 17.5) {
        bmiClassName = "normal";
      } else {
        bmiClassName = "underweight";
      }
    }
    bmiClassNameRef.current = bmiClassName;
    handleOpenedModal();
  };

  const handleOpenedModal = () => {
    setModal(true);
  };

  const handleClosedModal = () => {
    setModal(false);
  };

  return (
    <Stack
      spacing={5}
      direction="row"
      justifyContent="center"
      className="pt-16 pb-8 md:pt-18 md:pb-12"
    >
      <CustomButton
        onClick={handleGetValue}
        disabled={false}
      >
        Calculate <b>BMI</b>
        <SkipNextIcon sx={{ color: "#fff" }} />
      </CustomButton>
      {bmiValueRef.current ? (
        <ResultDialog
          closeModal={handleClosedModal}
          openModal={modal}
          bmiValue={bmiValueRef.current}
          bmiClassNameValue={bmiClassNameRef.current}
        />
      ) : null}
    </Stack>
  );
}

const CustomButtonRoot = styled("button")(`
  font-family: 'prompt', sans-serif;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 1.5rem;
  letter-spacing: 1px;
  line-height: 1.5;
  background-color: #5403ce;
  border: 2px solid #5403ce;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #5403ce;
    border: 2px solid #5403ce;
    transition: all 0.2s ease-in-out;
  }

  &.disabled {
    background-color: #c7c7c7;
    color: #fff;
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }

   &:hover svg {
    color: #5403ce;
  }
`);
