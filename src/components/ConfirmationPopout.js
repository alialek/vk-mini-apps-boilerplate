import { Alert } from '@vkontakte/vkui';
import React from 'react';
import { useRouter } from '@happysanta/router';
import { connect } from 'react-redux';
function Confirm(props) {
   
    const router = useRouter();
    return (
        <Alert
            actions={[
                {
                    title: 'Отмена',
                    autoclose: true,
                    mode: 'cancel',
                },
                {
                    title: 'Пожаловаться',
                    mode: 'destructive',
                    autoclose: true,
                    action: () => console.log('Действие'),
                },
            ]}
            onClose={() => router.popPage()}
        >
            <h2>Подтвердите действие</h2>
            <p>Вы хотите отправить жалобу на этого пользователя?</p>
        </Alert>
    );
}

const mapStateToProps = (state) => {
    return {
        
    };
};

export default connect(mapStateToProps, null)(Confirm);
