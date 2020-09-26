import React, { Component } from "react";
import styled from "styled-components";
import Title from "./Title";
import { myContext } from "../../context";
import { Redirect } from "react-router-dom";


import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
  Box,
} from "@material-ui/core";

const isAuthenticated = () => {
  const token = localStorage.getItem("item");
  return token && token.length > 10;
};

class NewSummary extends Component {
  state = {
    allworkers: [],
    summary: "district",
    ga: {},
    kpis: {},
    max_amount: 0,
    total: {
      amount: 0,
      workers: 0,
    },
  };

  componentDidMount() {
    this.setState({ allworkers: this.context.workersInfo }, () =>
      this.getSummaryFunc()
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.summary !== this.state.summary) {
      this.getSummaryFunc();
    }
  }

  isAlreadyAuthenticated = isAuthenticated();

  getSummaryFunc = () => {
    const summarystate = this.state.summary;
    const getProp = (v, k) => {
      if (k !== "ngo") return v[k];
      return v.extra.payment.amountpayer.ngo.name;
    };

    const workers = this.state.allworkers.filter(
      (e) => e.extra && e.extra.payment
    );

    const group = (workers, key) => {
      return workers.reduce((acc, cur) => {
        const k = getProp(cur, key);
        if (!acc[k]) acc[k] = [];
        acc[k].push(cur);
        return acc;
      }, {});
    };

    const paymentSum = (workers) =>
      workers.reduce(
        (acc, cur) => acc + parseFloat(cur.extra.payment.amount),
        0
      );

    const ga = group(workers, summarystate);
    this.setState({
      ga,
      total: {
        amount: paymentSum(workers),
        workers: workers.length,
      },
    });

    const kpis = {};
    for (const k in ga) {
      const nest = group(
        ga[k],
        summarystate == "district" ? "ngo" : "district"
      );
      const nkpis = {};
      for (const k2 in nest) {
        nkpis[k2] = {
          name: k2,
          value: paymentSum(nest[k2]),
        };
      }
      kpis[k] = {
        name: k,
        value: paymentSum(ga[k]),
        nest: {
          g: nest,
          nkpis,
        },
      };
    }
    this.setState({ kpis });

    const max_amount = Math.max(...Object.values(kpis).map((e) => e.value));
    this.setState({ max_amount });
  };

  InputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  static contextType = myContext;
  render() {
    return (
      <div>
      
        {this.isAlreadyAuthenticated ? (
          <div className="newSummary">
            <Title title="Summary" />
            <div className='mysum'>
              <Grid item xs={12} sm={12}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  className='Summarydrop'
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Summary
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.summary}
                    name="summary"
                    onChange={this.InputHandler}
                    label="Summamry"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <MenuItem name="district" value="district">
                      District
                    </MenuItem>
                    <MenuItem name="ngo" value="ngo">
                      Ngo
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </div>
            <div>
              <Typography className='summaryTotalamount' style={{marginTop:'20px'}}>
                Rs.{this.state.total.amount.toLocaleString("en-hi")} paid to <span></span>
                {this.state.total.workers.toLocaleString("en-hi")} of <span></span>
                {this.state.allworkers.length.toLocaleString("en-hi")} workers
              </Typography>
            </div>
            <div style={{ width: "100%" }}>
              {Object.entries(this.state.ga).map(([k, workers], i) => {
                return (
                  <div key={i}>
                    <OuterAmountBar>
                      <Box mb={2}>
                        <Typography variant="h6">{k}</Typography>

                        <Typography>
                          Rs.{this.state.kpis[k].value.toLocaleString("en-hi")}{" "}
                          paid to {workers.length.toLocaleString("en-hi")}{" "}
                          workers
                        </Typography>
                        <div
                          className="pay-bar"
                          style={{
                            width: `${
                              (this.state.kpis[k].value /
                                this.state.max_amount) *
                              100
                            }%`,
                            marginBottom: ".5em",
                          }}
                        ></div>
                      </Box>
                      {Object.entries(this.state.kpis[k].nest.nkpis).map(
                        ([k2], i) => {
                          return (
                            <div key={i}>
                              <Box my={1}>
                                <Typography>{k2}</Typography>
                                <Typography variant="body2">
                                  Rs.
                                  {this.state.kpis[k].nest.nkpis[
                                    k2
                                  ].value.toLocaleString("en-hi")}{" "}
                                  paid to{" "}
                                  {this.state.kpis[k].nest.g[
                                    k2
                                  ].length.toLocaleString("en-hi")}{" "}
                                  workers
                                </Typography>
                                <div
                                  className="pay-bar"
                                  style={{
                                    width: `${
                                      (this.state.kpis[k].nest.nkpis[k2].value /
                                        this.state.max_amount) *
                                      100
                                    }%`,
                                    height: "10px",
                                  }}
                                ></div>
                              </Box>
                            </div>
                          );
                        }
                      )}
                    </OuterAmountBar>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )}
      </div>
    );
  }
}

const OuterAmountBar = styled.div`
  width: ${(props) => (props.width ? props.width : "")};

  border-radius: 5px;
  margin: 20px 0;
  padding: 10px;
  background-color: aliceblue;

  .pay-bar {
    background-color: orange;
    height: 15px;
    transition: 0.5s ease all;
    text-align: center;
    color: white;
    border-radius: 5px;
    padding: 3px 0;
  }
`;

export default NewSummary;
