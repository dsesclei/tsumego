import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Constants from '../constants';

const Footer = () => {
  return (
    <footer className={css(styles.footer)}>
    </footer>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: '60px',
    backgroundColor: Constants.dividerColor,
  },
});

export default Footer;
