import NewsletterForm from 'pliny/ui/NewsletterForm'
import siteSetting from '@/components/siteSetting'
const Newslatter = () => {
  return (
    <>
      {siteSetting.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}

export default Newslatter
