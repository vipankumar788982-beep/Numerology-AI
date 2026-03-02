import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get interpretations for a language
router.get('/interpretations/:language', authenticate, isAdmin, async (req, res) => {
  try {
    const { language } = req.params;
    const filePath = path.join(process.cwd(), 'languages', `${language}.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(404).json({ message: 'Language file not found' });
  }
});

// Update interpretations for a language
router.put('/interpretations/:language', authenticate, isAdmin, async (req, res) => {
  try {
    const { language } = req.params;
    const filePath = path.join(process.cwd(), 'languages', `${language}.json`);
    await fs.writeFile(filePath, JSON.stringify(req.body, null, 2));
    res.json({ message: 'Interpretations updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update interpretations', error: error.message });
  }
});

export default router;
