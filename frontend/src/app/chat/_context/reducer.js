/**
 * Reducer function for managing chat state.
 * @param {Object} state - The current state.
 * @param {Object} action - The action to be processed.
 * @param {string} action.type - The type of the action.
 * @param {Object} action.payload - The payload of the action.
 * @returns {Object} The new state.
 */

function reducer(state, action) {
  switch (action.type) {
    // Action case to create a chat
    case 'CREATE_CHAT': {
      const chat = action.payload;
      return {
        ...state,
        chats: [...state.chats, chat]
      };
    }
    // Action case to set the chats
    case 'SET_CHATS': {
      const chats = action.payload;
      return { ...state, chats };
    }
    // Action case to set the selected chat ID
    case 'SET_PROMPT': {
      const prompt = action.payload;
      return { ...state, prompt }
    }
    // Throw an error for unknown actions
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default reducer;
