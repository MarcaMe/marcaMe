import React from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react';


export const ContentCard = (props) => {
    return (
    <Card className="card" fluid={true}>
        <Image src={props.story.image} />
        <Card.Content>
            <Card.Header>{props.story.name}</Card.Header>
            <Card.Meta>
                <span className="date">{props.story.date}</span>
            </Card.Meta>
            <Card.Description>{props.story.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a><Icon name="user" />{props.story.likes}</a>
        </Card.Content>
    </Card>
      )
}
