import { Component, ViewEncapsulation } from '@angular/core';

import {
  startOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  addHours
} from 'date-fns';

import { CalendarEvent, CalendarEventAction } from 'angular-calendar'; // import should be from `angular-calendar` in your app
import { UserService } from 'app/services';
import { ToasterService } from 'angular2-toaster';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  templateUrl: 'calendar.component.html',
  styleUrls: ['../../../scss/vendors/angular-calendar/angular-calendar.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent {

  users:any = [];
  constructor (public userService: UserService, private toasterService: ToasterService){
    this.getUsersEmailWithAccept();
  }

  view: string = 'month';

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      console.log('Edit event', event);
    }
  }, {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.events = this.events.filter(iEvent => iEvent !== event);
    }
  }];

  events: CalendarEvent[] = [{
    start: subDays(startOfDay(new Date()), 1),
    end: addDays(new Date(), 1),
    title: 'A 3 day event',
    color: colors.red,
    actions: this.actions
  }, {
    start: startOfDay(new Date()),
    title: 'An event with no end date',
    color: colors.yellow,
    actions: this.actions
  }, {
    start: subDays(endOfMonth(new Date()), 3),
    end: addDays(endOfMonth(new Date()), 3),
    title: 'A long event that spans 2 months',
    color: colors.blue
  }];

  activeDayIsOpen: boolean = true;

  increment(): void {

    const addFn: any = {
      day: addDays,
      week: addWeeks,
      month: addMonths
    }[this.view];

    this.viewDate = addFn(this.viewDate, 1);

  }

  decrement(): void {

    const subFn: any = {
      day: subDays,
      week: subWeeks,
      month: subMonths
    }[this.view];

    this.viewDate = subFn(this.viewDate, 1);

  }

  today(): void {
    this.viewDate = new Date();
  }

  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }


  getUsersEmailWithAccept(){
    this.userService.getUsersEmailWithAccept()
    .subscribe(
      data => {
        if (data.verify == '1') {
          var userEventList= data.data;
          console.log(userEventList)

          var nList = [];
          userEventList.forEach(element => {
              var event = {
                  start: new Date(element.START_DATE),
                  // end: addDays(element.EVT_END_DATE, 1),
                  title: element.SUBJECT,
                  color: colors.red,
                };
                nList.push(event);
          });
          this.users = nList;
        } else {
          // this.toasterService.pop('error', 'ooops..', 'Something went wrong !')
        }
      },
      err => {
        console.log(err)
      })
  }
}
