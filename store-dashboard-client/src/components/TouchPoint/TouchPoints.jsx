import React from 'react'
import TouchPoint from './TouchPoint.jsx'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import socketIOClient from 'socket.io-client'
import ManagerApprovalModal from '../Modal/ManagerApprovalModal.jsx'
import { withStyles, Grid } from "material-ui"

import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";

const socket = socketIOClient()

class TouchPoints extends React.Component {

  state = {
    touchpoints: this.props.touchpoints,
    openManagerApprovalModal: false,
    approve: ''
  }

  componentWillReceiveProps(newProps) {
    console.log('TouchPoints -> componentWillReceiveProps.')
    this.setState(
      {
        touchpoints: newProps.touchpoints,
        openManagerApprovalModal: newProps.openManagerApprovalModal,
        approve: newProps.approve
      }
    )
  }
  /*
  componentWillReceiveProps(newProps) {
    console.log('toucpoints new props.approval:' + newProps.approval)
    this.setState({
      openManagerApprovalModal: newProps.openManagerApprovalModal,
      approvalRequired: newProps.approvalRequired,
      approval: newProps.approval,
      pos: newProps.pos,
      balanceDue: newProps.balanceDue,
      cashier: newProps.cashier
    })
  }
  */

  componentWillMount() {
  }

  componentDidMount() {
    socket.on('io-approval-required', function(data) {
      this.state.touchpoints
        .map(touchpoint => {
          if (touchpoint.TouchPointId.includes(data.touchpointId))
          {
            console.log("TouchPoints -> io -> data.approve: " + data.approve)
            touchpoint["approvalRequired"] = true
            touchpoint["approve"] = data.approve
            touchpoint["balanceDue"] = data.balanceDue
            touchpoint["cashier"] = data.cashier
          }
        })
      this.setState({ touchpoints: this.state.touchpoints })
    }.bind(this))
  }

  onOpenManagerApproval = (touchpointId, approve, balanceDue, cashier) => {
    console.log("TouchPoints -> onOpenManagerApproval")
    this.setState({
      openManagerApprovalModal: true,
      touchpointId: touchpointId,
      approve: approve,
      balanceDue: balanceDue,
      cashier: cashier,
    })
  }

  render() {
    const { classes } = this.props
    return (
      <Card className={classes.touchPointsCard}>
        <CardContent>
          <Grid container>
        {
        this.state.touchpoints.map(touchpoint => (
            <TouchPoint 
              key={touchpoint.TouchPointId}
              touchpointId={touchpoint.TouchPointId}
              approvalRequired={touchpoint.approvalRequired}
              approve={touchpoint.approve}
              balanceDue={touchpoint.balanceDue}
              cashier={touchpoint.cashier}
              onOpenManagerApproval={this.onOpenManagerApproval}/>
        ))
        }
          </Grid>
        </CardContent>
        <ManagerApprovalModal socket={socket} openManagerApprovalModal={this.state.openManagerApprovalModal}
          touchpointId={this.state.touchpointId} approve={this.state.approve} balanceDue={this.state.balanceDue} cashier={this.state.cashier}/>
      </Card>
    )
  }
}

export default withStyles(dashboardStyle)(TouchPoints)
