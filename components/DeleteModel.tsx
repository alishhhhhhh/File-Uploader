 "use client"
 import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,


  
} from "@/components/ui/dialog"
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { revalidatePath } from "next/cache";
import toast from "react-hot-toast";



export function DeleteModel() {

  const {user} = useUser()

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
  

     
  async function deleteFile() {


    if (!user ||  !fileId) return;
    const toastId = toast.loading("Deleting.");



    const fileRef = ref(storage,`users/${user.id}/files/${fileId}`)
    console.log(fileRef);
    
    try{
      deleteObject(fileRef).then(async() =>{
     await deleteDoc(doc(db, "users", user.id, "files", fileId))
     .then(()=>{

      toast.success("Deleted Successfuly",{
        id: toastId,
      })
     })
     .finally(()=>{
      setIsDeleteModelOpen(false)
     })
    })

    } catch(error){
      console.log(error);
      toast.error("Error occured while Deleting",{
        id: toastId,
      })

    }
    
   
  setIsDeleteModelOpen(false)

  }

  return (
    <Dialog open={isDeleteModelOpen} 
    onOpenChange={( isOpen) => {
        setIsDeleteModelOpen(isOpen)
    }}>


      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Are you sure want to delete?</DialogTitle>
          <DialogDescription>
once you do it cant be undone

          </DialogDescription>
        </DialogHeader>
     
     <div className="flex py-3 space-x-2">
    
    <Button
    size='sm'
    variant={'ghost'}
    className="px-3 flex-1"
    onClick={  ()=> setIsDeleteModelOpen(false)}>

  <span className="sr-only"> Cancel</span>
  <span className=""> Cancel</span>
    </Button>

    <Button
    size='sm'
    type="submit"
    className="px-3 flex-1"
    onClick={()=> deleteFile()}>

  <span className="sr-only"> Delete</span>
  <span className=""> Delete</span>
    </Button>


     </div>
        <DialogFooter>
          <Button type="submit"


          
          >Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}




  


export default DeleteModel



