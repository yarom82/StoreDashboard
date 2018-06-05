import React from 'react'
import { connect } from 'react-redux'
import { getTouchpoints } from '../../actions/touchpoints'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import StatsCard from '../Cards/StatsCard.jsx'
import ItemGrid from '../Grid/ItemGrid.jsx'
import TouchPoints from '../TouchPoint/TouchPoints.jsx'
import { withStyles, Grid, Modal } from "material-ui"
import {
  ContentCopy,
  Store,
  InfoOutline,
  Warning,
  DateRange,
  LocalOffer,
  Update,
//  ArrowUpward,
//  AccessTime,
  Accessibility
} from "@material-ui/icons"

import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle"


class DashboardPage extends React.Component {
  
  state = {
    touchpoints: []
  }

  componentWillMount() {
    this.props.getTouchpoints({'sessionId': '1234'})
      .then(result => result.touchpoints.json()
      .then((touchpoints) => {
        debugger;
        this.setState({ touchpoints }
      )})
    )
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.dashboardContainer}>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12} lg={7}>
            <TouchPoints touchpoints={this.state.touchpoints} />
            {/* <Card className={classes.touchPointsCard}>
              <CardContent>
                <Grid container>
                  <TouchPoints touchpoints={this.state.touchpoints} />
                
                  <ItemGrid xs={6} sm={5} md={4} lg={3} xl={2} >
                    <StatsCard
                      icon={ContentCopy}
                      iconColor="green"
                      title="001"
                      description="11"
                      small="TPH"
                      statIcon={DateRange}
                    />
                  </ItemGrid>
                  <ItemGrid xs={6} sm={5} md={4} lg={3} xl={2} >
                    <StatsCard
                      icon={Store}
                      iconColor="green"
                      title="002"
                      description="13"
                      small="TPH"
                      statIcon={LocalOffer}
                      statIconColor="danger"
                      statLink={{ text: "Manager Approval", href: "#pablo" }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={6} sm={5} md={4} lg={3} xl={2} >
                    <StatsCard
                      icon={InfoOutline}
                      iconColor="red"
                      title="003"
                      small="TPH"
                      statIcon={Warning}
                      statIconColor="danger"
                      statLink={{ text: "Manager Approval", href: "#pablo" }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={6} sm={5} md={4} lg={3} xl={2} >
                    <StatsCard
                    icon={Accessibility}
                      iconColor="green"
                      title="004"
                      description="21"
                      small="TPH"
                      statIcon={Warning}
                      statIconColor="danger"
                      statLink={{ text: "Manager Approval", href: "#pablo" }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={6} sm={5} md={4} lg={3} xl={2} >
                    <StatsCard
                      icon={ContentCopy}
                      iconColor="green"
                      title="005"
                      description="11"
                      small="TPH"
                      statIcon={Update}
                      statIconColor="danger"
                      statLink={{ text: "Manager Approval", href: "#pablo" }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={6} sm={5} md={4} lg={3} xl={2} >
                    <StatsCard
                      icon={ContentCopy}
                      iconColor="orange"
                      title="006"
                      description="16"
                      small="TPH"
                      statIcon={Update}
                      statIconColor="danger"
                      statLink={{ text: "2m Idle", href: "#pablo" }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={6} sm={5} md={4} lg={3} xl={2} >
                    <StatsCard
                      icon={ContentCopy}
                      iconColor="orange"
                      title="007"
                      description="12"
                      small="TPH"
                      statIcon={Update}
                      statIconColor="info"
                      statLink={{ text: "7m Idle", href: "#pablo" }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={6} sm={5} md={4} lg={3} xl={2} >
                    <StatsCard
                      icon={ContentCopy}
                      iconColor="orange"
                      title="008"
                      description="4"
                      small="TPH"
                      statIcon={Update}
                      statIconColor="warning"
                      statLink={{ text: "1m Idle", href: "#pablo" }}
                    />
                  </ItemGrid>

                  <ItemGrid xs={6} sm={5} md={4} lg={3} xl={2} >
                    <StatsCard
                      icon={InfoOutline}
                      iconColor="red"
                      title="009"
                      small="TPH"
                      statIcon={Warning}
                      statIconColor="danger"
                      statLink={{ text: "Manager Approval", href: "#pablo" }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={6} sm={5} md={4} lg={3} xl={2} >
                    <StatsCard
                    icon={Accessibility}
                      iconColor="green"
                      title="010"
                      description="21"
                      small="TPH"
                      statIcon={Warning}
                      statIconColor="danger"
                      statLink={{ text: "Manager Approval", href: "#pablo" }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={6} sm={5} md={4} lg={3} xl={2} >
                    <StatsCard
                      icon={ContentCopy}
                      iconColor="green"
                      title="011"
                      description="11"
                      small="TPH"
                      statIcon={Update}
                      statIconColor="danger"
                      statLink={{ text: "Manager Approval", href: "#pablo" }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={6} sm={5} md={4} lg={3} xl={2} >
                    <StatsCard
                      icon={ContentCopy}
                      iconColor="orange"
                      title="012"
                      description="16"
                      small="TPH"
                      statIcon={Update}
                      statIconColor="danger"
                      statLink={{ text: "2m Idle", href: "#pablo" }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={6} sm={5} md={4} lg={3} xl={2} >
                    <StatsCard
                      icon={ContentCopy}
                      iconColor="orange"
                      title="013"
                      description="12"
                      small="TPH"
                      statIcon={Update}
                      statIconColor="info"
                      statLink={{ text: "7m Idle", href: "#pablo" }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={6} sm={5} md={4} lg={3} xl={2} >
                    <StatsCard
                      icon={ContentCopy}
                      iconColor="orange"
                      title="014"
                      description="4"
                      small="TPH"
                      statIcon={Update}
                      statIconColor="warning"
                      statLink={{ text: "1m Idle", href: "#pablo" }}
                    />
                  </ItemGrid>

                </Grid>
              </CardContent>
            </Card> */}
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={12} lg={5}>
            <div>Chart</div>
          </ItemGrid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(dashboardStyle)(connect(null, { getTouchpoints })(DashboardPage))
