import React from "react";
import Graph from "react-graph-vis";

import "../styles/graph_render.css";

export default function GraphRender({ graphInput }) {
  const graphDefault = {
    "nodes": [
        {
            "id": "95544",
            "label": "Node 95544 is ORIGINAL",
            "title": "Node with PID 95544"
        },
        {
            "id": "95545",
            "label": "Node 95545",
            "title": "Node with PID 95545"
        },
        {
            "id": "95546",
            "label": "Node 95546",
            "title": "Node with PID 95546"
        },
        {
            "id": "95547",
            "label": "Node 95547",
            "title": "Node with PID 95547"
        },
        {
            "id": "95548",
            "label": "Node 95548",
            "title": "Node with PID 95548"
        },
        {
            "id": "95549",
            "label": "Node 95549",
            "title": "Node with PID 95549"
        }
    ],
    "edges": [
        {
            "from": "95544",
            "to": "95545"
        },
        {
            "from": "95544",
            "to": "95546"
        },
        {
            "from": "95544",
            "to": "95547"
        },
        {
            "from": "95545",
            "to": "95548"
        },
        {
            "from": "95546",
            "to": "95549"
        }
    ]
};

  const options = {
    layout: {
      hierarchical: true,
    },
    edges: {
      color: "#000000",
    },
    height: "500px",
  };

  const events = {
    select: function (event) {
      console.log(event);
    },
  };

  return (
    <div className="graph">
      <Graph
        graph={graphInput ?? graphDefault}
        options={options}
        events={events}
      />
    </div>
  );
}
