import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react';
import { ContentCard } from './ContentCard';


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
