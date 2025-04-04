import DeleteConfirmationDialog from "@/components/workflow/DeleteConfirmationDialog";
import SaveWorkflowDialog from "@/components/workflow/SaveWorkflowDialog";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  Node,
  Edge,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import { WorkflowItemData } from "@/components/workflow/WorkflowItem";
import ApiCallNode from "@/components/workflow/ApiCallNode";
import ApiConfigurationDialog from "@/components/workflow/ApiConfigurationDialog";
import TooltipDialog from "@/components/workflow/TooltipDialog";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EmailConfigurationDialog from "@/components/workflow/EmailConfigurationDialog";
import TextBoxConfigurationDialog from "@/components/workflow/TextBoxConfigurationDialog";

// Types
type CustomNode = Node & {
  style?: React.CSSProperties;
};

// Add this near your other type definitions
const nodeTypes = {
  apiCall: ApiCallNode,
};

// Constants
const NODE_SPACING = 150;
const INITIAL_X = 250;
const INITIAL_Y = 100;

const initialNodes: CustomNode[] = [
  {
    id: "start",
    type: "input",
    position: { x: INITIAL_X, y: INITIAL_Y },
    data: {}, // Image path in data
    style: {
      backgroundImage: "url('/uploads/start_node.svg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "50%",
      width: 80,
      height: 80,
      border: "0px solid white", // Optional border for effect
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
  },
  {
    id: "end",
    type: "output",
    position: { x: INITIAL_X, y: INITIAL_Y + NODE_SPACING * 2 },
    data: {},
    style: {
      backgroundImage: "url('/uploads/end_node.svg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "50%",
      width: 80,
      height: 80,
      border: "0px solid white", // Optional border for effect
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
  },
];

const initialEdges: Edge[] = [{ id: "e1", source: "start", target: "end" }];

const Workflow = () => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isApiConfigurationDialogOpen, setIsApiConfigurationDialogOpen] =
    useState(false);
  const [isEmailConfigurationDialogOpen, setIsEmailConfigurationDialogOpen] =
    useState(false);
  const [
    isTextBoxConfigurationDialogOpen,
    setIsTextBoxConfigurationDialogOpen,
  ] = useState(false);

  const [workflows, setWorkflows] = useState<WorkflowItemData[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [currentWorkflowId, setCurrentWorkflowId] = useState<string | null>(
    null
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option?) => {
    setAnchorEl(null);
    if (option) {
      addNode(option);
    }
  };

  const handleSaveWorkflow = (name: string, description: string) => {
    const newWorkflow: WorkflowItemData = {
      id: `${Math.floor(Math.random() * 1000)}`,
      name,
      timestamp: new Date().toLocaleString(),
      author: "Current User",
      description,
      isFavorite: false,
    };
    setWorkflows([newWorkflow, ...workflows]);
    setIsSaveDialogOpen(false);
  };

  const handleDeleteWorkflow = (id: string) => {
    setCurrentWorkflowId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteNode();
    setIsDeleteDialogOpen(false);
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const createNewNode = (name: string): CustomNode => {
    const newNodeId = `node-${Date.now()}`;
    const lastNode = nodes[nodes.length - 2]; // Skip the end node

    return {
      id: newNodeId,
      position: {
        x: lastNode ? lastNode.position.x : INITIAL_X,
        y: lastNode
          ? lastNode.position.y + NODE_SPACING
          : INITIAL_Y + NODE_SPACING,
      },
      data: {
        label: (
          <div
            className="node-content"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectedNode(newNodeId);
              if (name === "API Call") {
                setIsApiConfigurationDialogOpen(true);
              } else if (name === "Email") {
                setIsEmailConfigurationDialogOpen(true);
              } else if (name === "Text Box") {
                setIsTextBoxConfigurationDialogOpen(true);
              }
            }}
          >
            <div className="node-label">{name}</div>
            <div
              className="node-delete-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedNode(newNodeId);
                setIsDeleteDialogOpen(true);
              }}
            >
              ×
            </div>
          </div>
        ),
      },
      style: {
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: "10px",
        border: "2px solid #4a90e2",
        minWidth: 200,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    };
  };

  const addNode = (name: string) => {
    const newNode = createNewNode(name);
    const previousNode = nodes[nodes.length - 2]; // Get node before end

    setNodes((nds) => [...nds.slice(0, -1), newNode, nds[nds.length - 1]]);
    setEdges((eds) => [
      ...eds.filter((edge) => edge.target !== "end"),
      { id: `e-${newNode.id}-1`, source: previousNode.id, target: newNode.id },
      { id: `e-${newNode.id}-2`, source: newNode.id, target: "end" },
    ]);
  };

  const deleteNode = () => {
    if (!selectedNode || selectedNode === "start" || selectedNode === "end")
      return;

    // Find the node to be deleted
    const nodeToDelete = nodes.find((node) => node.id === selectedNode);
    if (!nodeToDelete) return;

    // Find edges connected to this node
    const incomingEdge = edges.find((edge) => edge.target === selectedNode);
    const outgoingEdge = edges.find((edge) => edge.source === selectedNode);

    // Remove the node and its connected edges
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode));
    setEdges((eds) =>
      eds.filter(
        (edge) => edge.source !== selectedNode && edge.target !== selectedNode
      )
    );

    // If there are both incoming and outgoing edges, create a new edge connecting them
    if (incomingEdge && outgoingEdge) {
      setEdges((eds) => [
        ...eds,
        {
          id: `e-${incomingEdge.source}-${outgoingEdge.target}`,
          source: incomingEdge.source,
          target: outgoingEdge.target,
        },
      ]);
    }

    setSelectedNode(null);
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
  }, []);

  function handleSaveApiConfiguration(name: string, description: string): void {
    throw new Error("Function not implemented.");
  }
  function handleSaveEmailConfiguration(
    name: string,
    description: string
  ): void {
    throw new Error("Function not implemented.");
  }
  function handleSaveTextBoxConfiguration(
    name: string,
    description: string
  ): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="workflow-container">
      <div className="toolbar">
        <button
          className="back-button"
          onClick={() => navigate("/workflow-builder")}
        >
          {`<- Go Back`}
        </button>
        <button
          className="toolbar-button delete-button"
          onClick={() => setIsSaveDialogOpen(true)}
        >
          Save Process
        </button>
        <div>
          <button className="toolbar-button add-button" onClick={handleClick}>
            Add Node
          </button>
          <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
            <MenuItem onClick={() => handleClose("API Call")}>
              API Call
            </MenuItem>
            <MenuItem onClick={() => handleClose("Email")}>Email</MenuItem>
            <MenuItem onClick={() => handleClose("Text Box")}>
              Text Box
            </MenuItem>
          </Menu>
        </div>
        <button
          className="toolbar-button delete-button"
          onClick={deleteNode}
          disabled={
            !selectedNode || selectedNode === "start" || selectedNode === "end"
          }
        >
          Delete Node
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
        defaultEdgeOptions={{
          style: { stroke: "#000", strokeWidth: 2 },
          markerEnd: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            type: "arrowclosed",
            width: 20,
            height: 20,
            color: "#000",
          },
        }}
        nodesDraggable
        elementsSelectable
      >
        <Background gap={16} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        processName={
          currentWorkflowId
            ? workflows.find((w) => w.id === currentWorkflowId)?.name || ""
            : ""
        }
      />

      <SaveWorkflowDialog
        isOpen={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
        onSave={handleSaveWorkflow}
      />
      <ApiConfigurationDialog
        isOpen={isApiConfigurationDialogOpen}
        onClose={() => setIsApiConfigurationDialogOpen(false)}
        onSave={handleSaveApiConfiguration}
      />
      <EmailConfigurationDialog
        isOpen={isEmailConfigurationDialogOpen}
        onClose={() => setIsEmailConfigurationDialogOpen(false)}
        onSave={handleSaveEmailConfiguration}
      />
      <TextBoxConfigurationDialog
        isOpen={isTextBoxConfigurationDialogOpen}
        onClose={() => setIsTextBoxConfigurationDialogOpen(false)}
        onSave={handleSaveTextBoxConfiguration}
      />
    </div>
  );
};

