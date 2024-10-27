import { jwtVerify } from 'jose'
import { JWT_SECRET_KEY } from '@/@common/env'

export const decryptToken = async (token: string): Promise<string | undefined> => {
  const { payload: { sub } } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET_KEY))

  return sub
}
