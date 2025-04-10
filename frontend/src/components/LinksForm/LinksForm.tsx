import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useForm} from "react-hook-form";
import {linksSchemas} from "../../zodSchemas/linksSchemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Grid, TextField, Button} from "@mui/material";
import {shortLinkCreation} from "../../store/linksThunks.ts";
import {ILinkForm} from "../../types";
import {selectLoading} from "../../store/linksSlice.ts";

const LinksForm = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoading);

    const {register, handleSubmit, formState: {errors}, setValue} = useForm(
        {
            resolver: zodResolver(linksSchemas),
            defaultValues: {
                originalUrl: ""
            }
        }
    );

    const onSubmit = (data: ILinkForm) => {
        dispatch(shortLinkCreation(data));
        setValue("originalUrl", "");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: "100%"}}
                        id="originalUrl"
                        variant="filled"
                        label="Enter URL here"
                        disabled={loading}
                        {...register("originalUrl")}
                        error={!!errors.originalUrl}
                        helperText={errors.originalUrl?.message}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}} container justifyContent="center">
                    <Button
                        style={{background: "#ec64a0"}}
                        type="submit"
                        disabled={loading}
                        variant="contained"
                    >
                        Shorten!
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default LinksForm;