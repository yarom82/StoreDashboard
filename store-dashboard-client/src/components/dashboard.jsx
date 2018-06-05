import React from 'react'
import ReactDOM from 'react-dom'
import StatsCard from './Cards/StatsCard.jsx'
import ItemGrid from './Grid/ItemGrid.jsx'
import { withStyles, Grid } from "material-ui";
import {
  ContentCopy,
  Store,
  InfoOutline,
  Warning,
  DateRange,
  LocalOffer,
  Update,
  ArrowUpward,
  AccessTime,
  Accessibility
} from "@material-ui/icons";

import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";

class Dashboard extends React.Component {
  
  state = {touchpoints: []}

  componentDidMount() {
    fetch('/api/get-touchpoints')
      .then(res => res.json())
      .then(touchpoints => {
        this.setState({ touchpoints })
        console.log('/api/get-touchpoints: ' + touchpoints)
      });
  }

  render() {
    return (
      <div>
        <Grid container>
        
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={ContentCopy}
              iconColor="green"
              title="POS 001"
              description="11"
              small="GB"
              statIcon={DateRange}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Store}
              iconColor="green"
              title="POS 002"
              description="13"
              small="TPH"
              statIcon={LocalOffer}
              statIconColor="danger"
              statLink={{ text: "Manager Approval", href: "#pablo" }}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={InfoOutline}
              iconColor="red"
              title="POS 003"
              small="TPH"
              statIcon={Warning}
              statIconColor="danger"
              statLink={{ text: "Manager Approval", href: "#pablo" }}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
             icon={Accessibility}
              iconColor="green"
              title="POS 004"
              description="21"
              small="TPH"
              statIcon={Warning}
              statIconColor="danger"
              statLink={{ text: "Manager Approval", href: "#pablo" }}
            />
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={ContentCopy}
              iconColor="green"
              title="POS 005"
              description="11"
              small="TPH"
              statIcon={Update}
              statIconColor="danger"
              statLink={{ text: "Manager Approval (1m ago)", href: "#pablo" }}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={ContentCopy}
              iconColor="orange"
              title="POS 006"
              description="16"
              small="TPH"
              statIcon={Update}
              statIconColor="danger"
              statLink={{ text: "2m Idle", href: "#pablo" }}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={ContentCopy}
              iconColor="orange"
              title="POS 007"
              description="12"
              small="TPH"
              statIcon={Update}
              statIconColor="info"
              statLink={{ text: "7m Idle", href: "#pablo" }}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={ContentCopy}
              iconColor="orange"
              title="POS 008"
              description="4"
              small="TPH"
              statIcon={Update}
              statIconColor="warning"
              statLink={{ text: "1m Idle", href: "#pablo" }}
            />
          </ItemGrid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(dashboardStyle)(Dashboard)
