import {
    ANDROID,
    Avatar,
    Footer,
    IOS,
    Link,
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    RichCell,
    withPlatform,
} from '@vkontakte/vkui';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from '@happysanta/router';
import { Icon24Cancel } from '@vkontakte/icons';
import { Icon28CancelCircleFillRed } from '@vkontakte/icons/dist/28/cancel_circle_fill_red';

class HistoryPage extends Component {
    render() {
        const { id, platform, onClose } = this.props;
        return (
            <ModalPage
                header={
                    <ModalPageHeader
                        left={
                            platform === ANDROID && (
                                <PanelHeaderButton onClick={onClose}>
                                    <Icon24Cancel />
                                </PanelHeaderButton>
                            )
                        }
                        right={platform === IOS && <PanelHeaderButton onClick={onClose}>Закрыть</PanelHeaderButton>}
                    >
                        История
                    </ModalPageHeader>
                }
                id={id}
                dynamicContentHeight
            >
                <Link href={`https://vk.com/im?sel=88035762`}>
                    <RichCell
                        disabled
                        before={<Avatar size={48} src={Icon28CancelCircleFillRed} />}
                        caption="Разработчик"
                    >
                        Александр Алибутаев
                    </RichCell>
                </Link>
                <Footer>Всего встреч: 1</Footer>
            </ModalPage>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, null)(withPlatform(withRouter(HistoryPage)));
