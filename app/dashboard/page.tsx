//@ts-nocheck
import DropzoneComponent from "@/components/Dropzone";
import TableWrapper from "@/components/table/TableWrapper";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import {auth} from "@clerk/nextjs"
import { collection, doc, getDocs } from "firebase/firestore";

const page = async () => {
    const { userId }  = auth();

    const docResults = await getDocs(collection(db, "users", userId!, "files"),)
   const skeletonFiles:FileType[]= docResults.docs.map(doc =>({
    id:doc.id,
    filename:doc.data().filename || doc.id,
    timeStamp: new Date(doc.data().timeStamp?.seconds * 1000) || undefined,
    fullname: doc.data().fullName,
    downloadURL:doc.data().downloadURL,
    type:doc.data().type,
    size:doc.data().size


   }))
  return (
    <div>

        <DropzoneComponent/>

        <section className="container space-y-5">
          <h2 className="font-bold">All Files</h2>

          <div>
            <TableWrapper skeletonFiles={skeletonFiles}>
               
            </TableWrapper>
          </div>


        </section>

      
    </div>
  )
}

export default page