import React from 'react'
import { ApplicationCSVDownload } from '../applications/ApplicationCSVDownload';
import { EnemScoreImport } from '../enemScores/EnemScoreImport';
import { Card, CardContent, Grid } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";


const ImportEnemScoreStep = () => {
    const { id: processSelectionId } = useParams<{ id: string }>();
    return (
        <div>


            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={12}>
                    <EnemScoreImport />
                </Grid>
            </Grid>
        </div>
    );
}



export { ImportEnemScoreStep };
