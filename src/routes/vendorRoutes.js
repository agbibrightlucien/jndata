import express from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../db/db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { fullName, email, password, phoneNumber, momoNumber } = req.body;

  if (!fullName || !email || !password || !phoneNumber || !momoNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO vendors (full_name, email, password, phone_number, momo_number) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [fullName, email, hashedPassword, phoneNumber, momoNumber]
    );

    res.status(201).json({ message: 'Vendor registered successfully', vendor: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const vendor = await pool.query('SELECT * FROM vendors WHERE email = $1', [email]);

    if (vendor.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, vendor.rows[0].password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: vendor.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/orders', async (req, res) => {
  const { phoneNumber, network, dataPackage, vendorId } = req.body;

  if (!phoneNumber || !network || !dataPackage || !vendorId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO orders (phone_number, network, data_package, vendor_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [phoneNumber, network, dataPackage, vendorId, 'Pending']
    );

    // Simulate admin notification
    console.log('New order placed:', result.rows[0]);

    res.status(201).json({ message: 'Order placed successfully', order: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/withdrawals', async (req, res) => {
  const { vendorId, amount } = req.body;

  if (!vendorId || !amount) {
    return res.status(400).json({ error: 'Vendor ID and amount are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO withdrawals (vendor_id, amount, status) VALUES ($1, $2, $3) RETURNING *',
      [vendorId, amount, 'Completed']
    );

    res.status(201).json({ message: 'Withdrawal request successful', withdrawal: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/withdrawals/history', async (req, res) => {
  const { vendorId } = req.query;

  if (!vendorId) {
    return res.status(400).json({ error: 'Vendor ID is required' });
  }

  try {
    const result = await pool.query('SELECT * FROM withdrawals WHERE vendor_id = $1 ORDER BY created_at DESC', [vendorId]);
    res.status(200).json({ withdrawals: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;