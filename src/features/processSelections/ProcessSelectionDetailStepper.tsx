import { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProcessSelectionQuery } from "./processSelectionSlice";

import { ProcessSelectionDetails } from "./ProcessSelectionDetails";
import { ApplicationsStep } from "./ApplicationsStep";
import { ImportEnemScoreStep } from "./ImportEnemScoreStep";
import { ApplicationOutcomesStep } from "./ApplicationOutcomesStep";
import { ProcessSelectionConvocation } from "./ProcessSelectionConvocation";

export const ProcessSelectionDetailStepper = () => {
  const navigate = useNavigate();
  const { id, step } = useParams<{ id: string; step: string }>();

  const { data: processSelection, isLoading } = useGetProcessSelectionQuery({ id: id! });

  const stepLabels = [
    "Processo Seletivo",
    "Inscrições",
    "Notas do INEP",
    "Resultados",
    "Convocações"
  ];

  const maxStep = stepLabels.length - 1;
  const initialStep = Math.min(Math.max(Number(step) || 0, 0), maxStep);

  const [activeStep, setActiveStep] = useState<number>(initialStep);

  useEffect(() => {
    setActiveStep(initialStep);
  }, [initialStep]);

  const goToStep = (newStep: number) => {
    navigate(`/process-selections/details/${id}/step/${newStep}`);
  };

  const handleNext = () => goToStep(activeStep + 1);
  const handleBack = () => goToStep(activeStep - 1);

  if (isLoading) return <Typography>Carregando...</Typography>;
  if (!processSelection) return <Typography>Processo Seletivo não encontrado.</Typography>;

  return (
    <Box sx={{ mt: 0, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 3, textAlign: "center" }}>
        <Typography variant="h4">Gerenciamento do Processo Seletivo</Typography>
      </Paper>

      <Stepper activeStep={activeStep} alternativeLabel>
        {stepLabels.map((label: string, index: number) => (
          <Step key={index} onClick={() => goToStep(index)}>
            <StepLabel sx={{ cursor: "pointer" }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Voltar
        </Button>
        <Button disabled={activeStep === maxStep} onClick={handleNext}>
          Próximo
        </Button>
      </Box>

      <Box sx={{ p: 3, mt: 3, minHeight: 300 }}>
        {activeStep === 0 && <ProcessSelectionDetails />}
        {activeStep === 1 && <ApplicationsStep />}
        {activeStep === 2 && <ImportEnemScoreStep />}
        {activeStep === 3 && <ApplicationOutcomesStep />}
        {activeStep === 4 && <ProcessSelectionConvocation />}
      </Box>
    </Box>
  );
};
