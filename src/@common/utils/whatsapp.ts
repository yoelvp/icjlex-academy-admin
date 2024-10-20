import { WHATSAPP_BASE_URL } from '../env'

interface MessageProps {
  message: string
  phoneNumber: string
}

export const whatsappMessage = ({ message, phoneNumber }: MessageProps): string => {
  const sendMessage = `${WHATSAPP_BASE_URL}/${phoneNumber}?text=${message}`

  return sendMessage
}
