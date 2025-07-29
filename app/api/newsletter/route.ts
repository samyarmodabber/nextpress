import { NewsletterAPI } from 'pliny/newsletter'
import siteSetting from '@/components/siteSetting'

const handler = NewsletterAPI({
  // @ts-ignore
  provider: siteSetting.newsletter.provider,
})

export { handler as GET, handler as POST }
