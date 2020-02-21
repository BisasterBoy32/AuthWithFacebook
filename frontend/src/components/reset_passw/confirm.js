import React, { useState ,useEffect} from "react";
import styled from "styled-components";
import axios from "axios";


const Container = styled.div`
    margin-top : 100px;
    margin-right : auto;
    margin-left : auto;
    width : 50%;
    border : 1px solid #4F98CA;
    padding : 2rem;
`
const Input = styled.input`
    border : 1px solid 
    ${props => props.error ? "rgb(211, 80, 80)" : "#4F98CA"};
    width : 100%;
    padding : .2rem;
    padding-left : 1rem;
    font-size : 1.2rem;
    margin-top : 1rem;
`

const Button = styled.button`
    background-color : #4F98CA;
    border : 1px solid #4F98CA;
    margin-top : 1rem;
    padding : .5rem 2rem;
    display : block;
    font-size : 1.2rem;
    color : #000;
`


const Error = styled.div`
    color : rgb(211, 80, 80);
    font-size : .8rem;
    margin : .3rem 0 0 .3rem;
`

export default (props) => {
    const [formError, setFormError] = useState("");
    const [Loading, setLoading] = useState(true);
    const [valid, setValid] = useState(false);
    const [disable, setDisable] = useState(false);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    useEffect(() => {
        debugger
        console.log(props.location);
        const token=1;
        axios.post("reset_password/validate_token/",{token})
        .then(
            res => {
                setValid(true);
                setLoading(false);
            },
            err => {
                console.log(err.response);
                setValid(false);
                setLoading(false);
            }
        )
    },[])

    const sendRequest = (e) => {
        e.preventDefault()
        setDisable(true);
        if (!password || !password2){
            setFormError("enter the new password and confirm it");
        }
        else if (password !== password2 ){
            setFormError("the 2 passwords doesn't match");
        }
        const values = {
            password: password ,
            token : token
        }
        axios.post(`reset_password/confirm/`, values)
            .then(
                res => {
                    setDisable(false);
                    setRequestSent(true);
                },
                err => {
                    setDisable(false);
                    console.log("error : ", err.response)
                    setFormError("Invalid Token");
                    setTimeout(() => setFormError(""), 3000);
                }
            )
    }

    if (Loading) {
        return <Container> <h1> Loading... </h1></Container>
    } else if (valid) {
        return (
            <Container>
                <form onSubmit={sendRequest}>
                    <Input
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="New Password"
                    />
                    <Input
                        type="password"
                        name="password"
                        onChange={(e) => setPassword2(e.target.value)}
                        value={password2}
                        placeholder="Confirm Password"
                    />
                    {formError &&
                        <Error> {formError} </Error>
                    }
                    <Button type="submit" disabled={disable}>
                        Reset
                </Button>
                </form>
            </Container>
        )
    } else {
        return <Container> <h1>Invalid Token :( </h1></Container>
    }
};