import React from 'react';
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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import Events from '../../../src/EventData';
import 'react-big-calendar/lib/css/react-big-calendar.css';
require('moment/locale/pt-br');

import PageContainer from '../../../src/components/container/PageContainer';
import Breadcrumb from '../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import { IconCheck } from '@tabler/icons-react';
import BlankCard from '../../../src/components/shared/BlankCard';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

type EvType = {
  title: string;
  allDay?: boolean;
  start?: Date;
  end?: Date;
  color?: string;
};

const BigCalendar = () => {
  const [calevents, setCalEvents] = React.useState<any>(Events);
  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [slot, setSlot] = React.useState<EvType>();
  const [start, setStart] = React.useState<any | null>();
  const [end, setEnd] = React.useState<any | null>();
  const [color, setColor] = React.useState<string>('default');
  const [update, setUpdate] = React.useState<EvType | undefined | any>();

  const ColorVariation = [
    {
      id: 1,
      eColor: '#1a97f5',
      value: 'default',
    },
    {
      id: 2,
      eColor: '#39b69a',
      value: 'green',
    },
    {
      id: 3,
      eColor: '#fc4b6c',
      value: 'red',
    },
    {
      id: 4,
      eColor: '#615dff',
      value: 'azure',
    },
    {
      id: 5,
      eColor: '#fdd43f',
      value: 'warning',
    },
  ];
  const addNewEventAlert = (slotInfo: EvType) => {
    setOpen(true);
    setSlot(slotInfo);
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
  };

  const editEvent = (event: any) => {
    setOpen(true);
    const newEditEvent = calevents.find(
      (elem: EvType) => elem.title === event.title
    );
    setColor(event.color);
    setTitle(newEditEvent.title);
    setColor(newEditEvent.color);
    setStart(newEditEvent.start);
    setEnd(newEditEvent.end);
    setUpdate(event);
  };

  const updateEvent = (e: any) => {
    e.preventDefault();
    setCalEvents(
      calevents.map((elem: EvType) => {
        if (elem.title === update.title) {
          return { ...elem, title, start, end, color };
        }

        return elem;
      })
    );
    setOpen(false);
    setTitle('');
    setColor('');
    setStart('');
    setEnd('');
    setUpdate(null);
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const selectinputChangeHandler = (id: string) => setColor(id);

  const submitHandler = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const newEvents = calevents;
    newEvents.push({
      title,
      start,
      end,
      color,
    });
    setOpen(false);
    e.target.reset();
    setCalEvents(newEvents);
    setTitle('');
    setStart(new Date());
    setEnd(new Date());
  };
  const deleteHandler = (event: EvType) => {
    const updatecalEvents = calevents.filter(
      (ind: EvType) => ind.title !== event.title
    );
    setCalEvents(updatecalEvents);
  };

  const handleClose = () => {
    // eslint-disable-line newline-before-return
    setOpen(false);
    setTitle('');
    setStart(new Date());
    setEnd(new Date());
    setUpdate(null);
  };

  const eventColors = (event: EvType) => {
    if (event.color) {
      return { className: `event-${event.color}` };
    }

    return { className: `event-default` };
  };

  const handleStartChange = (newValue: any) => {
    setStart(newValue);
  };
  const handleEndChange = (newValue: any) => {
    setEnd(newValue);
  };

  return (
    <PageContainer>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Breadcrumb title="Calendário" />
        <BlankCard>
          <CardContent>
            <Calendar
              selectable
              events={calevents}
              defaultView="month"
              scrollToTime={new Date(1970, 1, 1, 6)}
              defaultDate={new Date()}
              localizer={localizer}
              style={{ height: 'calc(100vh - 350px' }}
              onSelectEvent={(event) => editEvent(event)}
              onSelectSlot={(slotInfo: any) => addNewEventAlert(slotInfo)}
              eventPropGetter={(event: any) => eventColors(event)}
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
                      {event.start.toLocaleTimeString()} -{' '}
                      {event.end.toLocaleTimeString()}
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
                      value={start}
                      onChange={handleStartChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <DatePicker
                      label="Fim"
                      value={end}
                      onChange={handleEndChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Typography variant="h6" fontWeight={600} my={2}>
                Selecione a Cor do Evento
              </Typography>

              {ColorVariation.map((mcolor) => {
                return (
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
                );
              })}
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
              <Button onClick={handleClose}>Cancelar</Button>

              {update ? (
                <Button
                  type="submit"
                  color="error"
                  variant="contained"
                  onClick={() => deleteHandler(update)}
                >
                  Deletar
                </Button>
              ) : (
                ''
              )}
              <Button type="submit" disabled={!title} variant="contained">
                {update ? 'Atualizar Evento' : 'Adicionar Evento'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </LocalizationProvider>
    </PageContainer>
  );
};

export default BigCalendar;
