import {useState, useEffect, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GetAppIcon from '@material-ui/icons/GetApp';
import { green, red, yellow, grey } from '@material-ui/core/colors'
import { CircularProgress, Tooltip } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import * as cvs from '@utils/csvMaker'

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
    backgroundColor: props => (props.active ? '#ffffff' : 'transparent'),
    '&:hover': {
      color: props => (props.active ? '#ffffff' : theme.palette.primary.main),
      backgroundColor: props => (props.active ? '#07b811' : '#ffffff'),
    },
    border: '1px solid #0089C7',
  },
}))


function DownloadCvResults({ active, bookId, validationResults, getAllValidationResults }) {
  const [submitDownloadCvResults, setSubmitDownloadCvResults] = useState(false)
  const [cvStatus, setCvStatus] = useState(<CircularProgress/>)
   
  useEffect(() => {
    // determine status of validation 
    let _status
    for (let i=1; i < validationResults.length; i++) {
      if ( parseInt(validationResults[i][0]) >= 800 ) {
        _status = red[500]
        break // stop looking
      }
      if ( parseInt(validationResults[i][0]) >= 600 ) {
        _status = yellow[500] // keep looking, don't break
      }
    }
    if ( _status === red[500] ) { 
      setCvStatus(<GetAppIcon style={{ color: red[500] }} aria-label="Download CV results" />)
    } else if ( _status === yellow[500]  ) {
      setCvStatus(<GetAppIcon style={{ color: yellow[500] }} aria-label="Download CV results" />)
    } else {
      setCvStatus(<GetAppIcon style={{ color: green[500] }} aria-label="Download CV results" />)
    }

    if ( !submitDownloadCvResults ) return;

    async function doSubmitDownloadCvResults() {
      const results = getAllValidationResults()
      let ts = new Date().toISOString();
      let fn = 'gaValidationResults-' + bookId + '-' + ts + '.csv';

      cvs.download(fn,results)
      setSubmitDownloadCvResults(false)
    }
    doSubmitDownloadCvResults()
  }, [submitDownloadCvResults, bookId])
  

  const classes = useStyles({ active })
  return (
    <Tooltip title="Download all content validation results">
      <IconButton className={classes.iconButton} onClick={() => setSubmitDownloadCvResults(true)} aria-label="Download CV Results">
        {cvStatus}
      </IconButton>
    </Tooltip>
  )
}

export default DownloadCvResults

/*

        <GetAppIcon aria-label="Download CV results" />


        // now loop thru the results and determine the status
        let _status = grey[900]
        // setCvStatus(_status) // reset it
        for (let i=1; i < data.length; i++) {
          if ( parseInt(data[i][0]) >= 800 ) {
            _status = red[500]
            break // stop looking
          }
          if ( parseInt(data[i][0]) >= 600 ) {
            _status = yellow[500] // keep looking, don't break
          }
        }
        if ( _status === red[500] ) { 
          setCvIstatus(<DoneOutlineOutlinedIcon style={{ color: red[500] }} />)
        } else if ( _status === yellow[500]  ) {
          setCvIstatus(<DoneOutlineOutlinedIcon style={{ color: yellow[500] }} />)
        } else {
          console.log("set to green")
          setCvIstatus(<DoneOutlineOutlinedIcon style={{ color: green[500] }} />)
        }
        setCvStatus(true)

*/