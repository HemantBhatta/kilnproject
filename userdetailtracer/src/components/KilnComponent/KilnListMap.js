import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { scroller } from "react-scroll";
import Grid from "@material-ui/core/Grid";
import { myContext } from "../../context";

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
  const { deleteKiln, isSuperUser } = useContext(myContext);

  const scrollToElement = (element) => {
    scroller.scrollTo(element, {
      duration: 1000,
      delay: 100,
      smooth: true,
    });
  };


  const confirmDelete = (kiln) => {
    if(window.confirm('Are you sure you want to delete the kiln?')){
      deleteKiln(kiln.id);
      scrollToElement("Home");
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {kiln.name}
          </Typography>

          {isSuperUser() ? (
            <Button
              onClick={() => {
                confirmDelete(kiln)
              }}
              className={classes.posBtn}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default KilnListMap;
