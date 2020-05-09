import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import api from '~/services/api'

import { connect, socket } from '~/services/socket'

import {
  Container,
  ChatHistory,
  List,
  ChatContainer,
  Message,
  MessageDateTime,
  MessageData,
  MessageDataName,
  ListMessage,
  FormMessage,
  InputMessage,
  DicesRollContainer,
  InputMulti,
  DiceContainer,
  Dice,
} from './styles'

export default function Chat() {
  const profile = useSelector(state => state.user.profile)
  const [message, setMessage] = useState('')
  const [messages, updateMessages] = useState([])
  const [multiplier, setMultiplier] = useState(1)
  // const [result, setResult] = useState()

  const from = profile.id

  const messagesEndRef = React.createRef(null)

  function scrollToBottom() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function formatDate(date) {
    const convertedDate = parseISO(date)
    const localDate = utcToZonedTime(convertedDate)

    return format(localDate, 'dd-MM-yy HH:mm:ss')
  }

  async function loadAllMessages() {
    try {
      const response = await api.get('/chats')

      updateMessages(response.data)
    } catch (e) {
      toast.error('Conexao com a API mal sucedida.')
    }
  }

  useEffect(() => {
    scrollToBottom()
  })

  useEffect(() => {
    connect()

    loadAllMessages()
  }, [])

  useEffect(() => {
    const handleNewMessage = newMessage =>
      updateMessages([...messages, newMessage])
    socket.on('chat.message', handleNewMessage)

    return () => socket.off('chat.message', handleNewMessage)
  }, [messages])

  const handleFormSubmit = event => {
    event.preventDefault()

    if (message.trim()) {
      api.post('chats', {
        id: from,
        user_id: profile.id,
        user: profile.name,
        message,
      })

      setMessage('')
    }
  }

  function handleCalculateTotal(sides) {
    let calc = 0
    const random = () => {
      return Math.floor(Math.random() * sides) + 1
    }

    // eslint-disable-next-line
    for (let i = 0; i < multiplier; i++) {
      calc += random()
    }

    const rolled = `Rolou ${multiplier} x d${sides} com resultado: ${calc}`

    api.post('chats', {
      id: from,
      user_id: profile.id,
      user: profile.name,
      message: rolled,
    })
  }

  return (
    <Container>
      <ChatContainer>
        <ChatHistory>
          <List>
            {messages.map((m, index) => (
              <ListMessage
                ref={messagesEndRef}
                from={from === m.id ? 1 : 0}
                key={index} // eslint-disable-line
              >
                <MessageData from={from === m.id ? 1 : 0}>
                  <MessageDateTime from={from === m.id ? 1 : 0}>
                    {formatDate(m.date)}
                  </MessageDateTime>
                  <MessageDataName from={from === m.id ? 1 : 0}>
                    {m.user}
                  </MessageDataName>
                </MessageData>
                <Message from={from === m.id ? 1 : 0}>{m.message}</Message>
              </ListMessage>
            ))}
          </List>
        </ChatHistory>

        <FormMessage onSubmit={handleFormSubmit}>
          <InputMessage
            onChange={e => setMessage(e.target.value)}
            placeholder="Mensagem..."
            type="text"
            value={message}
          />
        </FormMessage>
      </ChatContainer>
      <DicesRollContainer>
        <DiceContainer>
          <InputMulti
            className="multiplier"
            type="number"
            pattern="[0-9]*"
            min="1"
            max="10"
            placeholder="1"
            onChange={e => setMultiplier(e.target.value)}
          />
          <Dice
            onClick={() => {
              handleCalculateTotal(4)
            }}
          >
            <strong>d4</strong>
          </Dice>
          <Dice
            onClick={() => {
              handleCalculateTotal(6)
            }}
          >
            <strong>d6</strong>
          </Dice>
          <Dice
            onClick={() => {
              handleCalculateTotal(8)
            }}
          >
            <strong>d8</strong>
          </Dice>
          <Dice
            onClick={() => {
              handleCalculateTotal(10)
            }}
          >
            <strong>d10</strong>
          </Dice>
          <Dice
            onClick={() => {
              handleCalculateTotal(12)
            }}
          >
            <strong>d12</strong>
          </Dice>
          <Dice
            onClick={() => {
              handleCalculateTotal(20)
            }}
          >
            <strong>d20</strong>
          </Dice>
        </DiceContainer>
      </DicesRollContainer>
    </Container>
  )
}