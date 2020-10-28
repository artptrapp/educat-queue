import styled from 'styled-components'

export const CardContainer = styled.div`
    display: grid;
    padding: 5px;
    border: 1px solid #ddd;
    margin-bottom: 5px;
    max-height: 175px;
    :hover {
        background-color: #eee
    }
`

export const CardTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
`

export const CardContent = styled.div`
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    padding: 0.5rem;
`

export const CardFooter = styled.div`
    padding: 0.5rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between
`

export const SeeDetailsLink = styled.div`
    text-decoration: underline;
    font-size: 14px;
    cursor: pointer;
    margin: 0;
`