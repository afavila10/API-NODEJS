import { connect } from '../config/db/connect.js';

export const showRole = async (req, res) => {
  try {
    let sqlQuery = "SELECT * FROM role";
    const [result] = await connect.query(sqlQuery);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Roles", details: error.message });
  }
};

export const showRoleId = async (req, res) => {
  try {
    const [result] = await connect.query('SELECT * FROM role WHERE Role_id = ?', [req.params.id]);
    if (result.length === 0) return res.status(404).json({ error: "Role not found" });
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Role", details: error.message });
  }
};

export const addRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    let sqlQuery = "INSERT INTO role (Role_name,Role_description) VALUES (?,?)";
    const [result] = await connect.query(sqlQuery, [name, description]);
    res.status(201).json({
      data: [{ id: result.insertId, name, description }],
      status: 201
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding Role", details: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    let sqlQuery = "UPDATE Role SET Role_name=?,Role_description=?,Updated_at=? WHERE Role_id= ?";
    const updated_at = new Date().toLocaleString("en-CA", { timeZone: "America/Bogota" }).replace(",", "").replace("/", "-").replace("/", "-");
    const [result] = await connect.query(sqlQuery, [name, description,updated_at, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Role not found" });
    res.status(200).json({
      data: [{ name, description,updated_at }],
      status: 200,
      updated: result.affectedRows
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating Role", details: error.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    let sqlQuery = "DELETE FROM role WHERE Role_id = ?";
    const [result] = await connect.query(sqlQuery, [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Role not found" });
    res.status(200).json({
      data: [],
      status: 200,
      deleted: result.affectedRows
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting Role", details: error.message });
  }
};

