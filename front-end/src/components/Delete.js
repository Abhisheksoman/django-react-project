import {React,useEffect,useState} from 'react'
import { Box, Button, Typography } from '@mui/material'
import AxiosInstance from './Axios'
import {useNavigate,useParams} from 'react-router-dom'

const Delete = () => {
  const Myparams = useParams()
  const Myid = Myparams.id

  const [myData,setMyData] = useState()
  const [loading,setLoading] = useState(true)
  const GetData = () =>{
    AxiosInstance.get(`project/${Myid}`).then((res) => {
      setMyData(res.data)
      setLoading(false)
    })
  }

  useEffect(()=>{
    GetData();
  },[])


  const navigate = useNavigate()
  

  
  const submission = (data) => {
    AxiosInstance.delete(`project/${Myid}/`)
    .then((res)=>{
      navigate(`/`)
    })
  }
  return (
    

    <div>
      {
      loading?<p>Loading data ...</p>:
      <div>
        <Box sx={{display:"flex",width:"120%",backgroundColor:"#00003f",marginBottom:"10px"}}>
        <Typography sx={{marginLeft:"20px",color:"white"}}>
          Delete Records:{myData.name}
        </Typography>
      </Box>

      <Box sx={{display:"flex",width:"100%",boxShadow:3,padding:4,flexDirection:"column"}}>

      <Box sx={{display:"flex",justifyContent:'start',marginBottom:"40px"}}> 
        Are you sure you want to delete the record:{myData.name}
      </Box>
      <Box sx={{width:"30%"}}>
        <Button variant='contained' onClick={submission} sx={{width:"100%"}}>
            Delete the project
        </Button>
      </Box>
      
      </Box>
      </div>}
    </div>
  )
}

export default Delete