import React from 'react';
import { Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite';
import RaisedButton from 'material-ui/RaisedButton';

import Page from './Page';
import Board from './Board';
import Comment from '../containers/Comment';
import Constants from '../constants';

const styles = StyleSheet.create({
  gamePage: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  problem: {
    marginTop: '30px',
    display: 'flex',
    flex: '1',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
    backgroundColor: '#f1f1f1',
  },
  sidebar: {
    height: '505px',
    width: '200px',
    borderTopRightRadius: '3px',
    borderBottomRightRadius: '3px',
    fontSize: '16px',
  },
  flexCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '20px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  group: {
    marginBottom: '30px',
  },
  succeeded: {
    boxShadow: '0 0 11px 2px rgba(139, 195, 74, 0.8)',
  },
  failed: {
    boxShadow: '0 0 11px 2px rgba(244, 67, 54, 0.8)',
  },
  button: {
    marginTop: '10px',
  },
  status: {
    height: '50px',
  },
  tag: {
    display: 'inline-block',
    fontSize: '11px',
    borderRadius: '3px',
    backgroundColor: '#fff',
    border: '1px solid #d4d4d4',
    cursor: 'default',
    userSelect: 'none',
    margin: '3px',
    padding: '3px',
  },
});

class Problem extends React.Component {
  componentWillMount() {
    this.props.fetchProblem();
    setTimeout(() => console.log('ok'));
  }

  render() {
    const hasSucceeded = this.props.status === Constants.statusSucceeded;
    const hasFailed = this.props.status === Constants.statusFailed;
    let buttons;
    let headerText;
    if (hasSucceeded || hasFailed) {
      headerText = hasSucceeded ? 'Correct!' : 'Incorrect';
      buttons = (
        <div>
          <div><RaisedButton className={css(styles.button)} containerElement={<Link to="/register" />} label="Retry" /></div>
          <div><RaisedButton className={css(styles.button)} containerElement={<Link to="/register" />} label="Next" /></div>
        </div>
      );
    } else {
      buttons = (
        <div>
          <div><RaisedButton className={css(styles.button)} containerElement={<Link to="/register" />} label="Give Up" /></div>
          <div><RaisedButton className={css(styles.button)} containerElement={<Link to="/register" />} label="Skip" /></div>
        </div>
      );
    }

    return (
      <Page>
        <div className={css(styles.gamePage)}>
          <div className={css(styles.problem, hasSucceeded && styles.succeeded, hasFailed && styles.failed)}>
            <Board stones={this.props.stones} playerToMove={this.props.playerToMove} onClick={this.props.onClick} />
            <div className={css(styles.sidebar, styles.flexCenter)}>
              <div className={css(styles.flexCenter)}>
                <div className={css(styles.label, styles.status)}>{headerText}</div>
              </div>
              <div className={css(styles.flexCenter, styles.group)}>
                <div className={css(styles.label)}>Tags</div>
                <div>
                  <div className={css(styles.tag)}>middle game</div>
                  <div className={css(styles.tag)}>joseki</div>
                </div>
              </div>
              {buttons}
            </div>
          </div>
          {(hasSucceeded || hasFailed) && <Comment />}
        </div>
      </Page>
    );
  }
}

export default Problem;
