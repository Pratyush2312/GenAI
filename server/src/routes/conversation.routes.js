import { Router } from 'express';

const router = Router();

/**
 * @POST
 * @route /api/v1/conversation
 * @description handle the user message
 * req.body should contain the user message and conversation ID (conversationId is optional)
 */

router.post('/')

export default router;