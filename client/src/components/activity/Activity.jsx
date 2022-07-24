import React from 'react'
import { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Card from '../card/Card'
import {  getActivities } from '../../actions'

export default function Activity() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);
  const allActivities = useSelector((state) => state.activities)
console.log('activity.jsx')
console.log(allActivities)

  return (
    <div>
      <h1>Activity</h1>
      <div > 
            {allActivities && allActivities.map ( el => {
return(
  <div key={el.id}>
      <Link to={'/home/'+el.id}>
          <Card name={el.name} />
      </Link>
  </div>
  )
                })
            }
        </div>
    </div>
  )
}
