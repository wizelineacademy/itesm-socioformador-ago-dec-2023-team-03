/**
 * Interface for Team.
 * @property {string} id - The ID of the team.
 * @property {string} name - The name of the team.
 * @property {string} createdAt - The creation date of the team.
 * @property {string} updatedAt - The last update date of the team.
 */
export interface Team {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}


/**
 * Interface for Member.
 * @property {string} id - The ID of the member.
 * @property {string} firstName - The first name of the member.
 * @property {string} lastName - The last name of the member.
 * @property {string} email - The email of the member.
 * @property {string} picture - The picture of the member.
 * @property {string} createdAt - The creation date of the member.
 * @property {string} updatedAt - The last update date of the member.
 * @property {string} roleId - The role ID of the member.
 * @property {Object} team_member - The team member object.
 */
export interface Member {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    picture?: string;
    createdAt?: string;
    updatedAt?: string;
    roleId: string;
    team_member?: {
        teamId?: string;
        memberId?: string;
        createdAt?: string;
        updatedAt?: string;
    }
}

/**
 * Interface for LLM.
 * @property {string} id - The ID of the LLM.
 * @property {string} name - The name of the LLM.
 * @property {string} model - The model of the LLM.
 * @property {string} createdAt - The creation date of the LLM.
 * @property {string} updatedAt - The last update date of the LLM.
 */
export interface LLM {
    id: string;
    name: string;
    model: string;
    createdAt: string;
    updatedAt: string;
}
