import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WorkflowTable from "@/components/workflow/WorkflowTable";
import DeleteConfirmationDialog from "@/components/workflow/DeleteConfirmationDialog";
import SaveWorkflowDialog from "@/components/workflow/SaveWorkflowDialog";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWorkflows } from "@/context/WorkflowsContext";

const WorkflowBuilder: React.FC = () => {
  const navigate = useNavigate();
  const { workflows, setWorkflows } = useWorkflows();

  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentWorkflowId, setCurrentWorkflowId] = useState<string | null>(
    null
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateProcess = () => {
    navigate("/workflow-creator");
  };

  const handleExecuteWorkflow = (id: string) => {
    console.log(`Executing workflow ${id}`);
  };

  const handleEditWorkflow = (id: string) => {
    console.log(`Editing workflow ${id}`);
  };

  const handleDeleteWorkflow = (id: string) => {
    setCurrentWorkflowId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (currentWorkflowId) {
      setWorkflows(workflows.filter((w) => w.id !== currentWorkflowId));
    }
    setIsDeleteDialogOpen(false);
    setCurrentWorkflowId(null);
  };

  const handleToggleFavorite = (id: string) => {
    setWorkflows(
      workflows.map((workflow) =>
        workflow.id === id
          ? { ...workflow, isFavorite: !workflow?.isFavorite }
          : workflow
      )
    );
  };

  const filteredWorkflows = useMemo(() => {
    if (!searchQuery.trim()) return workflows;
    return workflows.filter((workflow) => {
      const q = searchQuery.toLowerCase();
      return (
        workflow.name?.toLowerCase().includes(q) ||
        workflow.id?.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, workflows]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Workflow Builder</h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            Log Out
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-80">
              <Input
                placeholder="Search By Workflow Name/ID"
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <Button
              onClick={handleCreateProcess}
              className="bg-black text-white hover:bg-gray-800"
            >
              <Plus className="h-4 w-4 mr-1" /> Create New Process
            </Button>
          </div>

          <WorkflowTable
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            workflows={filteredWorkflows}
            onExecute={handleExecuteWorkflow}
            onEdit={handleEditWorkflow}
            onDelete={handleDeleteWorkflow}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
