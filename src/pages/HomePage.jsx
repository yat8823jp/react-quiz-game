import React from 'react'
import { Link } from 'react-router-dom';
import { ROUTES } from '../const';

export default function HomePage() {
  return (
    <>
      <h1>Quiz APP</h1>
      <Link to={ ROUTES.QUIZ }>START!</Link>
    </>
  )
}
