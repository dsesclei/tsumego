import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Constants from '../constants';

const styles = StyleSheet.create({
  footer: {
    height: '60px',
    backgroundColor: Constants.dividerColor,
  },
});

const Footer = () => (
  <footer className={css(styles.footer)} />
);


export default Footer;
