import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react';
import { ContentCard } from './ContentCard';

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
    image: 'https://www.youtube.com/embed/ydThUDlBDfc',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitQuisque eget risus varius, consequat risus eu, placerat nisl.Curabitur quis arcu eget mi tristique egestas. Morbi nulla mauris',
    likes: 5000
    },
    {
    name: 'kenny',
    date: 'date',
    image: 'https://www.youtube.com/embed/ydThUDlBDfc',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitQuisque eget risus varius, consequat risus eu, placerat nisl.Curabitur quis arcu eget mi tristique egestas. Morbi nulla mauris',
    likes: 5000
}];

export class ContentHome extends Component {
    //hardcoding screen sizes for testing
    //need to change based on document size
    constructor(props) {
        super(props)
        this.state = {
            itemsPerRow: '4'
        }
    }
    componentDidMount() {
        if (window.innerWidth < 900) this.setState({itemsPerRow: '3'})
        if (window.innerWidth < 500) this.setState({itemsPerRow: '1'})
        if (window.innerWidth > 900) this.setState({itemsPerRow: '4'})
        window.addEventListener('resize', () => {
            if (window.innerWidth < 900) this.setState({itemsPerRow: '3'})
            if (window.innerWidth < 500) this.setState({itemsPerRow: '1'})
            if (window.innerWidth > 900) this.setState({itemsPerRow: '4'})
        })
    }

    render() {
    return (
        <div id="content-home">
            <Card.Group itemsPerRow={this.state.itemsPerRow} >
                {data.map((story, index) => {
                    return (
                        <ContentCard color={getColor(index)} story={story} key={index} />
                    )
                })}
            </Card.Group>
        </div>
    )
    }
}

const mapState = (state) => {
    return {
        // email: state.user.email
    };
};

function getColor(index) {
    const colors = ['green', 'teal', 'blue', 'green', 'olive', 'violet', 'purple' ]
    return colors[index % data.length]
}


export default connect(mapState)(ContentHome);
