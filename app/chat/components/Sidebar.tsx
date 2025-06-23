import { ChatInterface } from "@/app/interfaces";
import { useChatStore } from "../store/store";
import { Plus, Menu, X } from "lucide-react";
import { FaPlus, FaPlusSquare, FaRegPlusSquare } from "react-icons/fa";
import { hideScrollbar } from "@/app/const";
import { memo, useCallback, useMemo, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";


const ChatCard = memo(({ chat, isSelected, onClick }: { chat: ChatInterface, isSelected: boolean, onClick: (chat: ChatInterface) => void }) => {
  return (
    <button
      onClick={() => onClick(chat)}
      className={`flex flex-row justify-start items-center w-full ${isSelected ? "bg-white/30" : "bg-white/5"} rounded-md px-3 py-2  cursor-pointer`}>
      <h1 className="text-white/80 text-sm font-medium">{chat.name}</h1>
    </button>
  )
})

const SidebarContent = memo(({ onChatSelect }: { onChatSelect?: () => void }) => {
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
    onChatSelect?.();
  }, [addChat, onChatSelect]);

  const handleClearChats = useCallback(() => {
    if (confirm("Are you sure you want to delete all chats?")) {
      clearChats();
      window.location.reload();
    }
  }, [clearChats]);

  const handleSelectChat = useCallback((chat: ChatInterface) => {
    setSelectedChat({ chat });
    onChatSelect?.();
  }, [setSelectedChat, onChatSelect]);

  const sortedChats = useMemo(() => {
    return [...chats].sort((a, b) => new Date(b.timeUpdated).getTime() - new Date(a.timeUpdated).getTime());
  }, [chats]);

  return (
    <div style={{ fontFamily: "DM Sans" }} className="h-full w-full bg-white/10 flex flex-col justify-start items-center px-3">
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
});

const SidebarComponent = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-2 left-4 z-50 md:hidden bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white h-8 w-8"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-80 bg-zinc-950 border-white/20 p-0"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <SheetHeader className="p-4 border-b border-white/10">
              <SheetTitle className="text-white font-semibold">Chats</SheetTitle>
            </SheetHeader>
            <div className="h-full overflow-hidden">
              <SidebarContent onChatSelect={() => setIsOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className="hidden md:flex h-full w-72 flex-none">
      <SidebarContent />
    </div>
  );
}

export const Sidebar = memo(SidebarComponent);
