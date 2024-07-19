import NewsletterForm from 'pliny/ui/NewsletterForm'
import siteMetadata from '@/data/siteMetadata'
const Newslatter = () => {
  return (
    <>
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}

export default Newslatter
