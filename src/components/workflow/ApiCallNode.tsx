// Add this near your imports
import { useReactFlow } from "reactflow";

const ApiCallNode = ({ id, data }: { id: string; data }) => {
  const { setNodes, setEdges } = useReactFlow();

  const onDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) =>
      edges.filter((edge) => edge.source !== id && edge.target !== id)
    );
  };

  return (
    <div style={data.style}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{data.label}</div>
        <button
          onClick={onDelete}
          style={{
            background: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
            padding: "2px 6px",
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ApiCallNode;
