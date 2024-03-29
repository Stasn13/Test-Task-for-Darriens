import React,{Component} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

class TestTask extends Component{
    
    render(){
        let match = this.props.match;
        return(
            <div className="app-wrapper">
                <Switch>
                    <Redirect exact from={`${match.url}`} to={`${match.url}/albums`} />
                    <Redirect exact from={`${match.url}/user-album/photos/:id`} to={`${match.url}/photos/:id`}/>
                    <Route path={`${match.url}/albums`} component={asyncComponent(() => import('./routes/albums'))} />
                    <Route path={`${match.url}/users`} component={asyncComponent(() => import('./routes/users'))} />

                    <Route path={`${match.url}/photos/:id`} component={asyncComponent(() => import('./routes/albums/photos'))} />
                    <Route path={`${match.url}/user-album/:id`} component={asyncComponent(() => import('./routes/users/user-album'))} />

                    <Route component={asyncComponent(() => import('app/routes/extraPages/routes/404'))} />
                </Switch>
            </div>
        )
    }
}
export default TestTask