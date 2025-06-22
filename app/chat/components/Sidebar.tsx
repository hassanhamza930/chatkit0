import { ChatInterface } from "@/app/interfaces";
import { useChatStore } from "../store/store";
import { Plus } from "lucide-react";
import { FaPlus, FaPlusSquare, FaRegPlusSquare } from "react-icons/fa";
import { hideScrollbar } from "@/app/const";
import { memo, useCallback, useMemo } from "react";


const ChatCard = memo(({ chat, isSelected, onClick }: { chat: ChatInterface, isSelected: boolean, onClick: (chat: ChatInterface) => void }) => {
  return (
    <button
      onClick={() => onClick(chat)}
      className={`flex flex-row justify-start items-center w-full ${isSelected ? "bg-white/30" : "bg-white/5"} rounded-md px-3 py-2  cursor-pointer`}>
      <h1 className="text-white/80 text-sm font-medium">{chat.name}</h1>
    </button>
  )
})

const SidebarComponent = () => {

  const { chats, addChat, clearChats, selectedChat, setSelectedChat } = useChatStore();

  const handleCreateNewChat = useCallback(() => {
    addChat({
      chat: {
        id: crypto.randomUUID(),
        name: "New Chat",
        messages: [],
        timeUpdated: new Date()
      }
    });
  }, [addChat]);

  const handleClearChats = useCallback(() => {
    if (confirm("Are you sure you want to delete all chats?")) {
      clearChats();
      window.location.reload();
    }
  }, [clearChats]);

  const handleSelectChat = useCallback((chat: ChatInterface) => {
    setSelectedChat({ chat });
  }, [setSelectedChat]);

  const sortedChats = useMemo(() => {
    return [...chats].sort((a, b) => new Date(b.timeUpdated).getTime() - new Date(a.timeUpdated).getTime());
  }, [chats]);


  return (
    <div style={{ fontFamily: "DM Sans" }} className="h-full w-72 bg-white/10 flex flex-col justify-start items-center flex-none px-3">
      <button
        onClick={handleCreateNewChat}
        className="w-full mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-lg text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 group backdrop-blur-sm cursor-pointer">
        Create New Chat
      </button>



      <div className="w-full h-px bg-white/10 my-4 mb-2">
      </div>


      {
        chats.length > 0 && (
          <div className="flex flex-row justify-end items-center w-full">
            <button
              onClick={handleClearChats}
              className="text-[11px] font-normal text-white/40 hover:text-white/60 cursor-pointer mb-2">Delete all Chats</button>
          </div>
        )
      }

      <div
        style={hideScrollbar}
        className="flex flex-col justify-start items-center h-full w-full overflow-y-auto gap-y-2 pb-48">

        {chats.length == 0 && (
          <div className="flex flex-col justify-start items-center w-full mt-5">
            <h1 className="text-white/40 text-sm font-normal">No chats yet</h1>
            <h1 className="text-white/40 text-xs font-normal">Create a new chat to get started</h1>
          </div>
        )}

        {sortedChats.map((chat) => (
            <ChatCard
              key={chat.id}
              chat={chat}
              isSelected={selectedChat?.id === chat.id}
              onClick={handleSelectChat}
            />
          ))}


      </div>

    </div>
  );
}

export const Sidebar = memo(SidebarComponent);
