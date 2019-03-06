import React from 'react';
import Styled from 'styled-components'

const Nav = props => {
    return (
        <NavDiv>
            <NavBrand>React(ion) Movies</NavBrand>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/search">Search</NavLink>
            <NavLink href="/saved">Saved</NavLink>
        </NavDiv>
    )
}

export default Nav;

const NavDiv = Styled.nav`
    top: 0;
    box-shadow: 5px 5px 5px #000;
    padding: 15px 10px;
    margin: 1rem;
    background-color: #555;
    display: grid;
    grid-template-columns: 1fr repeat(3,auto);
    border-radius: 5px;

    >a:hover{
        color: #999;
    }
`

const NavBrand = Styled.h2`
    margin: 15px;
`

const NavLink = Styled.a`
    margin: 15px;
    text-decoration:none;
    color: #fff;
    font-size: 20px;
`