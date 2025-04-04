import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface TextBoxConfigurationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
}

const TextBoxConfigurationDialog: React.FC<TextBoxConfigurationDialogProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSave = () => {
    onSave(name, description);
    setName("");
    setDescription("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl font-semibold">
            Configuration
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="description">Message</Label>
            <textarea
              id="description"
              placeholder="Enter..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-32 p-3 border border-input bg-background rounded-md text-sm"
            />
          </div>
        </div>
        <div className="h-px bg-gray-200 w-full"></div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSave}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TextBoxConfigurationDialog;
