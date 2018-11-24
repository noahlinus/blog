import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

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
  getNavList() {
    return NavList.map((item) => (
      <NavLi key={item.name}>
        <NavLink key={item.name} to={item.src}>
          {item.name}
        </NavLink>
      </NavLi>
    ))
  }

  render() {
    return (
      <Nav>
        <NavUl>
          {this.getNavList()}
        </NavUl>
        <HomeLink to="/">Dayuan's Blog.</HomeLink>
      </Nav>
    )
  }
}

const Nav = styled.nav`
  position: absolute;
  width: 100%;
  padding: 20px 0px;
`
const HomeLink = styled(Link)`
  color: #fff;
  padding: 20px;
  line-height: 20px;
  font-size: 18px;
  text-decoration: none;
  font-weight: 800;
  :hover {
    color:#ddd;
  }
  :active {
    color: #ccc;
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
    color:#ddd;
  }
  :active {
    color: #ccc;
  }
`

export default Navigation

