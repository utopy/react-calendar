import React, { Component } from "react";
import Styled from "styled-components";
import { daysInMonth } from "./utils";
const CalendarContainer = Styled("div")`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
`;

const CalendarColumn = Styled("div")`
  display: flex;
  flex: 1;
  flex-grow: ${props => (props.grow ? props.grow : "1")}
  background: ${props => (props.background ? props.background : "white")};
  flex-direction: ${props => (props.direction ? props.direction : "row")}
`;

const CalendarHead = Styled("div")`
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  background: aqua
`;

const CalendarBody = Styled("div")`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
`;

const Day = Styled("div")`
  display: flex;
  flex: 1;
  height: 100px;
  align-items: center;
  justify-content: center;

  &:hover{
    background: blue
  }
`;

const Divider = Styled("div")`
  height: 1px;
  background: blue;
  width: 100%;
`;

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: null,
      months: [
        "gennaio",
        "febbraio",
        "marzo",
        "aprile",
        "maggio",
        "giugno",
        "luglio",
        "agosto",
        "settembre",
        "ottobre",
        "novembre",
        "dicembre"
      ],
      days: [
        "domenica",
        "lunedì",
        "martedì",
        "mercoledì",
        "giovedì",
        "venerdì",
        "sabato"
      ]
    };
    this.selectDay = this.selectDay.bind(this);
  }

  selectDay(day, month, year) {
    let d = new Date(year || 2018, month, day);
    this.setState({
      selectedDay: { day: d.getDay(), month, year, number: day }
    });
  }

  render() {
    let d = new Date();
    const { months, selectedDay, days } = this.state;
    const monthDays = daysInMonth(d.getMonth());
    const monthArray = [...new Array(monthDays)];
    console.log(selectedDay);

    return (
      <CalendarContainer>
        <CalendarColumn background="grey">
          {selectedDay ? (
            <div>{`${days[selectedDay.day]} ${selectedDay.number} ${
              months[selectedDay.month]
            }`}</div>
          ) : (
            "nothing"
          )}
        </CalendarColumn>
        <CalendarColumn grow="2" direction="column">
          <CalendarHead>{months[d.getMonth()]}</CalendarHead>
          <CalendarBody>
            {days.map(day => <Day>{day}</Day>)}
            {monthArray.map((el, i) => {
              if (i++ % 7 == 0) {
                return (
                  <React.Fragment>
                    <Divider />
                    <Day onClick={() => this.selectDay(i, d.getMonth())}>
                      {i}
                    </Day>
                  </React.Fragment>
                );
              } else {
                return (
                  <Day onClick={() => this.selectDay(i, d.getMonth())}>{i}</Day>
                );
              }
            })}
          </CalendarBody>
        </CalendarColumn>
      </CalendarContainer>
    );
  }
}
