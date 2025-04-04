import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Star,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  Edit,
  Copy,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

export interface WorkflowRunHistoryItem {
  date: string;
  status: "Passed" | "Failed";
}

export interface WorkflowItemData {
  id: string;
  name: string;
  timestamp: string;
  author: string;
  description: string;
  isFavorite: boolean;
  runHistory?: WorkflowRunHistoryItem[];
}

export interface WorkflowItemProps extends WorkflowItemData {
  onExecute: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const WorkflowItem: React.FC<WorkflowItemProps> = ({
  id,
  name,
  timestamp,
  author,
  description,
  isFavorite,
  runHistory,
  onExecute,
  onEdit,
  onDelete,
  onToggleFavorite,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="border-b border-gray-200">
        <div className="flex items-center py-4 px-2">
          <div className="flex items-center space-x-4 w-1/4">
            <Star
              className={`cursor-pointer ${
                isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => onToggleFavorite(id)}
            />
            <span className="font-medium text-gray-800">{name}</span>
          </div>
          <div className="w-1/6 text-sm text-gray-600">#{id}</div>
          <div className="w-1/6 text-sm text-gray-600">{author}</div>
          <div className="w-1/4 text-sm text-gray-600 truncate">
            {description}
          </div>
          <div className="flex items-center space-x-2 ml-auto">
            <Button variant="outline" size="sm" onClick={() => onExecute(id)}>
              Execute
            </Button>
            <Button variant="outline" size="sm" onClick={() => onEdit(id)}>
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDelete}>
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" onClick={handleToggleExpand}>
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {expanded && runHistory && (
          <div className="ml-8 mb-4 border-l-2 border-gray-200 pl-4">
            {runHistory.map((run, index) => (
              <div key={index} className="flex items-center space-x-4 py-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <div className="text-sm text-gray-600">{run.date}</div>
                <div
                  className={`text-xs px-2 py-0.5 rounded ${
                    run.status === "Passed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {run.status}
                </div>
                <Button variant="ghost" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        processName={name}
      />
    </>
  );
};

export default WorkflowItem;
