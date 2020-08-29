import React, { Component } from 'react';
import { initVersionCheck } from "./services/version-check.service";
import Environment from "./environments/environment";


class Application extends Component<{}> {
    constructor(props: {}) {
        super(props);
        
    }


    componentDidMount = ()=>
    {
       initVersionCheck(Environment.VERSION_CHECK_URL);
    }

    render() {
            return (
               // Route paths will be here            
            );
}