const GAP = 7 * 24 * 60 * 60 * 1000;
const compelet = /^COMPLETE/g;
const MARK = `SYNC`;
const now = +new Date();
const startDate = new Date(now - GAP);
const endDate = new Date(now + GAP);

async function getCalendar() {
  const calendars = await Calendar.forEvents();
  return calendars;
}

const getRemainders = async () =>
  await Reminder.allDueBetween(startDate, endDate);

/**
 * 根据title过滤，如果提醒事项列表名在日历中出现，则表示需要处理
 * @param {*} calendars 日历列表
 * @param {*} reminders 所有提醒事项列表
 */
async function getRemaindersNeedSync(calendars, reminders) {
  const titles = calendars.map(calendar => calendar.title);
  return reminders.filter(
    reminder => titles.indexOf(reminder.calendar.title) !== -1
  );
}

async function processing() {
  const calendars = await getCalendars();
  const reminders = await getRemainders();
  const addedEvents = await CalendarEvent.between(
    startDate,
    endDate,
    calendars
  );

  const remindersNeedSync = getRemaindersNeedSync(
    calendars,
    reminders,
    addedEvents
  );

  remindersNeedSync.forEach(reminder => sync(calenders, reminder));
}

async function sync(calendars, reminder, addedEvents) {
  const calendar = calendars.find(cal => reminder.calendar.title === cal.title);
  const existed = addedEvents.find(event => event.title === reminder.title);
  if (existed) {
    checkCompletions(exsited, reminder);
  } else {
    addToCalendar(reminder, calendar);
  }
}

async function addToCalendar(reminder, calendar) {
  const newEvent = new CalendarEvent();
  newEvent.title = reminder.title;
  newEvent.notes = reminder.notes;
  newEvent.startDate = reminder.completionDate || reminder.dueDate;
  newEvent.calendar = calendar;
  newEvent.save();
}

async function checkCompletions(exsitedEvent, reminder) {
  if (!compelet.test(exsitedEvent.notes) && reminder.isCompleted) {
    exsitedEvent.notes = `COMPLETE ${notes}`;
    exsitedEvent.save();
  }
}

processing();
