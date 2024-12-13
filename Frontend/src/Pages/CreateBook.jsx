import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Backbutton from '../Components/Backbutton'
import Spinner from '../Components/Spinner'
import { useSnackbar } from 'notistack'
import Logo from '../Components/Logo'
const CreateBook = () => {
    const [title, settitle] = useState('')
    const [author, setauthor] = useState('')
    const [publishyear, setpublishyear] = useState('')
    const [loading, setloading] = useState(false)
    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()
    const handlesavebook = () => {
        const data = {
            title,
            author,
            publishyear
        }
        setloading(true)
        axios.post('http://localhost:5555/books', data)
            .then(() => {
                setloading(false)
                enqueueSnackbar('Book Created Successfully', {variant:'success',anchorOrigin:{vertical:'bottom', horizontal:'right'}})
                navigate('/')
            })
            .catch((error) => {
                setloading(false)
                alert('An error occured')
                enqueueSnackbar('Error', {variant:'error'})
                console.log(error)
            })
    }
    return (
        <div className='p-4' >
            <Logo/>
            <Backbutton />
            <h1 className='text-3xl my-4 text-zinc-100' >Create Book</h1>
            {
                loading ? <Spinner /> : ''
            }
            <div className='flex flex-col border-sky-500 max-w-[350px] md:w-[85%] p-4 mx-auto rounded-xl border-2' >
                <div className='my-4' >
                    <label className='text-xl mr-4 text-zinc-400 '>Title</label>
                    <input type="text" value={title} onChange={(e) => settitle(e.target.value)} className='border-2  px-4 py-2 w-full focus-within:border border-sky-500 outline-none bg-slate-800 text-white' />
                </div>
                <div className='my-4' >
                    <label className='text-xl mr-4 text-zinc-400 '>Author</label>
                    <input type="text" value={author} onChange={(e) => setauthor(e.target.value)} className='border-2  px-4 py-2 w-full focus-within:border border-sky-500 outline-none bg-slate-800 text-white' />
                </div>
                <div className='my-4' >
                    <label className='text-xl mr-4 text-zinc-400 '>Publish Year</label>
                    <input type="text" value={publishyear} onChange={(e) => setpublishyear(e.target.value)} className='border-2  px-4 py-2 w-full focus-within:border border-sky-500 outline-none bg-slate-800 text-white' />
                </div>
                <button className='p-2 bg-sky-500 m-8 text-white font-bold text-xl' onClick={handlesavebook} >Create</button>
            </div>
        </div>
    )
}

export default CreateBook
