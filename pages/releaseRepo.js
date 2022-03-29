import { useContext } from 'react'
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { AuthenticationContext } from 'gitea-react-toolkit'
import Layout from '@components/Layout'
import ReleaseRepoSettings from '@components/ReleaseSettings'
// import TranslationSettings from '@components/TranslationSettings'

const ReleasePage = () => {
  const router = useRouter()
  const { state: authentication } = useContext(AuthenticationContext)

  return (
    <Layout>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col w-full px-4 lg:w-132 lg:p-0'>
          <h1 className='mx-4'>Release Repository</h1>
          <ReleaseRepoSettings authentication={authentication} />
          {/* <TranslationSettings authentication={authentication} /> */}
          <div className='flex justify-end'>
            <Button
              size='large'
              color='primary'
              className='my-3 mx-1'
              variant='contained'
              onClick={() => router.push('/')}
            >
              Cancel
            </Button>
            <Button
              size='large'
              color='primary'
              className='my-3 mx-1'
              variant='contained'
              onClick={() => router.push('/')}
            >
              Release Repository
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ReleasePage
