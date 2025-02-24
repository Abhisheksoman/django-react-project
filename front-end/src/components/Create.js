import React from 'react'
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

const Create = () => {
  const navigate = useNavigate()
  const defaultValues = {
    name:'',
    comments:'',
    status:'',
    
  }

  const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    status: yup.string().required('Status is required'),
    comments: yup.string(),
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
      status:data.status,
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
        />
        
        <Box sx={{width:"30%"}}>
          <Button variant='contained' type='submit' sx={{width:"100%"}}>
            Submit
          </Button>
        </Box>
      </Box>

      </Box>
      </form>
    </div>
  )
}

export default Create