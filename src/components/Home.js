import axios from 'axios'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import Card from './Card'
import './Home.css'
import Search from './Search'

export default function Home() {

    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)

    const {
        chara,
        hasMore,
        loading,
        error
    } = Search(query, page)

    const observer = useRef()
    const lastElement = useCallback(node => {
        if (error) return
        if (loading) return
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
            setPage(prevPage => prevPage + 1)
        }
        },{ threshold: 0.1 })
        if (node) observer.current.observe(node)

    }, [loading, hasMore])

    function searchHandler(e) {
        setTimeout(() => {
            setQuery(e.target.value)
            setPage(1)
        },1000)
        
    }

    return (
        <>
            <div className="home-wrapper">
                <div className="search-box">
                    <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66668 12C7.84999 11.9998 8.99921 11.6037 9.93134 10.8747L12.862 13.8054L13.8047 12.8627L10.874 9.93204C11.6033 8.99982 11.9997 7.85033 12 6.66671C12 3.72604 9.60734 1.33337 6.66668 1.33337C3.72601 1.33337 1.33334 3.72604 1.33334 6.66671C1.33334 9.60737 3.72601 12 6.66668 12ZM6.66668 2.66671C8.87268 2.66671 10.6667 4.46071 10.6667 6.66671C10.6667 8.87271 8.87268 10.6667 6.66668 10.6667C4.46068 10.6667 2.66668 8.87271 2.66668 6.66671C2.66668 4.46071 4.46068 2.66671 6.66668 2.66671Z" fill="#7ca7a1"/>
                    </svg>
                    <input className="search" type="text" name="search" id="search" placeholder="Search for a contact" onChange={(e) => searchHandler(e)}/>
                </div>

                <div>
                        {
                            chara.map((info,index) => {
                               
                                if (chara.length === index + 1) {
                                    return <Card key={info.id} lastElement={lastElement} info={info} />
                                  } else {
                                    return <Card key={info.id} info={info}/>
                                  }
                                
                                }
                                )
                        }
                        <div>{ loading && 'Loading ...'}</div>
                        <div>{ error && 'Please check your internet connection'}</div>
                </div>
            </div>
        </>
    )
}
