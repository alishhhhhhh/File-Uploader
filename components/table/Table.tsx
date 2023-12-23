"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileType } from "@/typings";
import { Button } from "@radix-ui/themes";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useAppStore } from "@/store/store";
import DeleteModel from "../DeleteModel";
import RenameModel from "../RenameModel";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  async function deletefile() {
    
    
  }



const [  fileId, 
  setFileId,
  isRenameModelOpen,
  setIsRenameModelOpen,
   isDeleteModelOpen,
     setIsDeleteModelOpen,
     filename,
      setFilename] = useAppStore(state =>[
   state.fileId,
state.setFileId,

   state.isRenameModelOpen,
   state.setIsRenameModelOpen,

  state.isDeleteModelOpen,
  state.setIsDeleteModelOpen,
  state.filename,
state.setFilename]);

const openDeleteModal = (fileId : string) => {
  setFileId(fileId);
  setIsDeleteModelOpen(true)
}

const openRenameModal = (fileId: string, filename:string) =>{
  setFileId(fileId);
  setFilename(filename)
  setIsRenameModelOpen(true)

}


  return (
    <div className="rounded-md border">
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
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>



          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >

                <DeleteModel/>
                <RenameModel/>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === "timeStamp" ? (
                      <div className="flex flex-col">
                        {" "}
                        <div className="text-sm">
                          {" "}
                          {(cell.getValue() as Date).toLocaleDateString()}{" "}
                        </div>
                        <div className="text-xs text-gray-400">
                          {" "}
                          {(cell.getValue() as Date).toLocaleTimeString()}
                        </div>{" "}
                      </div>
                    ) : cell.column.id === "filename" ? (
                      <p
                        className=" underline flex items-center text-sky-600 hover:cursor-pointer"
                        onClick={() => {
                          openRenameModal(    
                               (row.original as FileType).id,      
                               (row.original as FileType).filename
                          )
                        }}
                      >
                        {" "}
                        {cell.getValue() as string}
                        {" "}   <MdEdit className='ml-1' />
                      </p>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}

                <TableCell key={(row.original as FileType).id}>
                  <Button
                    variant="outline"
                    onClick={() => {
                      openDeleteModal((row.original as FileType).id);
                    }}
                  >
                    <MdDelete />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                noo files
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
