import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import { useNavigate ,useParams } from 'react-router-dom'
import Backbutton from '../Components/Backbutton'
import Spinner from '../Components/Spinner'
import { useSnackbar } from 'notistack'
import Logo from '../Components/Logo'
const EditBook = () => {
    const [title, settitle] = useState('')
    const [author, setauthor] = useState('')
    const [publishyear, setpublishyear] = useState('')
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
    const {enqueueSnackbar}=useSnackbar()
    const {id} = useParams()
    useEffect(() => {
      setloading(true)
      axios.get(`http://localhost:5555/books/${id}`)
      .then((response)=>{
        setauthor(response.data.author)
        setpublishyear(response.data.publishyear)
        settitle(response.data.title)
        setloading(false)
      }).catch((error)=>{
        setloading(false)
        alert('An error occured')
        console.log(error)
      })
    }, [])
    
    const handleeditbook = () => {
        const data = {
            title,
            author,
            publishyear
        }
        setloading(true)
        axios.put(`http://localhost:5555/books/${id}`, data)
            .then(() => {
                setloading(false)
                enqueueSnackbar('Book edit sccessfully',{variant:'success',anchorOrigin:{vertical:'bottom', horizontal:'right'}})
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
            <h1 className='text-3xl my-4 text-zinc-100' >Edit Book</h1>
            {
                loading ? <Spinner /> : ''
            }
            <div className='flex flex-col border-sky-500 w-[600px] p-4 mx-auto rounded-xl border-2' >
                <div className='my-4' >
                    <label className='text-xl mr-4 text-zinc-400 '>Title</label>
                    <input type="text" value={title} onChange={(e) => settitle(e.target.value)} className='border-2 border-gray-600 px-4 py-2 w-full' />
                </div>
                <div className='my-4' >
                    <label className='text-xl mr-4 text-zinc-400 '>Author</label>
                    <input type="text" value={author} onChange={(e) => setauthor(e.target.value)} className='border-2 border-gray-600 px-4 py-2 w-full' />
                </div>
                <div className='my-4' >
                    <label className='text-xl mr-4 text-zinc-400 '>Publish Year</label>
                    <input type="text" value={publishyear} onChange={(e) => setpublishyear(e.target.value)} className='border-2 border-gray-600 px-4 py-2 w-full' />
                </div>
                <button className='p-2 bg-sky-500 m-8  text-white font-semibold text-lg ' onClick={handleeditbook} >Save</button>
            </div>
        </div>
    )
}

export default EditBook
