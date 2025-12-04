import React from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  FormControlLabel,
  Switch,
  TextField,
  MenuItem,
  Divider,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useLazyExportApplicationsCsvQuery } from "./processSelectionSlice";

type LastRequest = {
  onlyEnem: boolean;
  enemYear: string;
};

export const ApplicationsStep = () => {
  const { id: processSelectionId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [onlyEnem, setOnlyEnem] = React.useState(false);
  const [enemYear, setEnemYear] = React.useState<string>(""); // "" = null

  const [lastRequest, setLastRequest] = React.useState<LastRequest | null>(
    null
  );

  const [triggerExport, { isFetching, data: fileBlob, error }] =
    useLazyExportApplicationsCsvQuery();

  const enemYears = [2019, 2020, 2021, 2022, 2023, 2024];

  React.useEffect(() => {
    if (!fileBlob || !processSelectionId || !lastRequest) return;

    const url = window.URL.createObjectURL(fileBlob);
    const a = document.createElement("a");
    a.href = url;

    const { onlyEnem, enemYear } = lastRequest;

    const extension = onlyEnem ? "zip" : "csv";
    const baseName = onlyEnem
      ? "enem_numbers_process"
      : "inscricoes_process";

    let filename = `${baseName}_${processSelectionId}`;
    if (enemYear) {
      filename += `_enem${enemYear}`;
    }
    filename += `.${extension}`;

    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }, [fileBlob, processSelectionId, lastRequest]);

  const handleDownload = () => {
    if (!processSelectionId) return;

    const enemYearNumber = enemYear ? Number(enemYear) : undefined;

    setLastRequest({
      onlyEnem,
      enemYear,
    });

    triggerExport({
      processSelectionId,
      enemYear: enemYearNumber,
      onlyEnem,
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      mt={4}
    >
      <Card sx={{ width: 520, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Gerenciar Inscrições
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Utilize as opções abaixo para configurar a exportação das inscrições.
          </Typography>

          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              mb: 2,
            }}
          >
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={onlyEnem}
                    onChange={(e) => setOnlyEnem(e.target.checked)}
                    color="primary"
                  />
                }
                label="Exportação formato INEP"
              />

              <TextField
                select
                label="Ano do ENEM (opcional)"
                value={enemYear}
                onChange={(e) => setEnemYear(e.target.value)}
                fullWidth
                size="small"
              >
                <MenuItem value="">
                  <em>Todos os anos</em>
                </MenuItem>
                {enemYears.map((year) => (
                  <MenuItem key={year} value={year.toString()}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>

              <Typography variant="caption" color="text.secondary">
                • Selecione "Exportação formato INEP" para obter um arquivo ZIP com a lista de arquivos no formato exigido pelo INEP.
              </Typography>
            </Stack>
          </Box>

          <Divider />

          {error && (
            <Typography color="error" variant="subtitle2" mt={1}>
              Erro ao gerar arquivo. Tente novamente.
            </Typography>
          )}
        </CardContent>

        <CardActions sx={{ justifyContent: "center", gap: 2, p: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownload}
            disabled={isFetching}
          >
            {isFetching ? "Gerando arquivo..." : "Download"}
          </Button>

          <Button variant="outlined" onClick={() => navigate(`/applications`)}>
            Ver Inscrições
          </Button>

          <Button
            variant="outlined"
            onClick={() =>
              alert("Funcionalidade de estatísticas em desenvolvimento")
            }
          >
            Estatísticas
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};