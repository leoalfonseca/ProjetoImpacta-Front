import React, { useContext, useEffect } from 'react';
import {
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Fab,
  TextField,
  Typography,
  Grid,
  FormControl,
} from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBRLocale from 'date-fns/locale/pt-BR';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
require('moment/locale/pt-br');

import PageContainer from '../../../src/components/container/PageContainer';
import Breadcrumb from '../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import { IconCheck } from '@tabler/icons-react';
import BlankCard from '../../../src/components/shared/BlankCard';
import { EventProps } from 'types/calendar';
import { CalendarContext } from 'context/CalendarContext';
import { format } from 'date-fns';
import { ProtectRoute } from 'components/ProtectRoute';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [slot, setSlot] = React.useState<EventProps>();
  const [start, setStart] = React.useState<any | null>();
  const [end, setEnd] = React.useState<any | null>();
  const [color, setColor] = React.useState<string>('default');
  const [update, setUpdate] = React.useState<EventProps | undefined | any>();
  const [events, setEvents] = React.useState<EventProps[]>([]);

  const { getEvents, createEvent, deleteEvent, editEvent } =
    useContext(CalendarContext);

  const ColorVariation = [
    { id: 1, eColor: '#1a97f5', value: 'default' },
    { id: 2, eColor: '#39b69a', value: 'green' },
    { id: 3, eColor: '#fc4b6c', value: 'red' },
    { id: 4, eColor: '#615dff', value: 'azure' },
    { id: 5, eColor: '#fdd43f', value: 'warning' },
  ];

  const addNewEventAlert = (slotInfo: EventProps) => {
    setOpen(true);
    setSlot(slotInfo);
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
  };
  const getEventsList = async () => {
    const eventsList = await getEvents();
    const formattedEvents = eventsList.map((event) => ({
      ...event,
      start: event.start ? new Date(event.start) : new Date(),
      end: event.end ? new Date(event.end) : new Date(),
    }));
    setEvents(formattedEvents);
  };

  const handleEditEvent = (event: any) => {
    setOpen(true);
    const newEditEvent = events.find(
      (elem: EventProps) => elem.id === event.id
    );
    setColor(event.color);
    if (newEditEvent) {
      setTitle(newEditEvent.title || '');
      setColor(newEditEvent.color || 'default');
      setStart(newEditEvent.start);
      setEnd(newEditEvent.end);
      setUpdate(newEditEvent);
    }
    setUpdate(newEditEvent);
  };

  const updateEvent = async (e: any) => {
    e.preventDefault();
    const updatedEvent = { ...update, title, start, end, color };
    await editEvent(updatedEvent.id, updatedEvent);
    await getEventsList();
    handleClose();
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const selectinputChangeHandler = (id: string) => setColor(id);

  const submitHandler = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const newEvent = { title, start, end, color };
    await createEvent(newEvent);
    await getEventsList();

    handleClose();
  };

  const deleteHandler = async () => {
    if (update) {
      await deleteEvent(update.id);
      await getEventsList();
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setStart(new Date());
    setEnd(new Date());
    setUpdate(null);
  };

  const eventColors = (event: EventProps) => {
    return { className: `event-${event.color || 'default'}` };
  };

  const handleStartChange = (newValue: any) => {
    setStart(newValue);
  };

  const handleEndChange = (newValue: any) => {
    setEnd(newValue);
  };

  useEffect(() => {
    getEventsList();
  }, []);

  return (
    <ProtectRoute>
      <PageContainer>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={ptBRLocale}
        >
          <Breadcrumb title="Calendário" />
          <BlankCard>
            <CardContent>
              <Calendar
                selectable
                events={events}
                defaultView="month"
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                localizer={localizer}
                style={{ height: 'calc(100vh - 350px)' }}
                onSelectEvent={(event) => handleEditEvent(event)}
                onSelectSlot={(slotInfo: any) => addNewEventAlert(slotInfo)}
                eventPropGetter={eventColors}
                messages={{
                  allDay: 'Dia Inteiro',
                  previous: 'Anterior',
                  next: 'Próximo',
                  today: 'Hoje',
                  month: 'Mês',
                  week: 'Semana',
                  day: 'Dia',
                  agenda: 'Agenda',
                  date: 'Data',
                  time: 'Hora',
                  event: 'Evento',
                  showMore: (total) => `+${total} mais`,
                }}
                components={{
                  event: ({ event }: any) => (
                    <div>
                      <strong>{event.title}</strong>
                      <div>
                        {format(new Date(event.start), 'dd/MM/yyyy')} -{' '}
                        {format(new Date(event.end), 'dd/MM/yyyy')}
                      </div>
                    </div>
                  ),
                }}
              />
            </CardContent>
          </BlankCard>

          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
            <form onSubmit={update ? updateEvent : submitHandler}>
              <DialogContent>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {update ? 'Atualizar Evento' : 'Adicionar Evento'}
                </Typography>
                <Typography mb={3} variant="subtitle2">
                  {slot?.title}
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="Título"
                      placeholder="Enter Título"
                      variant="outlined"
                      fullWidth
                      label="Título"
                      value={title}
                      onChange={inputChangeHandler}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <DatePicker
                        label="Início"
                        value={new Date(start)}
                        onChange={handleStartChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <DatePicker
                        label="Fim"
                        value={new Date(end)}
                        onChange={handleEndChange}
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                <Typography variant="h6" fontWeight={600} my={2}>
                  Selecione a Cor do Evento
                </Typography>

                {ColorVariation.map((mcolor) => (
                  <Fab
                    color="primary"
                    style={{ backgroundColor: mcolor.eColor }}
                    sx={{
                      marginRight: '3px',
                      transition: '0.1s ease-in',
                      scale: mcolor.value === color ? '0.9' : '0.7',
                    }}
                    size="small"
                    key={mcolor.id}
                    onClick={() => selectinputChangeHandler(mcolor.value)}
                  >
                    {mcolor.value === color ? <IconCheck width={16} /> : ''}
                  </Fab>
                ))}
              </DialogContent>

              <DialogActions sx={{ p: 3 }}>
                <Button onClick={handleClose}>Cancelar</Button>

                {update && (
                  <Button
                    type="button"
                    color="error"
                    variant="contained"
                    onClick={deleteHandler}
                  >
                    Deletar
                  </Button>
                )}
                <Button type="submit" disabled={!title} variant="contained">
                  {update ? 'Atualizar Evento' : 'Adicionar Evento'}
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </LocalizationProvider>
      </PageContainer>
    </ProtectRoute>
  );
};

export default BigCalendar;
