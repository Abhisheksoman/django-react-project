import  {React,useState,useEffect} from 'react'
import { Box, Button, Typography } from '@mui/material'
import MyDatePickerField from './forms/MyDatePickerField'
import MyMultiLineField from './forms/MyMultiLineField'
import MySelectField from './forms/MySelectField'
import MyTextField from './forms/MyTextField'
import { useForm } from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import {useNavigate} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import MyMultiSelectField from './forms/MyMultiSelectField'
const Create = () => {
  const [projectmanager,setprojectmanager] = useState()
  const [employees,setEmployees] = useState()
  const [loading,setLoading] = useState(true)
  const hardcoded_options =[
    {id:"",name:"None"},
    {id:"Open",name:"Open"},
    {id:"In Progress",name:"In Progress"},
    {id:"Completed",name:"Completed"},
  ]
  const GetData = () =>{
    AxiosInstance.get(`projectmanager/`).then((res) => {
      setprojectmanager(res.data)
    })

    AxiosInstance.get(`employees/`).then((res) => {
      setEmployees(res.data)
      setLoading(false)
    })
  }

  useEffect(()=>{
    GetData();
  },[])
  const navigate = useNavigate()
  const defaultValues = {
    name:'',
    comments:'',
    status:'',
    
  }

  const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    projectmanager: yup.string().required('Project Manager Should not be Empty'),
    status: yup.string().required('Status is required'),
    comments: yup.string(),
    employees:yup.array().min(1,"Employee Field Cannot be Empty"),
    start_date:yup.date().required('Start Date Should not be Empty'),
    end_date:yup.date().required('End Date Should not be Empty').min(yup.ref('start_date'),'End date cannot be before the start date'),
  })
  .required()

  const {handleSubmit,control} = useForm({defaultValues:defaultValues,resolver:yupResolver(schema)})
  const submission = (data) => {
    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")
    AxiosInstance.post(`project/`,{
      name:data.name,
      projectmanager:data.projectmanager,
      status:data.status,
      employees:data.employees,
      comments:data.comments,
      start_date:StartDate,
      end_date:EndDate,
    })

    .then((res)=>{
      navigate(`/`)
    })
  }
  return (
    <div>
      {
        loading?<p>Loading data ...</p>:
      <form onSubmit={handleSubmit(submission)}>
      <Box sx={{display:"flex",width:"120%",backgroundColor:"#00003f",marginBottom:"10px"}}>
        <Typography sx={{marginLeft:"20px",color:"white"}}>
          Create Records
        </Typography>
      </Box>

      <Box sx={{display:"flex",width:"100%",boxShadow:3,padding:4,flexDirection:"column"}}>

      <Box sx={{display:"flex",justifyContent:'space-around',marginBottom:"40px"}}> 
        <MyTextField
          label="Name"
          name="name"
          control={control}
          placeholder="Please Provide a Valid Project Name"
          width = {'30%'}
        />
        <MyDatePickerField
          label="Start_date"
          name="start_date"
          control={control}
          width = {'30%'}
        />
        <MyDatePickerField
          label="End_date"
          name="end_date"
          control={control}
          width = {'30%'}
        />
      </Box>
      <Box sx={{display:"flex",justifyContent:'space-around'}}> 
        <MyMultiLineField
          label="Comments"
          name="comments"
          control={control}
          placeholder="Please Provide a beatiful Comment"
          width = {'30%'}
        />
        <MySelectField
          label="Status"
          name="status"
          control={control}
          width = {'30%'}
          options = {hardcoded_options}
        />
        
    
          <MySelectField
            label="Project Manager"
            name="projectmanager"
            control={control}
            width = {'30%'}
            options = {projectmanager}
          />  
      </Box>
      <Box sx={{display:"flex",justifyContent:'start',marginTop:'40px',marginRight:'10px'}}>
        <MyMultiSelectField
          label="Employees"
          name="employees"
          control={control}
          width = {'30%'}
          options = {employees}
        />
      </Box>
      <Box sx={{display:"flex",justifyContent:'start',marginTop:'45px'}}>
        <Button variant='contained' type='submit' sx={{width:"30%"}}>
              Submit
            </Button>
      </Box>
      </Box>
      </form>}
    </div>
  )
}

export default Create