import React, { useEffect, useState, useCallback } from 'react'
import './css/list.css'
import { Button } from 'components'
import axios from 'axios'

function Item({ value, onDelete }) {
  const href = `/content/${value.id}`
  return (
    <div className='list_item' >
      <a href={href} target='_blank'>
        <h3 className='list_item_title'>{value.title}</h3>
      </a>
      <div className='list_item_time'>
        <span>{value.author}</span>
        <span>时间：{value.createdTime}</span>
        <span>原创</span>
      </div>
      <a target='_blank' href={href}>
        <div className='list_item_content'>
          <div style={{ backgroundImage: `url(${value.img})` }} className='list_item_img' />
          <div className='list_item_intro'>
            {value.intro}
          </div>
        </div>
      </a>
      <span onClick={() => { onDelete(value.id) }}>删除</span>
    </div>
  )
}

export default function (props) {

  const [articlesList, setArticlesList] = useState([])

  const getArticlesList = useCallback(() => {
    axios('/articlesList').then((res) => {
      setArticlesList(res.records)
    })
  })

  useEffect(() => {
    getArticlesList()
  }, []);

  const deleteSingleArticle = useCallback((id) => {
    axios.delete(`/articlContent/${id}`).then((res) => {
      // setArticlesList(res.records)
    })
  }, [])

  const renderList = useCallback(() => {
    return articlesList.map((v) => <Item value={v} onDelete={deleteSingleArticle} />)
  }, [articlesList])

  const openWritingPage = useCallback(() => {
    window.open('/writing');
  }, [])

  return (
    <div className='articles_warp'>
      <div style={{ textAlign: 'right', padding: '10px 0', width: 700, margin: '0 auto' }}>
        <Button
          type='primary'
          onClick={openWritingPage}
        >
          写文章
        </Button>
      </div>
      <div className='articles_list'>
        {renderList()}
      </div>
    </div>
  )
}