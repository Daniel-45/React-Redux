import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from './../types'

// Mostrar alerta
export function mostrarAlertaAction(alerta) {
    return (dispatch) => {
        dispatch(mostraAlerta(alerta));
    }
}

const mostraAlerta = alerta => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
});

export function ocultarAlertaAction() {
    return (dispatch) => {
        dispatch(ocultarAlerta());
    }
}

const ocultarAlerta = () => ({
    type: OCULTAR_ALERTA
})