var dur_month = 1;

const startDate = new Date();
startDate.setMonth(startDate.getMonth() - dur_month);
console.log(`日历的开始时间 ${startDate.toLocaleDateString()}`);

const endDate = new Date();
endDate.setMonth(endDate.getMonth() + dur_month);
console.log(`日历的结束时间 ${endDate.toLocaleDateString()}`);

// 获取3个月内的提醒事项
const reminders = await Reminder.allDueBetween(startDate, endDate);
console.log(`获取 ${reminders.length} 条提醒事项`);

var calendar = await Calendar.forEvents();

//获取日历名和对应的日历
var m_dict = {};
for (cal of calendar) {
  m_dict[cal.title] = cal;
  //console.log(`日历:${cal.title}`)
}

const events = await CalendarEvent.between(startDate, endDate, calendar);
console.log(`获取 ${events.length} 条日历`);

for (const reminder of reminders) {
  //reminder的标识符
  const targetNote = `[Reminder] ${reminder.identifier}`;
  const [targetEvent] = events.filter(
    e => e.notes != null && e.notes.indexOf(targetNote) != -1
  ); //过滤重复的reminder
  if (!m_dict[reminder.calendar.title]) {
    console.warn('找不到日历' + reminder.calendar.title);
    continue;
  }
  if (targetEvent) {
    //console.log(`找到已经创建的事项 ${reminder.title}`)
    updateEvent(targetEvent, reminder);
  } else {
    console.warn(`创建事项 ${reminder.title} 到 ${reminder.calendar.title}`);
    const newEvent = new CalendarEvent();
    newEvent.notes = targetNote + '\n' + reminder.notes; //要加入备注
    updateEvent(newEvent, reminder);
  }
}

Script.complete();

function updateEvent(event, reminder) {
  event.title = `${reminder.title}`;
  cal_name = reminder.calendar.title;
  cal = m_dict[cal_name];
  event.calendar = cal;
  //console.warn(event.calendar.title)
  //已完成事项
  if (reminder.isCompleted) {
    event.title = `✅${reminder.title}`;
    event.isAllDay = false;
    event.startDate = reminder.completionDate;
    var ending = new Date(reminder.completionDate);
    ending.setHours(ending.getHours() + 1);
    event.endDate = ending;

    var period =
      (reminder.dueDate - reminder.completionDate) / 1000 / 3600 / 24;
    period = period.toFixed(1);
    if (period < 0) {
      period = -period;
      event.location = ' 延期' + period + '天完成';
    } else if (period == 0) {
      event.location = ' 准时完成';
    } else {
      event.location = ' 提前' + period + '天完成';
    }
  }
  //未完成事项
  else {
    const nowtime = new Date();
    var period = (reminder.dueDate - nowtime) / 1000 / 3600 / 24;
    period = period.toFixed(1);
    //console.log(reminder.title+(period))
    if (period < 0) {
      //待办顺延

      event.location = ' 延期' + -period + '天';
      //如果不是在同一天,设置为全天事项
      if (reminder.dueDate.getDate() != nowtime.getDate()) {
        event.title = `❌${reminder.title}`;
        event.startDate = nowtime;
        event.endDate = nowtime;
        event.isAllDay = true;
      }
      //在同一天的保持原来的时间
      else {
        event.title = `⭕️${reminder.title}`;
        event.isAllDay = false;
        event.startDate = reminder.dueDate;
        var ending = new Date(reminder.dueDate);
        ending.setHours(ending.getHours() + 1);
        event.endDate = ending;
      }
      console.log(`【${reminder.title}】待办顺延${-period}天`);
    } else {
      event.title = `⭕️${reminder.title}`;
      event.isAllDay = false;
      event.location = '还剩' + period + '天';
      event.startDate = reminder.dueDate;
      var ending = new Date(reminder.dueDate);
      ending.setHours(ending.getHours() + 1);
      event.endDate = ending;
    }
  }
  event.save();
}
