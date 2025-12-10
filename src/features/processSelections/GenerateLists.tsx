import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    Alert,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import {
    useGetApplicationOutcomesQuery,
} from '../applicationOutcomes/applicationOutcomeSlice';
import { useGetProcessSelectionQuery, useLazyExportEnemOutcomesPdfQuery } from './processSelectionSlice';
import { useGetEnemScoresSummaryQuery } from '../enemScores/enemScoreSlice';

const GenerateLists: React.FC = () => {
    const { id: processSelectionId } = useParams<{ id: string }>();

    const {
        data: enemScoresSummary,
        isLoading: isLoadingSummary,
        isFetching: isFetchingSummary,
        isError: isErrorSummary
    } = useGetEnemScoresSummaryQuery({ processSelectionId: Number(processSelectionId) });

    if (!processSelectionId) {
        return <Typography variant="h6" color="error">Selecione um Processo Seletivo</Typography>;
    }

    const [options] = useState({
        page: 1,
        perPage: 25,
        search: "",
        filters: { process_selection_id: processSelectionId } as Record<string, string>,
    });

    const { data: processSelection, isFetching: isFetchingProcess } = useGetProcessSelectionQuery({ id: processSelectionId });
    const { data: outcomesData, isFetching: isFetchingOutcomeData } = useGetApplicationOutcomesQuery(options);

    const [triggerPdf, { isLoading: isGeneratingPdf }] = useLazyExportEnemOutcomesPdfQuery();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleDownloadPdf = async () => {
        setErrorMsg(null);
        try {
            const blob = await triggerPdf({ processSelectionId }).unwrap();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `resultados_${processSelectionId}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err: any) {
            const msg = err?.data?.error || err?.data?.message || 'Erro ao gerar PDF';
            setErrorMsg(msg);
        }
    };

    const hasOutcomes = !!outcomesData?.meta?.total;

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    2. Resolver pendências
                </Typography>

                {/* Se houver erro, exibe Alert acima dos botões */}
                {errorMsg && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMsg}
                    </Alert>
                )}

                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                        mt: errorMsg ? 0 : 2,
                    }}
                >
                    <Button
                        component={Link}
                        to={`/deferidos-indeferidos/${processSelectionId}`}
                        variant="contained"
                        sx={{ fontSize: '12px' }}
                        disabled={!hasOutcomes}
                    >
                        Examinar Pendências
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={handleDownloadPdf}
                        disabled={!enemScoresSummary || enemScoresSummary.total_pending_outcomes > 0 || isGeneratingPdf || !hasOutcomes}
                    >
                        {isGeneratingPdf ? 'Gerando PDF...' : 'Download PDF Deferidos/Indeferidos'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default GenerateLists;
