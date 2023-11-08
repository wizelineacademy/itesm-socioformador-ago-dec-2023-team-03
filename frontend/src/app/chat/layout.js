import chatContext from './_context';

function ChatPageLayout({ children }) {

  return (
    <chatContext.Provider>
      { children }
    </chatContext.Provider>
  );
}

export default ChatPageLayout;
