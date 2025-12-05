import React from 'react'
import { ApplicationCSVDownload } from '../applications/ApplicationCSVDownload';
import { EnemScoreImport } from '../enemScores/EnemScoreImport';
import { Box, Card, CardContent, Grid } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import { EnemSummaryCard } from '../enemScores/EnemSummaryCard';
import { EnemExportNumbers } from '../enemScores/EnemExportNumbers';


const ImportEnemScoreStep = () => {
    const { id: processSelectionId } = useParams<{ id: string }>();
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                    <EnemExportNumbers />
                </Grid>
                <Grid item xs={12} md={6}>
                    <EnemScoreImport />
                </Grid>
            </Grid>
        </Box>
    );
}

export { ImportEnemScoreStep };