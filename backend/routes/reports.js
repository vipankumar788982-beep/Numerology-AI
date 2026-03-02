import express from 'express';
import { nanoid } from 'nanoid';
import { body, validationResult } from 'express-validator';
import Report from '../models/Report.js';
import { calculateNumerology, generateLuckyDates } from '../utils/numerology.js';
import { authenticate } from '../middleware/auth.js';
import { getInterpretations } from '../utils/interpretations.js';

const router = express.Router();

// Generate report
router.post('/generate', [
  body('fullName').notEmpty(),
  body('dateOfBirth').isISO8601(),
  body('language').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, dateOfBirth, language = 'en' } = req.body;
    const userId = req.user?.id || null;

    const calculations = calculateNumerology(fullName, dateOfBirth);
    const luckyDates = generateLuckyDates(calculations.lifePathNumber.value);

    const report = new Report({
      userId,
      shareId: nanoid(10),
      fullName,
      dateOfBirth,
      language,
      calculations
    });

    await report.save();

    const interpretations = getInterpretations(calculations, language);

    res.json({
      reportId: report._id,
      shareId: report.shareId,
      fullName,
      dateOfBirth,
      language,
      calculations,
      interpretations,
      luckyDates
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get report by share ID
router.get('/share/:shareId', async (req, res) => {
  try {
    const report = await Report.findOne({ shareId: req.params.shareId });

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    const luckyDates = generateLuckyDates(report.calculations.lifePathNumber.value);
    const interpretations = getInterpretations(report.calculations, report.language);

    res.json({
      reportId: report._id,
      shareId: report.shareId,
      fullName: report.fullName,
      dateOfBirth: report.dateOfBirth,
      language: report.language,
      calculations: report.calculations,
      interpretations,
      luckyDates
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user reports (authenticated)
router.get('/user', authenticate, async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
