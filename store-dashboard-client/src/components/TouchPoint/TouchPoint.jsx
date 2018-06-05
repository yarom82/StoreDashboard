import React from 'react'
import StatsCard from '../Cards/StatsCard.jsx'
import ItemGrid from '../Grid/ItemGrid.jsx'
import { withStyles } from "material-ui"

import {
  ContentCopy,
  Store,
  InfoOutline,
  Warning,
  Check,
  DateRange,
  LocalOffer,
  Update,
  ArrowUpward,
  AccessTime,
  Accessibility
} from "@material-ui/icons";

import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";

class TouchPoint extends React.Component {
  
  state = {
    touchpointId: '',
    approvalRequired: false,
    approve: '',
    balanceDue: '',
    cashier: ''
  }

  componentWillReceiveProps(newProps) {
    console.log("TouchPoint -> componentWillReceiveProps. pos: " + this.props.touchpointId + ", newProps.approve: " + newProps.approve)
    this.setState({
      touchpointId: newProps.touchpointId,
      approvalRequired: newProps.approvalRequired,
      approve: newProps.approve,
      balanceDue: newProps.balanceDue,
      cashier: newProps.cashier,
    })
  }
  
  itemClicked = () => {
    this.props.onOpenManagerApproval(
      this.state.touchpointId,
      this.state.approve,
      this.state.balanceDue,
      this.state.cashier,
    )
  }

  render() {
    const { approvalRequired } = this.state

    const statIcon = approvalRequired ? Warning : Check 
    const statLink = approvalRequired ? { text: "Manager Approval", href: "" } : undefined
    const statIconColor = approvalRequired ? "danger" : "gray"

    return (
      <ItemGrid xs={6} sm={5} md={4} lg={3} xl={2} onClick={this.itemClicked}>
        <StatsCard
          icon={Store}
          iconColor="green"
          title={this.props.touchpointId}
          description="0"
          small="TPH"
          statLink={statLink}
          statIcon={statIcon}
          statIconColor={statIconColor}
        />
      </ItemGrid>
    )
  }
}

export default withStyles(dashboardStyle)(TouchPoint)
