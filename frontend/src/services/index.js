import loggedUserService from './me';
import memberService from './member';
import teamService from './team';
import tokensServices from './tokens';
import chatService from './chat';
import llmService from './llm';

const services = {
  me: loggedUserService,
  member: memberService,
  team: teamService,
  tokens: tokensServices,
  chat: chatService,
  llm: llmService
};

export default services;
