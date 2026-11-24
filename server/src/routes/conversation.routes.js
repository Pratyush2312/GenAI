import { Router } from 'express';
import { handleMessage,getAllConversations,getMessagesByConversation } from './../controller/conversation.controller.js';
import { conversationValidator } from './../validators/conversation.validator.js';
import { requireAuth } from './../middleware/auth.middleware.js';
import { validate } from './../middleware/validate.middleware.js';

const router = Router();

/**
 * @POST
 * @route /api/v1/conversation
 * @description handle the user message
 * req.body should contain the user message and conversation ID (conversationId is optional)
 */

router.post('/', requireAuth, conversationValidator, validate, handleMessage);

/**
 * @GET 
 * @route /api/v1/conversation
 * @description get all conversations of the user
 */
router.get('/', requireAuth, getAllConversations);

/**
 * @GET
 * @route /api/v1/conversation/messages/:conversationId
 * @description get all the messages of a specific conversation
 */
router.get('/messages/:conversationId', requireAuth, getMessagesByConversation);

export default router;