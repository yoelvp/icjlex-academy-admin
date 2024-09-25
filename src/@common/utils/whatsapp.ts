import { WHATSAPP_LINK } from '@/config'

export const whatsappMessage = ({ message }: { message: string }): string => {
  const sendMessage = `${WHATSAPP_LINK}?text=${message}`

  return sendMessage
}
