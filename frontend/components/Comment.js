import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Vote from './Vote';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

const styles = StyleSheet.create({
  commentBox: {
    width: '400px',
    margin: '20px',
    textAlign: 'left',
  },
  greyBackground: {
    backgroundColor: '#f4f4f4',
  },
  comment: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    backgroundColor: '#f4f4f4',
    ':hover': {
      backgroundColor: '#EEEEEE',
    },
  },
  postComment: {
    backgroundColor: '#fff',
    width: '100%',
  },
  textInput: {
    width: '100%',
  },
});

class Comment extends React.Component {
  onPostCommentSubmit(e) {
    e.preventDefault(); 
    this.props.postProblemComment(this.commentInput.getInputNode().value); 
    this.commentInput.getInputNode().value = '';
  }
  // inspired by http://codepen.io/faizanhaider/pen/pjmBeq
  render() {
    let commentCards;
    let commentsLength = this.props.comments ? this.props.comments.length : 0;
    if (this.props.comments) {
      commentCards = this.props.comments.map((comment, index) => {
        return (
              <CardText expandable={index ? true: false} className={css(styles.comment)} key={comment.pk}>
                <div><p><strong>{comment.username} :</strong></p> {comment.content}</div>
                <Vote score={comment.score} commentId={comment.pk} onVote={this.props.onVote} />
              </CardText>
        )
      })
    }
    else {
      commentCards = (
        <CardText expandable={false} className={css(styles.comment)}>
          <div>No comment yet.</div>
        </CardText>
      )
    }
    return (
  <Card className={css(styles.commentBox)}>
    <CardHeader
      title={commentsLength + " comment" + (commentsLength ? 's' : '')}
      //subtitle="Subtitle"
      actAsExpander={true}
      showExpandableButton={true}
      className={css(styles.greyBackground)}
    />
    {commentCards}
    <CardText expandable={false} className={css(styles.postComment)}>
      <form onSubmit={e => {this.onPostCommentSubmit(e)}}>
        <TextField hintText="Add a comment"  className={css(styles.textInput)} ref = {r => this.commentInput = r} />
        <RaisedButton  type="submit" label="Post" primary={true} />
      </form>
    </CardText>
  </Card>
    );
  }
}

export default Comment;
