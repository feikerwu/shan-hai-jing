const events = await Calendar.forEvents();
const eventTitles = events.map(event => event.title);
// 获取当前所有的reminder
const reminders = await Reminder.allDueToday();
const processingEvents = [];
for (let reminder of reminders) {
  if (eventTitles.indexOf(reminder.calendar.title) !== -1) {
    processingEvents.push(reminder);
  }
}

// 写入到 caldendar
processingEvents.forEach(reminder => {
  const newEvent = new CalendarEvent();
  const calendar = events.find(
    event => event.title === reminder.calendar.title
  );
  addEvent(newEvent, calendar, reminder);
});

/**
 *
 * @param {CalendarEvent} event 待添加到日历的时间
 * @param {*} calendar 待添加日历
 * @param {*} reminder 代办事项
 */
function addEvent(event, calendar, reminder) {
  event.title = reminder.title;
  event.notes = reminder.notes;
  event.startDate = reminder.dueDate;
  event.calendar = calendar;
  event.allDay = true;
  event.save();
}
