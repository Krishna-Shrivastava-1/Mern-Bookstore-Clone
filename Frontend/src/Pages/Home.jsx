import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../Components/Spinner'
import { Link } from 'react-router-dom'

import { MdOutlineAddBox } from 'react-icons/md'
import BooksTable from '../Components/Home/BooksTable'
import BooksCard from '../Components/Home/BooksCard'
import Logo from '../Components/Logo'
const Home = () => {
    const [books, setbooks] = useState([])
    const [loading, setloading] = useState(false)
    const [showtype, setshowtype] = useState('table')
    useEffect(() => {
        setloading(true)
        axios.get('http://localhost:5555/books')
            .then((response) => {
                setbooks(response.data.data)
                console.log(response.data)
                setloading(false)
            })
            .catch((error) => {
                console.log(error)
                setloading(false)
            })

    }, [])

    return (
        <div className='p-4 text-white' >
            <Logo/>
            {/* <div  className='flex justify-between items-center gap-x-4'  >
                <button className='bg-sky-500 hover:bg-sky-700 transition-all duration-300 px-4 py-1 rounded-lg' onClick={()=> setshowtype('table')} >
Table
                </button>
                <button className='bg-sky-500 hover:bg-sky-700 transition-all duration-300 px-4 py-1 rounded-lg' onClick={()=> setshowtype('card')} >
Card
                </button>
            </div> */}
            <div className='flex justify-between items-center ' >
                <h1 className='text-3xl my-8 text-zinc-400 font-bold' >Books List</h1>
                <Link to='/books/create' >
                    <MdOutlineAddBox className='text-sky-500 text-4xl' />
                </Link>
            </div>
            {
                loading ? (
                    <Spinner />
                ) : (<BooksCard books = { books} />)
                // showtype === 'table' ? (
                //     <BooksTable books={books} />
                // ) : (<BooksCard books = { books} />)
            }

        </div>
    )
}

export default Home
