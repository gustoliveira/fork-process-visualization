import React, { useState } from "react";
import GraphRender from "./graph.js";
import LogsTextField from "./logs_text_field.js";
import "../styles/body.css";

export default function Body() {
  const [graph, setGraph] = useState();

  return (
    <div className="div-body">
      <LogsTextField onConfirmCallback={(g) => setGraph(g)} />
      <GraphRender graphInput={graph} />
    </div>
  );
}
