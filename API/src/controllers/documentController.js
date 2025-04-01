import { connect } from '../config/db/connect.js';
import {encryptPassword} from '../library/appBcrypt.js';

export const showDocument = async (req, res) => {
  try {
    let sqlQuery = "SELECT * FROM document_type";
    const [result] = await connect.query(sqlQuery);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching dcoments", details: error.message });
  }
};

export const showDocumentId = async (req, res) => {
  try {
    const [result] = await connect.query('SELECT * FROM document_type WHERE document_type_id= ?', [req.params.id]);
    if (result.length === 0) return res.status(404).json({ error: "document not found" });
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching document", details: error.message });
  }
};

export const addDocument = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
     //Document_type_id	Document_type_name	Document_type_description
    let sqlQuery = "INSERT INTO document_type(Document_type_name, Document_type_description ) VALUES (?,?)";
    const [result] = await connect.query(sqlQuery, [name, description]);
    res.status(201).json({
      data: [{ id: result.insertId, name, description }],
      status: 201
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding document", details: error.message });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const { name, description} = req.body;
    if (!name || !description ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    let sqlQuery = "UPDATE document_type SET Document_type_name=?,Document_type_description=?,Updated_at=? WHERE Document_type_id=?";
    const updated_at = new Date().toLocaleString("en-CA", { timeZone: "America/Bogota" }).replace(",", "").replace("/", "-").replace("/", "-");
    const [result] = await connect.query(sqlQuery, [name,description, updated_at, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "document not found" });
    res.status(200).json({
      data: [{ name, description, updated_at }],
      status: 200,
      updated: result.affectedRows
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating document", details: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    let sqlQuery = "DELETE FROM document_type WHERE document_type_id = ?";
    const [result] = await connect.query(sqlQuery, [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "document not found" });
    res.status(200).json({
      data: [],
      status: 200,
      deleted: result.affectedRows
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting document", details: error.message });
  }
};

