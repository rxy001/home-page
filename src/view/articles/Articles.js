import React, { useEffect, useState, useCallback } from 'react'
import './css/list.css'
import { Button } from 'components'
import axios from 'axios'

function Item({ value }) {
  return (
    <div className='list_item' >
      <a href='asdad'>
        <h3 className='list_item_title'>{value.title}</h3>
      </a>
      <div className='list_item_time'><span>时间：{value.updatedAt}</span><span style={{ marginLeft: 20 }}>原创</span></div>
      <a href='ddd'>
        <div className='list_item_content'>
          <div style={{ backgroundImage: `url(${require('../../assets/avatar.jpeg')})` }} className='list_item_img' />
          <p className='list_item_intro'>
            {value.intro}
          </p>
        </div>
      </a>
    </div>
  )
}

export default function (props) {

  const [articlesList, setArticlesList] = useState([])

  useEffect(() => {
    axios('/articlesList').then((res) => {
      setArticlesList(res.records)
    })
  }, []);

  const renderList = useCallback(() => {
    return articlesList.map((v) => <Item value={v} />)
  }, [articlesList])

  const openWritingPage = useCallback(() => {
    window.open('http://localhost:3000/writing');
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