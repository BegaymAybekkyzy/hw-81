import * as React from "react";
import LinksForm from "./components/LinksForm/LinksForm.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectLink} from "./store/linksSlice.ts";
import {Container, Link, Typography, Grid, Box} from "@mui/material";
import {baseURL} from "./globalConstants.ts";

const App = () => {
    const link = useAppSelector(selectLink);

    let content: React.ReactNode;
    if (link) {
        content = (
            <>
                <p style={{textAlign: "center", color: "#fff5f9"}}>Your link now looks like this:</p>
                <Link href={baseURL + link.shortUrl} target="_blank">
                    http://localhost:8000/{link.shortUrl}
                </Link>
            </>
        )
    }

    return (
        <div style={{
            background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
            minHeight: "98vh"
        }}>
            <Container>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{minHeight: "90vh"}}
                >
                    <Typography
                        variant="h3"
                        gutterBottom
                        style={{fontWeight: "bold", fontSize: "3rem", color: "#fff5f9"}}>
                        Shorten your link!
                    </Typography>

                    <Box width="100%" mt={4}>
                        <LinksForm/>
                    </Box>
                    <Box mt={4} fontSize={20} style={{height: "100px"}}>
                        {content}
                    </Box>
                </Grid>
            </Container>
        </div>
    )
};

export default App
