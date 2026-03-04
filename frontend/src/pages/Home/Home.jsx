import React, { useState } from 'react'
import './Home.css'
// import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Notification from '../../components/Notification/Notification'
const Home = () => {
  const [category,setCategory] = useState("All");
  return (
    <div>
        {/* <Header/> */}
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <Notification />
    </div>
  )
}

export default Home
