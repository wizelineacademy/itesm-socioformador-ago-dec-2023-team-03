import loggedUserService from './me';
import memberService from './member';
import teamService from './team';

const services = {
  me: loggedUserService,
  member: memberService,
  team: teamService
};

export default services;
