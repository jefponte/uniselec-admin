import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useLazyExportConvocationListPdfsQuery } from '../convocationListSlice';



const DownloadConvocationPdfs: React.FC<{ listId: string }> = ({ listId }) => {
    const [triggerPdf, { isLoading: isGeneratingPdf }] = useLazyExportConvocationListPdfsQuery();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleDownloadPdf = async () => {
        setErrorMsg(null);
        try {
            const blob = await triggerPdf({ convocationListId: listId }).unwrap();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `resultados.pdf`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err: any) {
            const msg = err?.data?.error || err?.data?.message || 'Erro ao gerar PDF';
            setErrorMsg(msg);
        }
    };

    const lastProcessedBlobRef = React.useRef<Blob | null>(null);



    return (
        <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
        >
            {isGeneratingPdf ? "Gerando arquivo..." : "Lista de Convocação"}
        </Button>
    )
}

export { DownloadConvocationPdfs };