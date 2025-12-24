import { Button } from '@mui/material';
import React from 'react'
import { useLazyExportConvocationListCsvQuery } from '../convocationListSlice';



const DownloadConvocationCsv: React.FC<{ listId: string }> = ({ listId }) => {
    const [triggerExport, { isFetching, data: fileBlob, error }] =
        useLazyExportConvocationListCsvQuery();

    const handleDownload = () => {
        console.log(listId);
        triggerExport({
            convocationListId: listId
        });
    };


    const lastProcessedBlobRef = React.useRef<Blob | null>(null);

    React.useEffect(() => {
        if (!fileBlob) return;

        if (fileBlob === lastProcessedBlobRef.current) {
            return;
        }
        lastProcessedBlobRef.current = fileBlob;

        const url = window.URL.createObjectURL(fileBlob);
        const a = document.createElement("a");
        a.href = url;

        const extension ="zip";
        const baseName = "Listas de Convocacao-CSV";

        let filename = `${baseName}`;

        filename += `.${extension}`;

        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }, [fileBlob]);

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={handleDownload}
            disabled={isFetching}
        >

            {isFetching ? "Gerando arquivo..." : "Lista de Convocação"}
        </Button>
    )
}

export { DownloadConvocationCsv };