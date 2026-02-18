import React, { useEffect, useState } from "react";
import API from "../api";

function StatsDashboard({ refresh }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("tickets/stats/")
      .then((res) => setStats(res.data));
  }, [refresh]);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Tickets: {stats.total_tickets}</p>
      <p>Open Tickets: {stats.open_tickets}</p>
      <p>Avg Per Day: {stats.avg_tickets_per_day}</p>

      <h4>Priority Breakdown</h4>
      <pre>{JSON.stringify(stats.priority_breakdown, null, 2)}</pre>

      <h4>Category Breakdown</h4>
      <pre>{JSON.stringify(stats.category_breakdown, null, 2)}</pre>

      <hr />
    </div>
  );
}

export default StatsDashboard;
