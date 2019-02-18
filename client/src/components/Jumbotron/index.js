import React from 'react'
import Styled from 'styled-components'

const Jumbotron = ({title,subtitle}) => {
    return (
        <JumboDiv>
            <h1>{title}</h1>
            <h3>{subtitle}</h3>
        </JumboDiv>
    )
}

export default Jumbotron;

const JumboDiv = Styled.div`
    text-align: center;
    min-height: 300px;
    padding: 1.25rem;
    box-shadow: 5px 5px 15px black;
    margin: 1rem;
    display: grid;
    justify-content: center;
    align-content: center;
`