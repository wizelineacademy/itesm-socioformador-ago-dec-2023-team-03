'use client';

import React from 'react';

import reducer from './reducer.js';

// Create a new context for the chat
const context = React.createContext();

/**
 * Provider component.
 * @description This is a higher-order component that wraps other components and provides them with chat state context. This allows child components to access and manipulate the chat state through context.
 * @component
 * @param {Object} props - The props.
 * @param {React.ReactNode} props.children - The children nodes.
 * @returns {JSX.Element} The rendered Provider component.
 */
function Provider(props) {
  const children = props.children;
  // Use the reducer hook to manage state
  const [state, dispatch] = React.useReducer(reducer, {
    chats: [],
    prompt: ''
  });

  // Create actions for dispatching
  const actions = createActions(dispatch);

  // Provide the state and actions to children
  return (
    <context.Provider value={{ state, actions }}>
      {children}
    </context.Provider>
  );
}

/**
 * Creates actions for dispatching.
 * @param {Function} dispatch - The dispatch function.
 * @returns {Object} The actions.
 */
function createActions(dispatch) {
  return {
    // Action to create a chat. Dispatches a 'CREATE_CHAT' action with the provided payload.
    createChat: (payload) => {
      dispatch({ type: 'CREATE_CHAT', payload });
    },
    // Action to set the chats. Dispatches a 'SET_CHATS' action with the provided payload.
    setChats: (payload) => {
      dispatch({ type: 'SET_CHATS', payload });
    },
    // Action to set the prompt. Dispatches a 'SET_PROMPT' action with the provided payload.
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
