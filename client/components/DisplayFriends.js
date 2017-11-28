import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label, Image } from 'semantic-ui-react';



class DisplayFriends extends Component {
    constructor(props){
        super(props)
        this.state = {
            getFriendsIdArr: [],
            friendsInfoArr: []

        }
        this.findFriendInfo = this.findFriendInfo.bind(this);
        this.handleShare = this.handleShare.bind(this);
    }

    componentWillMount(){
        this.props.friendsArr.map(guy => this.state.getFriendsIdArr.push(guy.userId))
    }

     findFriendInfo(idArr, followArr){
        let rtnArr = [];
        followArr.map(guy => idArr.includes(guy.id) 
        ? rtnArr.push(guy)
        : null
        )
        console.log('everything from the function:', idArr, followArr, rtnArr)
        return rtnArr
    }

    handleShare(evt, friendId){
        evt.preventDefault();
        
    }


    render(){
        const result = this.findFriendInfo(this.state.getFriendsIdArr, this.props.following)     
        console.log('props received from parent com', this.props.friendsArr)   
        console.log("result", result)
        return(
            <div>
        { result.map(friend => {
            return (
                <Label key={friend.id} onClick={evt => this.handleShare(evt, friend.id)}>
            <Image avatar spaced='right' src={friend.profilePicture} />
            {friend.firstName}
          </Label>
        )
         })}
        </div>

        )
    }
}

const mapState = state => ({
    following: state.following
})

export default connect(mapState)(DisplayFriends);
