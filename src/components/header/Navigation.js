import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Config from '../../config'

const NavList = [
  {
    name: 'HOME',
    src: '/',
  },
  {
    name: 'ABOUT',
    src: '/about/',
  },
  {
    name: 'TAGS',
    src: '/tags/',
  }
]

class Navigation extends Component {
  state = {
    top: 0,
    isFixed: false,
    isDown: false,
  }

  oldScrollTop = 0

  isOldDown = false

  isOldFixed = false

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const top = document.documentElement.scrollTop || document.body.scrollTop;
    let isDown = false;
    if (top - this.oldScrollTop > 0) {
      isDown = true;
    } else {
      isDown = false;
    }
    if (!this.isOldFixed && top > 35) {
      this.isOldFixed = true;
      this.setState({
        isFixed: true,
      });
    } else if (this.isOldFixed && top < 35) {
      this.isOldFixed = false;
      this.setState({
        isFixed: false,
      });
    }
    if (isDown !== this.isOldDown && this.isOldFixed) {
      this.isOldDown = isDown
      this.setState({
        top: isDown ? -60 : 0,
      })
    }
    this.oldScrollTop = top;
  }

  getNavList() {
    const { isFixed } = this.state
    return NavList.map((item) => (
      <NavLi key={item.name}>
        <NavLink style={{ color: `${isFixed ? '#333' : '#fff'}` }} key={item.name} to={item.src}>
          {item.name}
        </NavLink>
      </NavLi>
    ))
  }

  render() {
    const { top, isFixed } = this.state

    return (
      <Nav
        top={top}
        isFixed={isFixed}
      >
        <NavUl>
          {this.getNavList()}
        </NavUl>
        <HomeLink style={{ color: `${isFixed ? '#333' : '#fff'}` }} to="/">{Config.title}.</HomeLink>
      </Nav>
    )
  }
}

const Nav = styled.nav`
  position: ${props => props.isFixed ? 'fixed' : 'absolute'};
  width: 100%;
  padding: 20px 0px;
  transition: all .4s ease-in;
  top: ${props => `${props.top}px`};
  background-color: ${props => props.isFixed ? 'hsla(0,100%,99%,.6)' : ''};
  box-shadow:${props => props.isFixed ? '0 0 4px rgba(0,0,0,.27)' : ''};
`
const HomeLink = styled(Link)`
  color: #fff;
  padding: 20px;
  line-height: 20px;
  font-size: 18px;
  text-decoration: none;
  font-weight: 800;
  :hover {
    color: #3194d0;
  }
  :active {
    color: #1270ea;
  }
`

const NavUl = styled.ul`
  position: absolute;
  right: 0px;
  width: auto;
`

const NavLi = styled.li`
  list-style: none;
  display: inline-block;
`

const NavLink = styled(Link)`
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 12px;
  padding: 20px;
  line-height: 12px;
  font-weight: 800;
  letter-spacing: 1px;
  :hover {
    color: #3194d0;
  }
  :active {
    color: #1270ea;
  }
`

export default Navigation

