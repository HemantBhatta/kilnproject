import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { myContext } from "../context";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 8,
  },
  posBtn: {
    marginTop: 10,
  },
});

const KilnListMap = ({ kiln }) => {
  const classes = useStyles();
  const { deleteKiln } = useContext(myContext);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            KilnName: {kiln.name}
          </Typography>
          <Typography className={classes.pos} variant="body2">
            Kiln Address: {kiln.address}
          </Typography>

          <Button
            onClick={() => deleteKiln(kiln.id)}
            className={classes.posBtn}
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default KilnListMap;
