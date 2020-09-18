import React,{useContext} from 'react'
import { myContext } from "../../context";
import styled from "styled-components";
import Title from './Title'


import { Button, Grid, Card, Typography, Box } from "@material-ui/core";

const NewSummary = () => {

    const getProp = (v, k) => {
        if( k !== 'ngo' ) return v[k];
        return v.extra.payment.amountpayer.ngo.name;
    };

    const  {workersInfo} = useContext(myContext);
    const workers = workersInfo.filter(e => e.extra && e.extra.payment);

    const group = (workers, key) => {
       return workers.reduce((acc, cur) => {
            const k = getProp(cur, key);
            if( !acc[k] ) acc[k] = [];
            acc[k].push(cur);
            return acc;
        }, {});
    };

    const paymentSum = workers => workers.reduce((acc, cur) => acc + parseFloat(cur.extra.payment.amount), 0);

    const ga = group(workers, 'district');

    const kpis = {};
    for(const k in ga){
        const nest = group(ga[k], 'ngo');
        const nkpis = {};
        for(const k2 in nest){
            nkpis[k2] = {
               name: k2,
               value: paymentSum(nest[k2])
            };
        }
        kpis[k] = {
            name: k,
            value: paymentSum(ga[k]),
            nest: {
                g: nest,
                nkpis
            }
        };
    }

    console.log(kpis);

    const max_amount = Math.max(...Object.values(kpis).map(e => e.value));
    return (
        <div className='newSummary'>
            <Title title='Summary'/>
            <div style={{width: '100%'}}>
                {
                    Object.entries(ga).map(([k, workers]) => {
                        return (
                            <div>
                                <OuterAmountBar>
                                        <Typography variant='h6'>{k}</Typography>
                                    <Typography>Rs.{kpis[k].value} paid to {workers.length} workers</Typography>
                                    <div className="pay-bar" style={{width: `${( kpis[k].value / max_amount) *100}%`, marginBottom: '.5em'}}></div>
                                    {
                                        Object.entries(kpis[k].nest.nkpis).map(([k2]) => {
                                            return (
                                                <div>
                                                    <Box my={1}>

                                                    <Typography>{k2}</Typography>
                                                    <div className="pay-bar" style={{width: `${( kpis[k].nest.nkpis[k2].value / max_amount) *100}%`, height: '10px'}}></div>
                                                    </Box>
                                                </div>
                                            )
                                        })
                                    }
                                </OuterAmountBar>
                            </div>
                            )
                    })
                }
            </div>
        </div>
    )
}

const OuterAmountBar = styled.div`
  width: ${(props) => (props.width ? props.width : '')};

  border-radius: 5px;
  margin: 20px 0;
  padding:10px;
  background-color: aliceblue;

  .pay-bar {
   background-color: orange;
   height:15px;
    transition: 0.5s ease all;
    text-align: center;
    color: white;
    border-radius: 5px;
    padding: 3px 0;
  }
`;

export default NewSummary

