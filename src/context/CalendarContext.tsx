import { ReactNode, createContext } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { EventProps } from 'types/calendar';

interface ICalendarProvider {
  children: ReactNode;
}

interface ICalendarContext {
  createEvent: (data: EventProps) => void;
  getEvents: () => Promise<EventProps[]>;
  deleteEvent: (id: string) => Promise<void>;
  editEvent: (id: string, updatedData: EventProps) => Promise<void>;
}

const CalendarContext = createContext({} as ICalendarContext);

const CalendarProvider = ({ children }: ICalendarProvider) => {
  const createEvent = async (data: EventProps) => {
    await api.post('calendar/event', data);
    toast.success('Evento criado com sucesso!');
  };

  const getEvents = async () => {
    try {
      const { data } = await api.get('calendar/events');
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteEvent = async (id: string) => {
    await api.delete(`calendar/event/${id}`);
    toast.success('Evento excluído com sucesso!');
  };

  const editEvent = async (id: string, updatedData: EventProps) => {
    try {
      await api.patch(`calendar/event/${id}`, updatedData);
      toast.success('Evento alterado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Algo deu errado ao editar o Evento!');
      throw error;
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        getEvents,
        createEvent,
        deleteEvent,
        editEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export { CalendarProvider, CalendarContext };
