
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  processName: string;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  processName,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle className="text-xl">
            "Are You Sure You Want To Delete '{processName}'?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-red-500 font-medium">
            You Cannot Undo This Step
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="h-px bg-gray-200 w-full my-2"></div>
        <AlertDialogFooter className="sm:justify-center gap-2">
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Yes
          </AlertDialogAction>
          <AlertDialogCancel onClick={onClose} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
            No
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
