import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import useRequests from "@/hooks/useRequests";
import useSelectors from "@/hooks/useSelectors";
import { CartProps } from "@/types/interfaces/interfaces";

const columns: ColumnDef<CartProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => (
      <div className="font-medium capitalize">{row.getValue("brand")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: () => {
      return <div className="text-left font-medium">Description</div>;
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: () => {
      return <div className="font-medium">Quantity</div>;
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div>Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      // Format the price as a dollar price
      const formatted = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(price);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "totalPrice",
    header: () => <div>Total</div>,
    cell: ({ row }) => {
      const total = parseFloat(row.getValue("totalPrice"));

      // Format the total as a dollar total
      const formattedTotal = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(total);

      return <div className="font-medium">{formattedTotal}</div>;
    },
  },
];

const Cart = () => {
  const { fetchCart } = useRequests();
  const { cart } = useSelectors();
  const { id } = useParams();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [data, setData] = useState<CartProps[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const onDelete = async () => {
    try {
      const response = await axios.post(`products/remove_from_cart/${id}`, {
        selectedProducts,
      });
      console.log(response.data.message);
      fetchCart(id ?? "");
    } catch (error) {
      console.log(error);
    }
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  useEffect(() => {
    setSelectedProducts(
      table.getSelectedRowModel().rows.map((row) => row.original.id),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getSelectedRowModel()]);

  useEffect(() => {
    fetchCart(id ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const data = cart.map((item) => ({
      id: item.id,
      brand: item.brand,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
      totalPrice: item.totalPrice,
    }));
    setData(data);
  }, [cart]);

  return (
    <div className="flex w-full justify-center p-5">
      <Card className="w-full max-w-5xl p-5">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Your Cart ({data.length})
            </span>
            {table.getIsAllPageRowsSelected() ||
            table.getIsSomeRowsSelected() ? (
              <Toggle className="hover:bg-red-600/10" onClick={onDelete}>
                <Trash2 size={20} className="cursor-pointer text-red-600" />
              </Toggle>
            ) : null}
          </CardTitle>
          <CardDescription>
            Manage your cart and checkout when you're ready.
          </CardDescription>
        </CardHeader>

        <div className="mt-5 rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, i) => (
                  <TableRow
                    key={i}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Your cart is empty.
                  </TableCell>
                </TableRow>
              )}
              {pagination.pageSize >= table.getRowModel().rows?.length &&
                Array.from({
                  length:
                    pagination.pageSize - table.getRowModel().rows?.length,
                }).map((_, index) => (
                  <TableRow className="border-0" key={index}>
                    <TableCell>&nbsp;</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Cart;
