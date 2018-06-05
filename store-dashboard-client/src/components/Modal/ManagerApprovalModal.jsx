import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import socketIOClient from 'socket.io-client'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({

  paper: {
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class ManagerApprovalModal extends React.Component {
  state = {
    openManagerApprovalModal: false,
    touchpointId: '',
    approve: this.props.approve,
    balanceDue: this.props.balanceDue,
    cashier: this.props.cashier
  };

  handleClose = () => {
    this.setState({ openManagerApprovalModal: false });
  };

  handleApprove = () => {
    this.props.socket.emit('io-approved', {});
  }
  
  componentWillReceiveProps(newProps) {
    console.log("ManagerApprovalModal -> componentWillReceiveProps. newProps.approve: " + newProps.approve)
    this.setState({
      openManagerApprovalModal: newProps.openManagerApprovalModal,
      touchpointId: newProps.touchpointId,
      approve: newProps.approve,
      balanceDue: newProps.balanceDue,
      cashier: newProps.cashier
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={!!this.state.openManagerApprovalModal}
        onClose={this.handleClose}
      >
        <div className={classes.paper}>
          <Typography variant="title" id="modal-title">
            {this.state.approve}
          </Typography>
          <Typography variant="subheading" id="simple-modal-description">
            Cashier: {this.state.cashier}
          </Typography>
          <br/>
          <Button onClick={this.handleClose}>Cancel</Button><Button onClick={this.handleApprove}>Approve</Button>
        </div>
      </Modal>
    );
  }
}

// We need an intermediary variable for handling the recursive nesting.
const ManagerApprovalModalWrapped = withStyles(styles)(ManagerApprovalModal);

export default ManagerApprovalModalWrapped;
