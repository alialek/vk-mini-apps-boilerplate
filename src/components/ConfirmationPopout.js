import { Alert } from '@vkontakte/vkui';
import React from 'react';
import { useRouter } from '@happysanta/router';
import { connect } from 'react-redux';
import {POPOUT_CONFIRM, router} from "../router";
function Confirm(props) {
   
    const router = useRouter();
    const handlerClick = () => {
      router.replacePopup(null)
      router.popPage()
    }

    return (
        <Alert
            actions={[
                {
                    title: 'Отмена',
                    autoclose: true,
                    mode: 'cancel',
                },
                {
                    title: 'Забрать',
                    mode: 'destructive',
                    autoclose: true,
                    action: () => handlerClick(),
                },
            ]}
            onClose={() => router.replacePopup(null)}
        >
            <h2>Вы заработали 15 рублей!</h2>
        </Alert>
    );
}

const mapStateToProps = (state) => {
    return {
        
    };
};

export default connect(mapStateToProps, null)(Confirm);
