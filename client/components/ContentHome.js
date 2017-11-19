import React from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react';
import { ContentCard } from './ContentCard'
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
    //hardcoding screen sizes for testing
    //need to change based on document size
    let itemsPerRow;
    if (window.innerWidth < 400) {
        itemsPerRow = '1'
    }
    if (window.innerWidth < 800) {
        itemsPerRow = '3'
    }
    else {
        itemsPerRow = '4'
    }

    return (
        <div id="content-home">
            <Card.Group itemsPerRow={itemsPerRow} >
                {data.map((story, index) => {
                    return (
                        <ContentCard story={story} key={index} />
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
