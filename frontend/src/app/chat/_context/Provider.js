'use client';

import React from 'react';

import reducer from './reducer.js';

const context = React.createContext();

function Provider(props) {
  const children = props.children;
  const [state, dispatch] = React.useReducer(reducer, {
    chats: [],
    prompt: ''
  });

  const actions = createActions(dispatch);

  return (
    <context.Provider value={{ state, actions }}>
      {children}
    </context.Provider>
  );
}

function createActions(dispatch) {
  return {
    createChat: (payload) => {
      dispatch({ type: 'CREATE_CHAT', payload });
    },
    setChats: (payload) => {
      dispatch({ type: 'SET_CHATS', payload });
    },
    setPrompt: (payload) => {
      dispatch({ type: 'SET_PROMPT', payload });
    }
  };
}

function useChatContext() {
  return React.useContext(context);
}

export { useChatContext };
export default Provider;
