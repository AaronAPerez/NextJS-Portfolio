'use client'

import { useState, useEffect, useRef } from 'react'

interface Client {
  id: string
  name: string
  company: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
}

interface ClientSelectorProps {
  onSelect: (client: Client | null) => void
  selectedClientId?: string | null
}

export default function ClientSelector({ onSelect, selectedClientId }: ClientSelectorProps) {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients?status=active')
        if (response.ok) {
          const data = await response.json()
          setClients(data)

          // Set selected client if ID provided
          if (selectedClientId) {
            const client = data.find((c: Client) => c.id === selectedClientId)
            if (client) {
              setSelectedClient(client)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching clients:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchClients()
  }, [selectedClientId])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelect = (client: Client) => {
    setSelectedClient(client)
    setIsOpen(false)
    setSearchQuery('')
    onSelect(client)
  }

  const handleClear = () => {
    setSelectedClient(null)
    onSelect(null)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Existing Client
      </label>

      {selectedClient ? (
        <div className="flex items-center justify-between p-3 bg-cyan-50 border-2 border-cyan-400 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">{selectedClient.name}</p>
            {selectedClient.company && (
              <p className="text-sm text-gray-600">{selectedClient.company}</p>
            )}
            {selectedClient.email && (
              <p className="text-sm text-gray-500">{selectedClient.email}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-red-500 p-1"
          >
            ✕
          </button>
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-3 border-2 border-gray-300 rounded-lg text-left hover:border-cyan-400 transition-colors"
          >
            <span className="text-gray-500">
              {isLoading ? 'Loading clients...' : 'Select a client or enter new...'}
            </span>
            <span className="text-gray-400">{isOpen ? '▲' : '▼'}</span>
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-hidden">
              <div className="p-2 border-b border-gray-100">
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                  autoFocus
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredClients.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    {searchQuery ? 'No clients found' : 'No clients yet'}
                  </div>
                ) : (
                  filteredClients.map((client) => (
                    <button
                      key={client.id}
                      type="button"
                      onClick={() => handleSelect(client)}
                      className="w-full p-3 text-left hover:bg-cyan-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {client.company && <span>{client.company}</span>}
                        {client.company && client.email && <span>•</span>}
                        {client.email && <span>{client.email}</span>}
                      </div>
                    </button>
                  ))
                )}
              </div>
              <div className="p-2 border-t border-gray-100 bg-gray-50">
                <a
                  href="/admin/clients"
                  target="_blank"
                  className="block text-center text-sm text-cyan-600 hover:text-cyan-700 py-1"
                >
                  + Manage Clients
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
