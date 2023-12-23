"use client"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,



} from "@/components/ui/dialog"


import { use, useState } from "react";
import { Input } from "./ui/input";
import { useAppStore } from "@/store/store";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import toast, { Toaster } from 'react-hot-toast';




export function RenameModel() {

  const { user } = useUser()
  const [input, setInput] = useState('')


  const [fileId,
    setFileId,
    isRenameModelOpen,
    setIsRenameModelOpen,
    isDeleteModelOpen,
    setIsDeleteModelOpen,
    filename,
    setFilename] = useAppStore(state => [
      state.fileId,
      state.setFileId,

      state.isRenameModelOpen,
      state.setIsRenameModelOpen,
      state.isDeleteModelOpen,
      state.setIsDeleteModelOpen,
      state.filename,
      state.setFilename]);



      const RenameFile = async()=>{
        if(!user || !fileId) return;
      const toastId = toast.loading("Renaming...");


        await updateDoc(doc(db, "users", user.id, "files", fileId),{
          filename:input,
        })

        toast.success("renamed Successfuly",{
          id: toastId,
        })



        setInput("")

 setIsRenameModelOpen(false)
        



      }



return (

  <Dialog open={isRenameModelOpen}
    onOpenChange={(isOpen) => {
      setIsRenameModelOpen(isOpen)
    }}>



    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle> Are you sure want to delete?</DialogTitle>

         <Input id="link"
         defaultValue={filename}
         onChange={(e)=> setInput(e.target.value)}
         onKeyDownCapture = {(e)=> {
         if (e.key ==="Enter") {
          RenameFile()
         } 
        }
        
         
        }/>


        <div className="flex justify-end space-x-2 py-4">
 
        <Button variant="ghost"
        className="px-4"
        size="sm"
        onClick={()=> setIsRenameModelOpen(false)}>

        <span className="sr-only"> Cancel</span>
        <span>Cancel</span>

        </Button>

        <Button type="submit"
        className="px-4"
        size="sm"
        onClick={()=> RenameFile()}>

        <span className="sr-only"> Rename</span>
        <span>Rename</span>

        </Button>
        
           
        </div>




      </DialogHeader>


    </DialogContent>
  </Dialog>
)
  }









export default RenameModel;
