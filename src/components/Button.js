import styled from "styled-components";

const Button = styled.button`
    background: transparent;
    border: 1px solid;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    font-size: 2rem;
    vertical-align: middle;
    cursor: pointer;
    &:hover {
        background: #eee;
    }
`;

export const SquareButton = styled(Button)`
    margin: 1rem;
    padding: 1rem;
    width: auto;
    height: auto;
    font-size: initial;
    border-radius: initial;
`;


export default Button