import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
// import useFetch from '../hooks/useFetch'

const REVIEWS = gql`
  query GetReviews {
    reviews{
      id,
      title,
      rating,
      body
    }
  }
`

export default function Homepage() {
  const { loading, error, data } = useQuery(REVIEWS)

  // const url = 'http://localhost:1337/reviews'
  // const { loading, error, data } = useFetch(url)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error !</p>
  
  return (
    <div>
      {data.reviews.map(review => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>

          <small>console list</small>
          <p>{review.body.substring(0, 200)}...</p>
          <Link to={`details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}