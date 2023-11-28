export interface Team {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

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

export interface LLM {
    id: string;
    name: string;
    model: string;
    createdAt: string;
    updatedAt: string;
}

export interface Token {
    id?: string;
    quantity: number;
    createdAt?: string;
    updatedAt?: string;
    memberId?: string;
    teamId: string;
    llmId: string;
}