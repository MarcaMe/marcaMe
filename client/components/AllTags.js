import React from 'react';
import { Card, Label } from 'semantic-ui-react';

const AllTags = (props) => {
    return (
        <Card.Content style={{ overflow: 'hidden' }}>
            <div style={{
                margin: '10px auto',
                overflow: 'hidden',
                height: '260px',
                padding: '10px'
            }} >
                <Label.Group color="teal">
                    {props.tags ? props.tags.map(tag => {
                        return (
                            <Label as="a" key={tag} size="big">
                                {tag}
                            </Label>
                        )
                    }) : (
                        <p>There are no tags.</p>
                    )}
                </Label.Group>
            </div>
        </Card.Content>
    );
}

export default AllTags;
