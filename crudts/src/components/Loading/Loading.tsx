import React from 'react'
import loadingGif from './826.gif'
import style from './Loading.module.css'
function Loading() {
  return (
    <div className={style.divLoading}>
        <img src={loadingGif} alt="" />
    </div>
  )
}

export default Loading