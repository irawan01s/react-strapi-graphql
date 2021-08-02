import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import ReactMarkdown from 'react-markdown'
// import useFetch from '../hooks/useFetch'

const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
      id,
      title,
      rating,
      body,
      categories {
        id,
        name
      }
    }
  }
`

export default function ReviewDetails() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id }
  })

  console.log(data);
  // const url = `http://localhost:1337/reviews/${id}`
  // const { loading, error, data } = useFetch(url)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error !</p>

  return (
    <div>
      <div  className="review-card">
        <div className="rating">{data.review.rating}</div>
        <h2>{data.review.title}</h2>

        {data.review.categories.map(c => (
            <small key={c.id}>{c.name}</small>
          ))}
        <ReactMarkdown>{data.review.body}</ReactMarkdown>
      </div>
    </div>
  )
}
