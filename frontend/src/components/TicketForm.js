import React, { useState, useEffect } from "react";
import API from "../api";

function TicketForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);

  // LLM auto classify
  useEffect(() => {
    if (description.length > 20) {
      setLoading(true);
      API.post("tickets/classify/", { description })
        .then((res) => {
          setCategory(res.data.suggested_category);
          setPriority(res.data.suggested_priority);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("tickets/", {
      title,
      description,
      category,
      priority,
    });

    setTitle("");
    setDescription("");
    setCategory("general");
    setPriority("medium");
    onSuccess();
  };

  return (
    <div>
      <h2>Create Ticket</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          maxLength={200}
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />

        {loading && <p>Analyzing with AI...</p>}

        <br /><br />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="billing">Billing</option>
          <option value="technical">Technical</option>
          <option value="account">Account</option>
          <option value="general">General</option>
        </select>

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>

        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TicketForm;
