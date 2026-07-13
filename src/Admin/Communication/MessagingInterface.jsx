"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetChatListQuery, useGetChatMessagesQuery } from "../../store/services/dashboardApi";

const BASE_URL = (import.meta.env.VITE_BASE_URL || "").replace(/\/$/, "");
const WS_BASE = BASE_URL.replace(/^https/, "wss").replace(/^http/, "ws");

const Avatar = ({ src, name, size = "w-10 h-10" }) => {
  if (src) {
    const url = src.startsWith("http") ? src : `${BASE_URL}${src}`;
    return <img src={url} alt={name} className={`${size} rounded-full object-cover`} />;
  }
  return (
    <div className={`${size} rounded-full bg-[#C9A14A] flex items-center justify-center text-white font-semibold text-sm`}>
      {name?.charAt(0)?.toUpperCase() ?? "?"}
    </div>
  );
};

const formatTime = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const MessagingInterface = ({ initialPartnerId = null }) => {
  const { token, user } = useSelector((s) => s.auth);
  const adminId = user?.user_id;
  const navigate = useNavigate();

  const [selectedPartnerId, setSelectedPartnerId] = useState(initialPartnerId);
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [wsReady, setWsReady] = useState(false);
  const wsRef = useRef(null);
  const bottomRef = useRef(null);

  const { data: chatListData, isLoading: listLoading } = useGetChatListQuery();
  const { data: chatData } = useGetChatMessagesQuery(selectedPartnerId, { skip: !selectedPartnerId });

  const chatList = chatListData?.results ?? [];
  const filtered = chatList.filter((c) =>
    c.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const selectedPartner = chatList.find((c) => c.id === selectedPartnerId);

  // Load message history when chat is selected
  useEffect(() => {
    if (chatData?.results) {
      setMessages(chatData.results.map((m) => ({
        id: m.id,
        text: m.message_text,
        senderId: m.sender.id,
        time: m.created_at,
        is_read: m.is_read,
      })));
    }
  }, [chatData]);

  // WebSocket connect/disconnect on partner change
  const connectWS = useCallback(() => {
    if (!selectedPartnerId || !token) return;
    if (wsRef.current) wsRef.current.close();

    const ws = new WebSocket(
      `${WS_BASE}/ws/chat/user/${selectedPartnerId}/?token=${token}`
    );

    ws.onopen = () => setWsReady(true);
    ws.onclose = () => setWsReady(false);
    ws.onerror = (e) => console.error("WS error", e);

    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        const text = data.message_text || data.message || data.text;
        if (!text) return;
        const senderId = data.sender_id ?? data.sender?.id;
        // Skip echo of own messages (already added optimistically)
        if (senderId === adminId) return;
        setMessages((prev) => [
          ...prev,
          {
            id: data.id || Date.now(),
            text,
            senderId,
            time: data.created_at || new Date().toISOString(),
          },
        ]);
      } catch (err) {
        console.error("WS parse error", err);
      }
    };

    wsRef.current = ws;
  }, [selectedPartnerId, token, adminId]);

  useEffect(() => {
    connectWS();
    return () => wsRef.current?.close();
  }, [connectWS]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = newMessage.trim();
    if (!text) return;

    // Optimistically add to UI immediately
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text, senderId: adminId, time: new Date().toISOString() },
    ]);
    setNewMessage("");

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ message_text: text }));
    } else {
      console.warn("WebSocket not open, message sent optimistically only");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ fontFamily: "Montserrat" }} className="bg-white h-[calc(100vh-200px)]">
      {/* Top bar */}
      <div className="p-4 border-b flex justify-between items-center border-gray-200">
        <div className="flex">
          <button onClick={() => navigate("/admin/communication?tab=reviews")} className="font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700 transition-colors">
            Content
          </button>
          <button className="px-4 py-2 font-medium text-sm border-b-2 border-[#C9A14A] text-[#C9A14A] ml-6">
            Messages
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="flex shadow-sm w-full h-full border rounded-md border-gray-50">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col overflow-y-auto">
          {listLoading && <p className="p-4 text-sm text-gray-400">Loading...</p>}
          {filtered.map((chat) => (
            <div
              key={chat.id}
              onClick={() => { setSelectedPartnerId(chat.id); setMessages([]); }}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedPartnerId === chat.id ? "bg-amber-50 border-l-4 border-l-[#C9A14A]" : ""}`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar src={chat.profile_picture} name={chat.full_name} />
                  {chat.is_online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{chat.full_name}</h3>
                    <div className="flex flex-col items-end space-y-1">
                      <span className="text-xs text-gray-500">{formatTime(chat.last_message_time)}</span>
                      {chat.unread_count > 0 ? (
                        <span className="w-4 h-4 bg-[#C9A14A] text-white rounded-full flex items-center justify-center text-[9px]">
                          {chat.unread_count}
                        </span>
                      ) : (
                        <IoCheckmarkDoneOutline className="text-blue-500 text-sm" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 capitalize mt-0.5">{chat.role}</p>
                  <p className="text-sm text-gray-500 truncate mt-1">{chat.last_message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {!selectedPartnerId ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Select a conversation to start chatting
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar src={selectedPartner?.profile_picture} name={selectedPartner?.full_name} />
                    {selectedPartner?.is_online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">{selectedPartner?.full_name}</h2>
                    <p className="text-xs text-gray-500">
                      {selectedPartner?.is_online ? (
                        <span className="text-green-500">Online</span>
                      ) : (
                        selectedPartner?.email
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => {
                  const isMe = msg.senderId === adminId;
                  return (
                    <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      <div className="max-w-xs lg:max-w-md">
                        {isMe ? (
                          <div className="flex items-end space-x-2 justify-end">
                            <div>
                              <div className="bg-[#C9A14A] rounded-lg px-4 py-2">
                                <p className="text-sm text-white">{msg.text}</p>
                              </div>
                              <p className="text-xs text-gray-500 mt-1 text-right">{formatTime(msg.time)}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start space-x-2">
                            <Avatar src={selectedPartner?.profile_picture} name={selectedPartner?.full_name} size="w-8 h-8" />
                            <div>
                              <div className="bg-gray-100 rounded-lg px-4 py-2">
                                <p className="text-sm text-gray-900">{msg.text}</p>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{formatTime(msg.time)}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-end space-x-2">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    rows={3}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none resize-none text-sm"
                  />
                  <button
                    onClick={handleSend}
                    className="bg-[#C9A14A] text-white px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors hover:bg-amber-600"
                  >
                    <FaPaperPlane />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingInterface;
