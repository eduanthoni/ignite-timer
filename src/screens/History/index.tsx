import { useContext } from "react";
import { CyclesContext } from "../../context/CycleContext";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function History() {
  const { cycles } = useContext(CyclesContext);

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            { cycles.map(cycle => (
              <tr key={cycle.id}>
              <td>{cycle.task}</td>
              <td>{cycle.minutesAmount} minutos</td>
              <td>{formatDistanceToNow(cycle.startDate, {
                addSuffix: true,
                locale: ptBR,
              })}</td>
              <td>
                { cycle.completedDate && 
                  <Status statusColor="green"> Concluído </Status> 
                }

                { cycle.stopDate && 
                  <Status statusColor="red"> Interrompido </Status> 
                }

                { (!cycle.stopDate && !cycle.completedDate) && 
                  <Status statusColor="yellow"> Em andamento </Status> 
                }
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>

    </HistoryContainer>
  );
}