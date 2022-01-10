import { Container } from "@material-ui/core";
import { LoginForm } from "../../components/authentication/login";
import Page from "../../components/Page";

export default function SetLogin(){

    return (
        <Page title="Login for sets | Open Academy">
            <Container>
                <LoginForm />
            </Container>

        </Page>
    )
}