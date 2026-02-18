import React, { useState } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import StatsDashboard from "./components/StatsDashboard";

function App() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Support Ticket System</h1>

      <StatsDashboard refresh={refresh} />
      <TicketForm onSuccess={triggerRefresh} />
      <TicketList refresh={refresh} />
    </div>
  );
}

export default App;
