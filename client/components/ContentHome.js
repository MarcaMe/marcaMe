import React from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react';
// import { Mosaic } from 'react-mosaic-component'; to be used later

let data = [{
    name: 'matthew',
    date: 'date',
    image: 'https://react.semantic-ui.com/assets/images/avatar/large/matthew.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitQuisque eget risus varius, consequat risus eu, placerat nisl.Curabitur quis arcu eget mi tristique egestas. Morbi nulla mauris',
    likes: 5000
}, {
    name: 'dog',
    date: 'date',
    image: 'https://react.semantic-ui.com/assets/images/avatar/large/matthew.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitQuisque eget risus varius, consequat risus eu, placerat nisl.Curabitur quis arcu eget mi tristique egestas. Morbi nulla mauris',
    likes: 5000
}, {
    name: 'cat',
    date: 'date',
    image: 'https://react.semantic-ui.com/assets/images/avatar/large/matthew.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitQuisque eget risus varius, consequat risus eu, placerat nisl.Curabitur quis arcu eget mi tristique egestas. Morbi nulla mauris',
    likes: 5000
}, {
    name: 'mom',
    date: 'date',
    image: 'https://react.semantic-ui.com/assets/images/avatar/large/matthew.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitQuisque eget risus varius, consequat risus eu, placerat nisl.Curabitur quis arcu eget mi tristique egestas. Morbi nulla mauris',
    likes: 5000
}, {
    name: 'dad',
    date: 'date',
    image: 'https://react.semantic-ui.com/assets/images/avatar/large/matthew.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitQuisque eget risus varius, consequat risus eu, placerat nisl.Curabitur quis arcu eget mi tristique egestas. Morbi nulla mauris',
    likes: 5000
}, {
    name: 'kenny',
    date: 'date',
    image: 'https://react.semantic-ui.com/assets/images/avatar/large/matthew.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitQuisque eget risus varius, consequat risus eu, placerat nisl.Curabitur quis arcu eget mi tristique egestas. Morbi nulla mauris',
    likes: 5000
}];

export const ContentHome = () => {

    return (
        <div id="content-home">
            <Card.Group itemsPerRow="4" >
                {data.map((story, index) => {
                    return (
                        <Card key={index}>
                            <Image src={story.image} />
                            <Card.Content>
                                <Card.Header>{story.name}</Card.Header>
                                <Card.Meta>
                                    <span className="date">{story.date}</span>
                                </Card.Meta>
                                <Card.Description>{story.description}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <a><Icon name="user" />{story.likes}</a>
                            </Card.Content>
                        </Card>
                    )
                })}
            </Card.Group>
        </div>
    )
}

const mapState = (state) => {
    return {
        // email: state.user.email
    };
};

export default connect(mapState)(ContentHome);
