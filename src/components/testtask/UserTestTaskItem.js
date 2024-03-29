import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = {
    card: {
        minWidth: 275,
        margin: 10,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

function UserTestTaskItem(props) {
    const { classes } = props;
    const {addres, company, email, id, name, phone, username, website} = props;

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    user ID: {id}
                </Typography>
                <Typography variant="h5" component="h2">
                    {name}
        </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    e-mail adress: {email}
        </Typography>
                <Typography component="p">
                    user name {username}
          <br />
                    {'"our favourite user!)"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`./user-album/${id}`}><Button size="small">See albums of this user</Button></Link>
            </CardActions>
        </Card>
    );
}

UserTestTaskItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserTestTaskItem);