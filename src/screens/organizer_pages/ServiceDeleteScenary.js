import { apiConn } from '../config';
import { message } from 'antd';

class EscenarioService {
    static async handleEscenarios(evento_id) {
        try {
            const escenarioResponse = await fetch(`${apiConn}/escenarios`);
            const escenarioData = await escenarioResponse.json();

            if (escenarioData.evento_id === evento_id) {
                const escenarioId = escenarioData.escenario_id;

                const deleteEscenarioResponse = await fetch(`${apiConn}/escenarios/${escenarioId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (deleteEscenarioResponse.ok) {
                    message.success('Escenario eliminado exitosamente');
                } else {
                    message.error('Error al eliminar el escenario');
                }
            }
        } catch (error) {
            console.error('Error managing escenarios:', error);
            message.error('Error al gestionar los escenarios');
        }
    }
}

export default EscenarioService;
