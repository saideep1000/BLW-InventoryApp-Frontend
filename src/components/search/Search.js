import React from 'react'
import styles from "./Search.module.scss"
import {MdContentPasteSearch} from "react-icons/md"
const Search = ({value,onChange}) => {
  return (
    <div className={styles.search}>
      <MdContentPasteSearch size={18} className={styles.icon} />
      <input type="text" placeholder='Search Products' name="value" value={value} onChange={onChange}/>
    </div>
  )
}

export default Search
