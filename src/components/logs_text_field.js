import React, { useState } from "react";
import CustomButton from "./custom_button.js";
import "../styles/logs_text_field.css";

const regexParent = /ORIGINAL<\d+>/;
const regexNodes = /NODE<\d+, \d+>/;

String.prototype.cleanLogs = function () {
  const lines = this.replaceAll("        ", "").split("\n");
  return lines.filter(function (line) {
    return regexParent.test(line) || regexNodes.test(line);
  });
};

export default function LogsTextField({ onConfirmCallback }) {
  const [logs, setNewLog] = useState("");

  const handleChange = (event) => setNewLog(event);

  const generateGraphButton = () => {
    console.log(`Generating graph... ${logs}`);
    console.log(createGraphObject(logs));
    onConfirmCallback(createGraphObject(logs));
  };

  const formatLogsButton = () => {
    const teste = logs.cleanLogs();
    setNewLog(teste.join("\n"));
  };

  const createGraphObject = () => {
    const nodesList = logs.cleanLogs();
    const nodes = [];
    const edges = [];

    nodesList.forEach((node) => {
      if (node.includes("ORIGINAL")) {
        const pid = node.match(/<(\d+)>/)[1];
        nodes.push(createNode({ pid: pid, label: `Node ${pid} is ORIGINAL` }));
        return;
      }

      const regex = /NODE<(\d+), (\d+)>/;
      const match = regex.exec(node);
      const parentPid = match[1];
      const forkPid = match[2];

      if (!containsNode(nodes, parentPid)) {
        nodes.push(createNode({ pid: parentPid }));
      }

      if (!containsNode(nodes, forkPid)) {
        nodes.push(createNode({ pid: forkPid }));
      }

      edges.push({ from: parentPid, to: forkPid });
    });

    return {
      nodes: nodes,
      edges: edges,
    };
  };

  const containsNode = (nodesList, id) => {
    return nodesList.some((node) => node.id === id);
  };

  const createNode = ({ pid, label }) => {
    return {
      id: pid,
      label: label ?? `Node ${pid}`,
      title: `Node with PID ${pid}`,
    };
  };

  return (
    <div className="div-logs-text-field">
      <textarea
        className="logs-text-field"
        value={logs}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Type your logs here..."
      />
      <CustomButton title={"Format Text"} onClick={formatLogsButton} />
      <CustomButton
        title={"Generate Fork Graph"}
        onClick={generateGraphButton}
      />
    </div>
  );
}
