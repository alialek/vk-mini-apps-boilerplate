import React, { Component } from 'react';
import { withRouter } from '@happysanta/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModalCard, Textarea } from '@vkontakte/vkui';


class AboutCard extends Component {

    render() {
    
        return (
            <ModalCard
                id={this.props.id}
                onClose={() => this.props.router.popPage()}
                header="Настройки"
                actions={[
                    {
                        title: 'Сохранить',
                        mode: 'primary',
                        action: () => {
                            console.log(true)
                        },
                    },
                ]}
            >
                <Textarea
                 
                    top="О себе"
                    maxLength="140"
                    placeholder="Здесь ты можешь оставить любую информацию о себе, которая будет полезна участникам"
                />
               
            </ModalCard>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      
    };
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({  }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AboutCard));
