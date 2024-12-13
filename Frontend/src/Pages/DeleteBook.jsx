import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Backbutton from '../Components/Backbutton'
import Spinner from '../Components/Spinner'
import { useSnackbar } from 'notistack'
import Logo from '../Components/Logo'
const DeleteBook = () => {
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const {enqueueSnackbar}=useSnackbar()
    const handledeletebook = () => {
        setloading(true)
        axios.delete(`http://localhost:5555/books/${id}`)
            .then(() => {
                setloading(false)
                enqueueSnackbar('Book edit sccessfully',{variant:'success',anchorOrigin:{vertical:'bottom', horizontal:'right'}})
                navigate('/')
            })
            .catch((error) => {
                setloading(false)
                enqueueSnackbar('Error', {variant:'error'})
                console.log(error)
                alert('an error occured')
            })
    }
    return (
        <div className='p-4 text-zinc-400' >
            <Logo/>
            <Backbutton />
            <h1 className='text-3xl my-4 ' >Delete Book</h1>
            {
                loading ? <Spinner /> : ''
            }
            <div className='flex flex-xol items-center border-2 border-sky-600 rounded-lg w-[600px] p-8 mx-auto' >
                <h3 className='text-2xl' >Are you sure want to delete this book?</h3>
                <button className='bg-red-600 p-4 text-white m-8 w-full' onClick={handledeletebook} >Yes, delete it</button>
            </div>
        </div>
    )
}

export default DeleteBook
