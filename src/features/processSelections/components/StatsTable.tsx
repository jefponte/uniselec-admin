import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface StatsTableProps<Row> {
  rows: Row[];
  columns: GridColDef[];
}

export default function StatsTable<Row extends object>({
  rows,
  columns,
}: StatsTableProps<Row>) {
  // Garante que cada linha tenha um `id`
  const data = rows.map((r, i) => ({ id: i, ...r }));
  return (
    <div style={{ height: 300 }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSizeOptions={[5]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } }
        }}
        hideFooterPagination
        disableColumnMenu
        density="compact"
      />
    </div>
  );
}
