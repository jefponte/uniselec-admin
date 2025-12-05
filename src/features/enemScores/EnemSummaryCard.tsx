import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Button,
  CircularProgress,
  Tooltip,
  IconButton,
  Stack,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useGetEnemScoresSummaryQuery } from "./enemScoreSlice";

type Props = {
  processSelectionId: number;
};

export const EnemSummaryCard: React.FC<Props> = ({ processSelectionId }) => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetEnemScoresSummaryQuery({ processSelectionId });

  const handleRefresh = () => refetch();

  return (
    <Card>
      <CardHeader
        title="Status das Importações"
        subheader={
          data
            ? `${data.process_selection_name} (ID ${data.process_selection_id})`
            : `Processo #${processSelectionId}`
        }
        action={
          <Button size="small" onClick={handleRefresh} disabled={isFetching}>
            {isFetching ? "Atualizando..." : "Atualizar"}
          </Button>
        }
      />

      <CardContent>
        {isLoading && (
          <Box display="flex" alignItems="center" justifyContent="center" py={2}>
            <CircularProgress size={24} />
          </Box>
        )}

        {isError && !isLoading && (
          <Typography color="error" variant="body2">
            Não foi possível carregar o resumo do ENEM.
          </Typography>
        )}

        {!isLoading && !isError && data && (
          <Stack spacing={1.5}>
            {/* Total inscrições */}
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="body2">
                <strong>Total de inscrições:</strong> {data.total_applications}
              </Typography>
            </Box>

            {/* Processadas */}
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="body2">
                <strong>Total de Inscrições Processadas:</strong> {data.total_with_score}
              </Typography>

              <Tooltip
                title="Resposta do INEP já armazenada para estes candidatos"
                arrow
                placement="right"
              >
                <IconButton size="small">
                  <InfoOutlinedIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Não processadas */}
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="body2">
                <strong>Total de inscrições a serem processadas:</strong> {data.total_without_score}
              </Typography>

              <Tooltip
                title="Se este valor não for zero, ainda faltam processar notas. Talvez faltam envios ao INEP."
                arrow
                placement="right"
              >
                <IconButton size="small">
                  <InfoOutlinedIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Não encontrado pelo INEP */}
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="body2">
                <strong>Total de Inscrições não encontrado no INEP:</strong> {data.total_not_found_in_inep_file}
              </Typography>

              <Tooltip
                title="O INEP respondeu que estes números de inscrição não foram encontrados no banco de dados deles"
                arrow
                placement="right"
              >
                <IconButton size="small">
                  <InfoOutlinedIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};
