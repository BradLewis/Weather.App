import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

interface IProps { }
interface IState { }

export class Layout extends Component<IProps, IState> {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
