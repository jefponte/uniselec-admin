// src/features/processSelections/ApplicationsStep.tsx
import React from "react";
import { Box, Button, Typography, Card, CardContent, CardActions } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useLazyExportApplicationsCsvQuery } from "./processSelectionSlice";


export const ApplicationsStep = () => {
  const { id: processSelectionId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [triggerExport, { isFetching, data: csvBlob, error }] =
    useLazyExportApplicationsCsvQuery();

  React.useEffect(() => {
    if (csvBlob) {
      const url = window.URL.createObjectURL(csvBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `inscricoes_process_${processSelectionId}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [csvBlob, processSelectionId]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      mt={4}
    >
      <Card sx={{ width: 480, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Gerenciar Inscrições
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Utilize os botões abaixo para exportar, visualizar ou analisar as inscrições.
          </Typography>
          {error && (
            <Typography color="error" variant="subtitle2" mt={1}>
              Erro ao gerar CSV. Tente novamente.
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: "center", gap: 2, p: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => processSelectionId && triggerExport(processSelectionId)}
            disabled={isFetching}
          >
            {isFetching ? "Gerando CSV..." : "Download CSV"}
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate(`/applications`)}
          >
            Ver Inscrições
          </Button>

          <Button
            variant="outlined"
            onClick={() => alert("Funcionalidade de estatísticas em desenvolvimento")}
          >
            Estatísticas
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};