
import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { AllNews } from "../components/news/AllNews"
import { ImageList } from '../myAccount/MyProfile/imageList'
import { EventList } from '../components/events/EventList'
import './Dashboard.css' 

export const Dashboard = ({ currentUser }) => {
  return (
    <Container>
      <Row>
        <Col md="4">
          <div className="section">
            <AllNews currentUser={currentUser}/>
            <a href="#" className="article-link">More News</a>
          </div>
        </Col>
        <Col md="4">
          <div className="section">
            <ImageList currentUser={currentUser}/>
            <a href="#">More Images</a>
          </div>
        </Col>
        <Col md="4">
          <div className="section">
            <EventList currentUser={currentUser}/>
            <a href="#">More Events</a>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
