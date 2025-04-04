
import React from "react";
import WorkflowItem, { WorkflowItemData, WorkflowItemProps } from "./WorkflowItem";

interface WorkflowTableProps {
  workflows: WorkflowItemData[];
  onExecute: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const WorkflowTable: React.FC<WorkflowTableProps> = ({
  workflows,
  onExecute,
  onEdit,
  onDelete,
  onToggleFavorite
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center py-4 px-2 border-b border-gray-200 font-medium text-gray-600">
        <div className="w-1/4">Workflow Name</div>
        <div className="w-1/6">ID</div>
        <div className="w-1/6">Last Edited On</div>
        <div className="w-1/4">Description</div>
        <div className="w-1/6"></div>
      </div>
      
      {workflows.map((workflow) => (
        <WorkflowItem 
          key={workflow.id}
          {...workflow}
          onExecute={onExecute}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
      
      <div className="flex items-center justify-center mt-6 space-x-2">
        <button className="p-2 border rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="px-3 py-1 border rounded bg-gray-100">1</button>
        <button className="px-3 py-1 border rounded">2</button>
        <button className="px-3 py-1 border rounded">3</button>
        <span>...</span>
        <button className="px-3 py-1 border rounded">15</button>
        <button className="p-2 border rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WorkflowTable;
