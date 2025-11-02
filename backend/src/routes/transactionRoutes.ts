import express from 'express';
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from '../controllers/transactionController';

const router = express.Router();

router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);
router.post('/', addTransaction);
router.get('/', getTransactions);

export default router;