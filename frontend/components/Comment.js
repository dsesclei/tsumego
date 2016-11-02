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
    alignSelf: 'flex-start',
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

const Comment = ({ comments, onSubmit, }) => {
  // inspired by http://codepen.io/faizanhaider/pen/pjmBeq
  let textEl;
  return (
  <Card className={css(styles.commentBox)}>
    <CardHeader
      title="3 Comments"
      //subtitle="Subtitle"
      actAsExpander={true}
      showExpandableButton={true}
      className={css(styles.greyBackground)}
    />
    <CardText expandable={false} className={css(styles.comment)}>
      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      <Vote />
    </CardText>
    <CardText expandable={true}  className={css(styles.comment)}>
      Nunc lacinia auctor quam sed pellentesque.
      <Vote />
    </CardText>
    <CardText expandable={true}  className={css(styles.comment)}>
      Sed pellentesque nunc lacinia auctor quam.
      <Vote />
    </CardText>
    <CardText expandable={false} className={css(styles.postComment)}>
      <form onSubmit={e => { e.preventDefault(); onSubmit(textEl.getInputNode().value); }}>
        <TextField hintText="Add a comment"  className={css(styles.textInput)} />
        <RaisedButton  type="submit" label="Post" primary={true} />
      </form>
    </CardText>
  </Card>
  );
};

export default Comment;
