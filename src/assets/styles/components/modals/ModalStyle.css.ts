import { Styles } from "react-modal";

export const ModalStyle: Styles = {
    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100px',
        width: '500px',
        inset: '0',
        borderRadius: '15px',
        marginTop: '10px',
        marginLeft: '550px',
        backgroundColor: '#D9D9D9'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
};