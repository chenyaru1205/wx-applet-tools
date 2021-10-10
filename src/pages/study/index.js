/** @format */

import React, { useState } from 'react'
import { View, Button, MatchMedia, PageContainer, ShareElement } from 'remax/wechat'
import { usePageEvent } from 'remax/macro'
import { useDispatch, useSelector } from 'react-redux'

// no-console
const studyPage = () => {
  console.log(77777)
  const [showNewPage, setshowNewPage] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  usePageEvent('componentDidMount', () => {
    console.log('page launch')
  })
  usePageEvent('onLoad', () => {
    console.log('page-onLoad')
  })
  usePageEvent('onShow', () => {
    console.log('page-onShow')
  })
  const dispatch = useDispatch()
  const mainListData = useSelector(state => state.mainList)
  const { count } = mainListData
  const doCompute = data => {
    const payload = {
      type: 'add',
      data,
    }
    dispatch({
      type: 'mainList/updateCount',
      payload,
    })
  }
  const onIsShow = data => {
    setshowNewPage(data)
  }
  const onEnter = () => {
    console.log('onEnter')
  }
  return (
    <View>
      <View>{count}</View>
      <MatchMedia min-height="100" maxHeight="800">
        <Button size="mini" type="primary" onClick={() => doCompute(1)}>
          加1
        </Button>
        <Button size="mini" onClick={() => onIsShow(true)}>
          展示子页面
        </Button>
      </MatchMedia>
      <PageContainer key="study" show={showNewPage} bindleave={() => onIsShow(false)} bindenter={() => onEnter()}>
        NewPage
        <ShareElement key="study" transform>
          ShareElement
        </ShareElement>
        <View>{pageCount}</View>
        <Button size="mini" type="primary" onClick={() => setPageCount(pageCount + 1)}>
          页面加1
        </Button>
      </PageContainer>
    </View>
  )
}
export default studyPage
