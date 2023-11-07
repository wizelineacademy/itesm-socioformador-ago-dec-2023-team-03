function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_CHAT': {
      const chat = action.payload;
      return {
        ...state,
        chats: [...state.chats, chat]
      };
    }
    case 'SET_CHATS': {
      const chats = action.payload;
      return { ...state, chats };
    }
    case 'SET_PROMPT': {
      const prompt = action.payload;
      return { ...state, prompt }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default reducer;
