import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(3),
      },
    },
  })
);

export default function TipsComponent() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Card>
        <CardHeader
          avatar={<Avatar>N</Avatar>}
          title="Card Header"
          subheader="Card sub heading"
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant="h3">Card Title</Typography>
        </CardContent>
        <CardActions>
          <Button>share</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
