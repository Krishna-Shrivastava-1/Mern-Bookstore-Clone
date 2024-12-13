import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import Backbutton from '../Components/Backbutton'
import Spinner from '../Components/Spinner'
import Logo from '../Components/Logo'

const ShowBook = () => {
    const [loading, setloading] = useState(false)
    const [books, setbooks] = useState({})
    const { id } = useParams()
    useEffect(() => {
        setloading(true)
        fetch(`http://localhost:5555/books/${id}`).then(res => res.json()).then((data) => {
            setloading(false)
            setbooks(data)
        }).catch((error)=>{
            console.log(error)
            setloading(false)
        })
    }, [id])

    return (
        <div className='p-4' >
            <Logo/>
            <Backbutton />
            <h1 className='text-3xl my-4 text-zinc-300'  >Show books</h1>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <div className='flex flex-col border-2 border-sky-500 rounded-lg w-fit p-4 text-zinc-400' >
                        <div className='my-4' >
                            <span className='text-xl mr-4 text-gray-500'>Id</span>
                            <span  > {books._id} </span>
                        </div>
                        <div className='my-4' >
                            <span className='text-xl mr-4 text-gray-500'>Title</span>
                            <span  > {books.title} </span>
                        </div>
                        <div className='my-4' >
                            <span className='text-xl mr-4 text-gray-500'>Author</span>
                            <span  > {books.author} </span>
                        </div>
                        <div className='my-4' >
                            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
                            <span  > {books.publishyear} </span>
                        </div>
                        <div className='my-4' >
                            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
                            <span  > {new Date(books.createdAt).toString()} </span>
                        </div>
                        <div className='my-4' >
                            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
                            <span  > {new Date(books.updatedAt).toString()}  </span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ShowBook
