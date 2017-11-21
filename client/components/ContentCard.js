import React from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';


export const ContentCard = (props) => {
    return (
    <Card color={props.color} className="card" fluid>
       <NavLink to={'/oneArticle'}> <Image fluid src={props.story.image} /> </NavLink>
        <Card.Content>
            <Card.Header>{props.story.name}</Card.Header>
            <Card.Meta>
                <span className="date">{props.story.date}</span>
            </Card.Meta>
            <Card.Description className="description">{props.story.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a><Icon name="user" />{props.story.likes}</a>
        </Card.Content>
    </Card>
      )
}

