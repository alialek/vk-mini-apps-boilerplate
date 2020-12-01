import Home from '../panels/HomePanel';

import React, { Component } from 'react';
import { View } from '@vkontakte/vkui';
import { PANEL_MAIN } from './../router';

class Main extends Component {
    render() {
        return (
            <View
                id={this.props.id}
                popout={this.props.popout}
                modal={this.props.modal}
                activePanel={this.props.activePanel}
            >
                <Home id={PANEL_MAIN} />
            </View>
        );
    }
}

export default Main;
