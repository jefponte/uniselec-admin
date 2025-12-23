// src/features/processSelections/SummaryPage.tsx

import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetAdmissionCategoryStatsQuery, useGetCampusStatsQuery, useGetCourseCategoryStatsQuery, useGetCourseStatsQuery } from "./processSelectionSlice";
import StatsTable from "./components/StatsTable";



export const SummaryPage = () => {
  const { id: processSelectionId } = useParams<{ id: string }>();

  // Estatísticas gerais
  const {
    data: catStats,
    isLoading: loadingCat,
    error: errCat,
  } = useGetAdmissionCategoryStatsQuery({
    processSelectionId: processSelectionId!,
  });

  const {
    data: courseStats,
    isLoading: loadingCourse,
    error: errCourse,
  } = useGetCourseStatsQuery({ processSelectionId: processSelectionId! });

  const {
    data: campusStats,
    isLoading: loadingCampus,
    error: errCampus,
  } = useGetCampusStatsQuery({ processSelectionId: processSelectionId! });

  // Estatísticas por curso + categoria
  const {
    data: courseCatStats,
    isLoading: loadingCourseCat,
    error: errCourseCat,
  } = useGetCourseCategoryStatsQuery({
    processSelectionId: processSelectionId!,
  });

  // Se qualquer um dos gerais ainda carrega, mostra spinner
  if (loadingCat || loadingCourse || loadingCampus || loadingCourseCat) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      {/* Cabeçalho */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4">
          Resumo do Processo Seletivo #{processSelectionId}
        </Typography>
      </Paper>

      {/* Linhas de 3 cards */}
      <Grid container spacing={3}>
        {/* Por Categoria */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Por Categoria de Ingresso
            </Typography>
            {errCat ? (
              <Typography color="error">Erro ao carregar.</Typography>
            ) : (
              <StatsTable
                rows={catStats!}
                columns={[
                  { field: "admission_category", headerName: "Categoria", flex: 1 },
                  {
                    field: "total",
                    headerName: "Total",
                    type: "number",
                    flex: 0.5,
                    align: "right",
                  },
                ]}
              />
            )}
          </Paper>
        </Grid>

        {/* Por Curso */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Por Curso
            </Typography>
            {errCourse ? (
              <Typography color="error">Erro ao carregar.</Typography>
            ) : (
              <StatsTable
                rows={courseStats!}
                columns={[
                  { field: "course_name", headerName: "Curso", flex: 1 },
                  {
                    field: "total",
                    headerName: "Total",
                    type: "number",
                    flex: 0.5,
                    align: "right",
                  },
                ]}
              />
            )}
          </Paper>
        </Grid>

        {/* Por Campus */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Por Campus
            </Typography>
            {errCampus ? (
              <Typography color="error">Erro ao carregar.</Typography>
            ) : (
              <StatsTable
                rows={campusStats!}
                columns={[
                  { field: "campus_name", headerName: "Campus", flex: 1 },
                  {
                    field: "total",
                    headerName: "Total",
                    type: "number",
                    flex: 0.5,
                    align: "right",
                  },
                ]}
              />
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Seção extra: Por Curso e Categoria */}
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Por Curso e Categoria de Ingresso
          </Typography>
          {errCourseCat ? (
            <Typography color="error">Erro ao carregar.</Typography>
          ) : (
            <StatsTable
              rows={courseCatStats!}
              columns={[
                { field: "course_name", headerName: "Curso", flex: 1 },
                {
                  field: "admission_category",
                  headerName: "Categoria",
                  flex: 1,
                },
                {
                  field: "total",
                  headerName: "Total",
                  type: "number",
                  flex: 0.5,
                  align: "right",
                },
              ]}
            />
          )}
        </Paper>
      </Box>
    </Box>
  );
};
