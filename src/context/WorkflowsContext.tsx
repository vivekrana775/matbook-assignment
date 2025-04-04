import React, { createContext, useContext, useState, ReactNode } from "react";

export interface WorkflowItemData {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
}

// Sample data
const MOCK_WORKFLOWS: WorkflowItemData[] = Array(2)
  .fill(null)
  .map((_, i) => ({
    id: `${494 + i}`,
    name: "Workflow Name here...",
    timestamp: "22:43 IST - 28/05",
    author: "Zubin Khanna",
    description: "Some Description Here Regarding The Flow..",
    isFavorite: i % 3 === 0,
    runHistory:
      i % 2 === 0
        ? [
            { date: "28/05 - 22:43 IST", status: "Passed" as const },
            { date: "28/05 - 22:43 IST", status: "Failed" as const },
            { date: "28/05 - 22:43 IST", status: "Failed" as const },
          ]
        : undefined,
  }));

type WorkflowsContextType = {
  workflows: WorkflowItemData[];
  setWorkflows: React.Dispatch<React.SetStateAction<WorkflowItemData[]>>;
};

const WorkflowsContext = createContext<WorkflowsContextType | undefined>(
  undefined
);

export const WorkflowsProvider = ({ children }: { children: ReactNode }) => {
  const [workflows, setWorkflows] =
    useState<WorkflowItemData[]>(MOCK_WORKFLOWS);

  return (
    <WorkflowsContext.Provider value={{ workflows, setWorkflows }}>
      {children}
    </WorkflowsContext.Provider>
  );
};

export const useWorkflows = () => {
  const context = useContext(WorkflowsContext);
  if (!context) {
    throw new Error("useWorkflows must be used within a WorkflowsProvider");
  }
  return context;
};
