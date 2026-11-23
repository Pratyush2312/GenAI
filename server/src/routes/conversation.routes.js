import { Router } from 'express';
import { handleMessage } from './../controller/conversation.controller.js';
import { conversationValidator } from './../validators/conversation.validator.js';
import { requireAuth } from './../middleware/auth.middleware.js';

const router = Router();

/**
 * @POST
 * @route /api/v1/conversation
 * @description handle the user message
 * req.body should contain the user message and conversation ID (conversationId is optional)
 */

router.post('/', requireAuth, conversationValidator, handleMessage);

export default router;