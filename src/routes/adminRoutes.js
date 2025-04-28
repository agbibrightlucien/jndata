import express from 'express';
import { pool } from '../db/db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Networks CRUD
router.post('/networks', authenticateAdmin, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Network name is required' });

  try {
    const result = await pool.query('INSERT INTO networks (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/networks', authenticateAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM networks');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/networks/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Network name is required' });

  try {
    const result = await pool.query('UPDATE networks SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/networks/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM networks WHERE id = $1', [id]);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Bundles CRUD
router.post('/bundles', authenticateAdmin, async (req, res) => {
  const { network_id, name, size, price } = req.body;
  if (!network_id || !name || !size || !price) return res.status(400).json({ error: 'All fields are required' });

  try {
    const result = await pool.query('INSERT INTO bundles (network_id, name, size, price) VALUES ($1, $2, $3, $4) RETURNING *', [network_id, name, size, price]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/bundles', authenticateAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bundles');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/bundles/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { network_id, name, size, price } = req.body;
  if (!network_id || !name || !size || !price) return res.status(400).json({ error: 'All fields are required' });

  try {
    const result = await pool.query('UPDATE bundles SET network_id = $1, name = $2, size = $3, price = $4 WHERE id = $5 RETURNING *', [network_id, name, size, price, id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/bundles/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM bundles WHERE id = $1', [id]);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;