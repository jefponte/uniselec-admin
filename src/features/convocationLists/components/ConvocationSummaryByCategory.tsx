// features/convocationLists/components/ConvocationSummaryByCategory.tsx
import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
} from '@mui/material';
import { useGetConvocationSummaryByCategoryQuery } from '../convocationListSlice';

type Props = { processSelectionId: string };

export const ConvocationSummaryByCategory: React.FC<Props> = ({ processSelectionId }) => {
    const { data, isLoading, error } =
        useGetConvocationSummaryByCategoryQuery({ processSelectionId });

    if (isLoading) {
        return <CircularProgress />;
    }
    if (error || !data) {
        return <Typography color="error">Erro ao carregar resumo.</Typography>;
    }

    // 1) Extrai todas as categorias únicas para formar as colunas
    const categories = Array.from(
        new Set(data.flatMap(row => Object.keys(row.counts)))
    );

    return (
        <Box mt={4}>

            <Paper>
                <Typography variant="h6" gutterBottom>
                    Resumo de Convocados por Modalidade
                </Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Lista</TableCell>
                            {categories.map(cat => (
                                <TableCell key={cat} align="right">
                                    {cat}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => (
                            <TableRow key={row.listId}>
                                <TableCell>{row.listName}</TableCell>
                                {categories.map(cat => (
                                    <TableCell key={cat} align="right">
                                        {row.counts[cat] ?? 0}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
};
