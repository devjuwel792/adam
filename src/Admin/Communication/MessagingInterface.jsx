"use client";

import { useState } from "react";
import Avatar from "../../assets/images/Image-52.png";
import { FaCheckDouble, FaPaperPlane } from "react-icons/fa6";
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkDone,
  IoCheckmarkDoneOutline,
} from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

const MessagingInterface = ({ onPageShow }) => {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Fariha Tasnim",
      email: "fariha.tasnim@gmail.com",
      subject: "Payment Issue - Urgent",
      preview:
        "I'm confused. My order #12345 payment isn't showing as complete...",
      time: "15:20",
      status: "read",
      avatar: Avatar,
      messages: [
        {
          id: 1,
          sender: "user",
          content:
            "I'm confused. My order #12345 payment isn't showing as complete, but I've already made the payment. Could you please check what's going on? I used my Visa card on 24.06.25. Please look into this urgently.",
          time: "Today at 3:00 PM",
        },
        {
          id: 2,
          sender: "support",
          content:
            "Thanks for letting us know about this regarding order #12345. We understand your concerns and are actively looking into the payment discrepancy for you. We'll get back to you with an update and a resolution as soon as possible.",
          time: "Today at 3:42 PM",
        },
      ],
    },
    {
      id: 2,
      name: "Mubin Hossain",
      email: "mubin.hossain@gmail.com",
      subject: "Delivery Issue - Urgent",
      preview: "I'm confused. My order #12345 payment isn't",
      time: "15:20",
      status: "warning",
      avatar: Avatar,
      messages: [
        {
          id: 1,
          sender: "user",
          content:
            "I'm confused. My order #12345 payment isn't showing as complete.",
          time: "Today at 2:30 PM",
        },
      ],
    },
    {
      id: 3,
      name: "Saba",
      email: "saba@gmail.com",
      subject: "Payment Issue - Urgent",
      preview: "Hi, I'm having trouble with my payment",
      time: "15:20",
      status: "warning",
      avatar: Avatar,
      messages: [
        {
          id: 1,
          sender: "user",
          content: "Hi, I'm having trouble with my payment",
          time: "Today at 1:15 PM",
        },
      ],
    },
    {
      id: 4,
      name: "Fariha Tasnim",
      email: "fariha.tasnim@gmail.com",
      subject: "Payment Issue - Urgent",
      preview:
        "I'm confused. My order #12345 payment isn't showing as complete...",
      time: "15:20",
      status: "read",
      avatar: Avatar,
      messages: [
        {
          id: 1,
          sender: "user",
          content:
            "I'm confused. My order #12345 payment isn't showing as complete.",
          time: "Today at 12:00 PM",
        },
      ],
    },
    {
      id: 5,
      name: "Mubin Hossain",
      email: "mubin.hossain@gmail.com",
      subject: "Delivery Issue - Urgent",
      preview: "I'm confused. My order #12345 payment isn't",
      time: "15:20",
      status: "warning",
      avatar: Avatar,
      messages: [
        {
          id: 1,
          sender: "user",
          content:
            "I'm confused. My order #12345 payment isn't showing as complete.",
          time: "Yesterday at 5:30 PM",
        },
      ],
    },
    {
      id: 6,
      name: "Saba",
      email: "saba@gmail.com",
      subject: "Payment Issue - Urgent",
      preview: "Hi, I'm having trouble with my payment",
      time: "15:20",
      status: "warning",
      avatar: Avatar,
      messages: [
        {
          id: 1,
          sender: "user",
          content: "Hi, I'm having trouble with my payment",
          time: "Yesterday at 4:20 PM",
        },
      ],
    },
  ];

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentConversation = conversations[selectedConversation];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      style={{ fontFamily: "Montserrat" }}
      className="bg-white   h-[calc(100vh-200px)]  "
    >
      {/* Left Sidebar - Conversations List */}
      {/* Search Bar */}
      <div className="p-4 border-b flex justify-between items-center border-gray-200">
        {/* Tabs */}
        <div className="flex  ">
          <button
            onClick={() => onPageShow()}
            className={` font-medium text-sm border-b-2 transition-colors 
             ${
               ""
               // activeTab === "content"
               //   ? "border-[#C9A14A] text-[#C9A14A]"
               //   : "border-transparent text-gray-500 hover:text-gray-700"
             }
          `}
          >
            Content
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ml-6  border-[#C9A14A] text-[#C9A14A] ${
              ""
              // activeTab === "messages"
              //   ? "border-[#C9A14A] text-[#C9A14A]"
              //   : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Messages
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" pl-10 pr-4 py-2 border border-gray-300 rounded-lg "
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div className="flex shadow-sm w-full h-full border rounded-md border-gray-50">
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation, index) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(index)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors
                     ${
                       ""
                       //   selectedConversation === index
                       //     ? "bg-blue-50 border-l-4 border-l-blue-500"
                       //     : ""
                     }
                `}
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={conversation.avatar || "/placeholder.svg"}
                    alt={conversation.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {conversation.name}
                      </h3>
                      <div className="flex flex-col items-center justify-center space-y-1">
                        <div className="text-xs text-gray-500">
                          {conversation.time}
                        </div>
                        {conversation.status === "read" && (
                          <IoCheckmarkDoneOutline className="text-blue-600" />
                        )}
                        {conversation.status === "warning" && (
                          <div className="w-4 h-4 bg-[#C9A14A] text-white rounded-full flex items-center text-[9px] justify-center">
                            3
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mt-1">
                      {conversation.subject}
                    </p>
                    <p className="text-sm text-gray-500 truncate mt-1">
                      {conversation.preview}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right Side - Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              <img
                src={currentConversation.avatar || "/placeholder.svg"}
                alt={currentConversation.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {currentConversation.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {currentConversation.email}
                </p>
              </div>
            </div>
            <div className="">
              <h3 className="text-lg font-semibold text-gray-900 mt-4">
                {currentConversation.subject}
              </h3>
              <p className="text-sm text-gray-500">Today at 2:06 PM</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentConversation.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-start" : "justify-end"
                }`}
              >
                <div className="max-w-xs lg:max-w-md">
                  {message.sender === "user" && (
                    <div className="flex items-start space-x-2">
                      <img
                        src={currentConversation.avatar || "/placeholder.svg"}
                        alt={currentConversation.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="bg-gray-100 rounded-lg px-4 py-2">
                          <p className="text-sm text-gray-900">
                            {message.content}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {message.time}
                        </p>
                      </div>
                    </div>
                  )}
                  {message.sender === "support" && (
                    <div className="flex items-start space-x-2 justify-end">
                      <div className="cursor-pointer flex items-center gap-1 mb-1 justify-end">
                        <FaEdit className="text-[#C9A14A]" />
                      </div>
                      <div>
                        <div className="bg-[#C9A14A]  rounded-lg px-4 py-2">
                          <p className="text-sm text-white pb-3">
                            {message.content}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">
                          {message.time}
                        </p>
                      </div>
                      <div>
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <img src={Avatar} alt="Support" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-end space-x-2 mt-2">
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your reply..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none resize-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-between my-3">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                className="bg-[#C9A14A] text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <FaPaperPlane />
                <span>Send Reply</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingInterface;
