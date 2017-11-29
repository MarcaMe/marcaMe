import React from 'react';
import { Card, Label } from 'semantic-ui-react';

let dtags = ['dog', 'cat', 'rat', 'lion', 'bug']

const AllTags = (props) => {
    return (
        <Card.Content style={{ overflow: 'hidden' }}>
            <div style={{ margin: '10px auto', overflow: 'hidden', height: '260px', padding: '10px' }} >
                <Label.Group>
                    {props.tags.map(tag => {
                        return (
                            <Label as="a" key={tag} size="big">
                                {tag}
                            </Label>
                        )
                    })}
                </Label.Group>
            </div>
        </Card.Content>
    );
}

export default AllTags;
