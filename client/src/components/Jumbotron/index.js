import React from 'react'
import Styled from 'styled-components'

const Jumbotron = ({title,subtitle}) => {
    return (
        <JumboDiv>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
        </JumboDiv>
    )
}

export default Jumbotron;

const JumboDiv = Styled.div`
    text-align: center;
    padding: 1.25rem;
    box-shadow: 5px 5px 15px black;
    margin: 1rem;
    display: grid;
    justify-content: center;
    align-content: center;
    background-color: #555;
    border-radius: 5px;

    >h1{
        font-size:3rem;
        margin-bottom: 1rem;
    }

`