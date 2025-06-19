import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './button'
import { Input } from './input'
import { Card, CardContent } from './card'
import { ScrollArea } from './scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { 
  Send, 
  Mic, 
  Settings, 
  MessageSquare, 
  Brain, 
  Zap,
  User,
  Bot
} from 'lucide-react'
import nyraLogo from './nyra-logo.svg'

const MainApp = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm Nyra, your AI assistant. How can I help you today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isListening, setIsListening] = useState(false)

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: inputValue,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, newMessage])
      setInputValue('')
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: 'bot',
          content: "I understand your request. As an AI assistant based on Leon AI, I'm here to help you with various tasks. What would you like to explore?",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
      }, 1000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleListening = () => {
    setIsListening(!isListening)
    // In a real app, this would start/stop voice recognition
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
      {/* Sidebar */}
      <div className="w-80 bg-white/80 backdrop-blur-lg border-r border-white/20 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <img src={nyraLogo} alt="Nyra" className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Nyra
              </h1>
              <p className="text-sm text-gray-500">AI Assistant</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 space-y-3">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
          
          <Button variant="ghost" className="w-full justify-start gap-3 h-12">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span>New Conversation</span>
          </Button>
          
          <Button variant="ghost" className="w-full justify-start gap-3 h-12">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>AI Analysis</span>
          </Button>
          
          <Button variant="ghost" className="w-full justify-start gap-3 h-12">
            <Zap className="w-5 h-5 text-yellow-600" />
            <span>Quick Tasks</span>
          </Button>
          
          <Button variant="ghost" className="w-full justify-start gap-3 h-12">
            <Settings className="w-5 h-5 text-gray-600" />
            <span>Settings</span>
          </Button>
        </div>

        {/* Recent Conversations */}
        <div className="flex-1 p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Conversations</h3>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors">
              <p className="text-sm font-medium text-gray-800">Getting Started with Nyra</p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
            <div className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <p className="text-sm font-medium text-gray-800">Project Planning Help</p>
              <p className="text-xs text-gray-500">1 hour ago</p>
            </div>
            <div className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <p className="text-sm font-medium text-gray-800">Code Review Session</p>
              <p className="text-xs text-gray-500">Yesterday</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="liquidGlass-wrapper m-4 mb-0">
          <div className="liquidGlass-effect"></div>
          <div className="liquidGlass-content py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={nyraLogo} />
                  <AvatarFallback>NY</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-gray-800">Nyra Assistant</h2>
                  <p className="text-sm text-gray-500">Online • Ready to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarImage src={nyraLogo} />
                    <AvatarFallback>NY</AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-[70%] ${message.type === 'user' ? 'order-first' : ''}`}>
                  <Card className={`${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0' 
                      : 'bg-white/80 backdrop-blur-sm'
                  }`}>
                    <CardContent className="p-4">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {message.type === 'user' && (
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback>
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4">
          <div className="liquidGlass-wrapper max-w-4xl mx-auto">
            <div className="liquidGlass-effect"></div>
            <div className="liquidGlass-content py-4">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="min-h-[50px] resize-none border-0 bg-white/50 backdrop-blur-sm focus:bg-white/80 transition-all"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleListening}
                    className={`w-12 h-12 rounded-full ${
                      isListening 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Mic className="w-5 h-5" />
                  </Button>
                  
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainApp

