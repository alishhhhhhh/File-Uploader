
//@ts-nocheck

"use client"
import { FileType } from  "@/typings"
import React, { use, useEffect, useState } from 'react'
import { DataTable } from "./Table"
import { columns } from "./Columns"
import { Button } from "../ui/button"
import { useUser } from "@clerk/nextjs"
import { collection, orderBy, query } from "firebase/firestore"
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from "@/firebase"
import { Skeleton } from "@/components/ui/skeleton"




const TableWrapper = ({skeletonFiles} : {skeletonFiles: FileType[]}) => {
const {user} = useUser();
const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
const [sort, setSort] = useState<"asc" | "desc"> ("desc");


    const [docs, loading, error] = useCollection(
      user && 
      query(
        collection(db ,"users", user.id, "files"),
        orderBy("timeStamp", sort)
      )
    );

    // not necessary
    useEffect(()=>{
        if (!docs) return;
        const files= docs.docs.map(doc =>({
            id: doc.id,
            filename: doc.data().filename || doc.id,
            timeStamp: new Date(doc.data().timeStamp?.seconds * 1000) || undefined,
            fullname: doc.data().fullName,
            downloadURL:doc.data().downloadURL,
            type:doc.data().type,
            size:doc.data().size,


        
        }))

        console.log(files);

        setInitialFiles(files)


    }, [docs])

    if(docs?.docs.length=== undefined){
        return(
            <div className="flex flex-col ">
                <Button variant={"outline"} 
                className="ml-auto w-36 h-10 mb-5"> 
                <Skeleton className="h-5 w-full"/>
                </Button>

<div className="border rounded-lg">
    <div className="border-b  h-12">
        {skeletonFiles.map((file)=>(
            <div key={file.id}
            className="flex  items-center  p-2  space-x-4 w-full">

<Skeleton className="h-12  w-12"/>
<Skeleton className="h-12 w-full"/>
            </div>
         ) )}

{skeletonFiles.length === 0 && (
    <div className="flex items-center space-x-4 p-2 w-full">
        <Skeleton className="h-12 w-12"/>
<Skeleton className="h-12 w-full"/>
    </div>
)}

    </div>

</div>

            </div>
        )
    }





  return (
    <div className="space-y-5 pb-10  flex flex-col" > 

        <Button className=" ml-auto w-fit "
        onClick={()=> setSort(sort==="desc"? "asc" : "desc")}>Sort By 
        
        {sort==="desc" ? " Newest" : "Oldest"}
            
            </Button> 
        <DataTable
        columns={columns}
        data={initialFiles} />


    </div>
  )
}

export default TableWrapper