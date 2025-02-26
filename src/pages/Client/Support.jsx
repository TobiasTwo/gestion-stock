import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';

export default function Support() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simuler un ID de conversation unique (à remplacer par une vraie logique)
  const conversationId = "conv-123";

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      // À remplacer par votre appel API
      // const response = await api.get(`/conversations/${conversationId}/messages`);
      // setMessages(response.data);
      
      // Simulation pour démonstration
      setMessages([
        { id: 1, text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?", isAgent: true, timestamp: new Date() }
      ]);
    } catch (error) {
      console.error("Erreur lors du chargement des messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (messageText) => {
    try {
      // À remplacer par votre appel API
      // const response = await api.post(`/conversations/${conversationId}/messages`, {
      //   text: messageText,
      //   isAgent: false
      // });
      // const newMessage = response.data;
      
      // Simulation pour démonstration
      const newMsg = {
        id: messages.length + 1,
        text: messageText,
        isAgent: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMsg]);

      // Simuler une réponse de l'agent
      setTimeout(async () => {
        // Ici vous pourriez avoir un vrai appel API pour obtenir la réponse de l'agent
        // const agentResponse = await api.post('/agent/respond', { messageText });
        
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: "Merci de votre message. Un agent va vous répondre dans les plus brefs délais.",
          isAgent: true,
          timestamp: new Date()
        }]);
      }, 1000);

    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageText = newMessage;
    setNewMessage('');
    await sendMessage(messageText);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        Chargement des messages...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Support Client</h2>
      
      <Card className="max-w-3xl mx-auto">
        <div className="h-[500px] flex flex-col">
          {/* Zone des messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.isAgent ? 'justify-start' : 'justify-end'}`}
              >
                <div className="max-w-[70%]">
                  <div 
                    className={`rounded-lg p-3 ${
                      message.isAgent 
                        ? 'bg-gray-100' 
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                  <div className={`text-xs mt-1 text-gray-500 ${
                    message.isAgent ? 'text-left' : 'text-right'
                  }`}>
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Zone de saisie */}
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-1 p-2 border rounded"
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}