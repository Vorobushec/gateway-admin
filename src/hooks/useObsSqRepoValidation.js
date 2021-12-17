import { useEffect, useState } from 'react';
import {getTreesManifest} from '@utils/getTreesManifest'
import { WORKING } from '@common/constants';

export default function useObsSqRepoValidation({authentication, owner, server, languageId, refresh}) {
  const [{obsSqRepoTree, 
    obsSqRepoTreeManifest, 
    obsSqRepoTreeErrorMessage}, 
    setValues
  ] = useState({obsSqRepoTree:null, obsSqRepoTreeManifest:null, obsSqRepoTreeErrorMessage:WORKING})
  // Translation Notes Hook
  // Example: https://qa.door43.org/api/v1/repos/vi_gl/vi_sq/git/trees/master?recursive=true&per_page=99999
  useEffect(() => {
    async function getReposTrees() {
      const url = `${server}/api/v1/repos/${owner}/${languageId}_obs-sq/git/trees/master?recursive=false&per_page=999999`
      const {RepoTree: _tree, Manifest: _manifest, RepoTreeErrorMessage: _errorMesage} =  await getTreesManifest(authentication, url)
      setValues({obsSqRepoTree: _tree, obsSqRepoTreeManifest: _manifest, obsSqRepoTreeErrorMessage: _errorMesage})
    }

    if (authentication && owner && server && languageId && refresh) {
      getReposTrees()
    } else {
      //console.warn(`AdminContext - reached, but not logged in`)
    }
  }, [authentication, owner, server, languageId, refresh])

  return {
    state: {
      obsSqRepoTree,
      obsSqRepoTreeManifest,
      obsSqRepoTreeErrorMessage,
    },
  }
}