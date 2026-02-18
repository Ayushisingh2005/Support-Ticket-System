import React, { useEffect, useState } from "react";
import API from "../api";

function TicketList({ refresh }) {
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    priority: "",
    status: "",
    search: "",
  });

  const fetchTickets = () => {
    const params = new URLSearchParams(filters).toString();
    API.get(`tickets/?${params}`)
      .then((res) => setTickets(res.data));
  };

  useEffect(() => {
    fetchTickets();
  }, [refresh, filters]);

  const updateStatus = (id, status) => {
    API.patch(`tickets/${id}/`, { status })
      .then(() => fetchTickets());
  };

  return (
    <div>
      <h2>All Tickets</h2>

      <input
        placeholder="Search"
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
        <option value="">All Categories</option>
        <option value="billing">Billing</option>
        <option value="technical">Technical</option>
        <option value="account">Account</option>
        <option value="general">General</option>
      </select>

      <select onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>

      <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
        <option value="">All Status</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
      </select>

      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <h4>{ticket.title}</h4>
            <p>{ticket.description.slice(0, 100)}...</p>
            <p>{ticket.category} | {ticket.priority} | {ticket.status}</p>

            <select
              value={ticket.status}
              onChange={(e) => updateStatus(ticket.id, e.target.value)}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
