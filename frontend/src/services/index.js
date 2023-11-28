import chatService from './chat';
import llmService from './llm';
import loggedUserService from './me';
import memberService from './member';
import teamService from './team';
import tokensServices from './tokens';

/**
 * Object containing all services.
 * @property {Object} me - Service for logged user.
 * @property {Object} member - Service for members.
 * @property {Object} team - Service for teams.
 * @property {Object} tokens - Service for tokens.
 * @property {Object} chat - Service for chats.
 * @property {Object} llm - Service for LLMs.
 */
const services = {
  me: loggedUserService,
  member: memberService,
  team: teamService,
  tokens: tokensServices,
  chat: chatService,
  llm: llmService
};

export default services;