// ... (keep the same CSS styles)

// CSS styles
const styles = `
  .workflow-container {
    width: 100vw;
    height: 100vh;
    background: #FDF6EC;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .workflow-header {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }

  .back-button {
    background: none;
    border: none;
    color: #4a90e2;
    font-size: 16px;
    cursor: pointer;
    margin-right: 20px;
    padding: 5px 10px;
    border-radius: 4px;
  }

  .back-button:hover {
    background: #f0f0f0;
  }

  .workflow-title {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    color: #333;
  }

  .toolbar {
    position: absolute;
    top: 70px;
    left: 20px;
    display: flex;
    gap: 10px;
    z-index: 10;
  }

  .toolbar-button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .add-button {
    background: #4a90e2;
    color: white;
  }

  .add-button:hover {
    background: #3a7bc8;
  }

  .delete-button {
    background: #e74c3c;
    color: white;
  }

  .delete-button:hover:not(:disabled) {
    background: #c0392b;
  }

  .delete-button:disabled {
    background: #cccccc;
    cursor: not-allowed;
    opacity: 0.7;
  }

  .react-flow__node.selected {
    box-shadow: 0 0 0 2px #4a90e2;
  }

   .node-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    z-index: 100;

  }

  .node-label {
    flex-grow: 1;
  }

  .node-delete-button {
    background: #ff4d4f;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
    margin-left: 8px;
    padding: 0;
    line-height: 1;
    z-index: 100;

  }

  .node-delete-button:hover {
    background: #ff7875;
  }

`;

// Add styles to the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Workflow;
